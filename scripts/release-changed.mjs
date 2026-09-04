#!/usr/bin/env node
import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');
const changesetDir = path.join(rootDir, '.changeset');

// ANSI Color Helpers
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function header(title) {
  console.log('\n' + '='.repeat(60));
  log(`  🚀 ${title}`, colors.bright + colors.cyan);
  console.log('='.repeat(60) + '\n');
}

// Parse Command Line Arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: pnpm release:changed [options]

Automated pipeline to generate changesets, update changelogs, build, and publish changed packages.

Options:
  --packages <list>      Comma-separated list of packages (e.g. tokens,components or @ripperdoc-chrome77/tokens)
  --bump <type>          Bump type: 'patch' | 'minor' | 'major' (default: 'patch')
  --message <msg>        Changelog description / release note message
  --tag <npm-tag>        NPM dist-tag (default: 'pre-release-beta' or 'latest')
  --dry-run              Simulate versioning and packaging without publishing to NPM
  --skip-changeset       Skip generating a new changeset (consumes existing changesets)
  --publish-only         Skip changeset/versioning and publish already versioned packages
  --no-git-tag           Do not create Git tags during publish
  --help, -h             Show this help message

Examples:
  pnpm release:changed
  pnpm release:changed --bump minor --message "Add Card component slots"
  pnpm release:changed --packages components,themes --tag latest
  pnpm release:changed --dry-run
`);
  process.exit(0);
}

function getArg(flag, defaultValue = null) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1]) {
    return args[index + 1];
  }
  const prefix = `${flag}=`;
  const found = args.find((a) => a.startsWith(prefix));
  if (found) {
    return found.slice(prefix.length);
  }
  return defaultValue;
}

const isDryRun = args.includes('--dry-run');
const isPublishOnly = args.includes('--publish-only');
const skipChangeset = args.includes('--skip-changeset') || isPublishOnly;
const noGitTag = args.includes('--no-git-tag');
let bumpType = getArg('--bump', 'patch');
let releaseMessage = getArg('--message', null);
let targetPackagesArg = getArg('--packages', null);
let npmTag = getArg('--tag', 'pre-release-beta');

// Helper to ask interactive questions
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// 1. Discover all workspace packages
function getWorkspacePackages() {
  const packageFolders = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const packages = [];
  for (const folder of packageFolders) {
    const pkgJsonPath = path.join(packagesDir, folder, 'package.json');
    if (fs.existsSync(pkgJsonPath)) {
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
      packages.push({
        folder,
        dir: path.join(packagesDir, folder),
        name: pkgJson.name,
        shortName: folder,
        version: pkgJson.version,
        private: Boolean(pkgJson.private),
      });
    }
  }
  return packages;
}

// 2. Detect Git-modified packages
function detectModifiedPackages(allPackages) {
  const changedFolders = new Set();
  try {
    const statusOutput = execSync('git status --porcelain', { encoding: 'utf-8' });
    const diffOutput = execSync('git diff --name-only HEAD', { encoding: 'utf-8' });
    const combinedLines = `${statusOutput}\n${diffOutput}`.split('\n');

    for (const line of combinedLines) {
      const trimmed = line.trim().replace(/^[MADRCU?! ]+\s*/, '');
      if (trimmed.startsWith('packages/')) {
        const parts = trimmed.split('/');
        if (parts[1]) {
          changedFolders.add(parts[1]);
        }
      }
    }
  } catch (err) {
    // If git diff fails (e.g. initial repo without HEAD), ignore
  }

  return allPackages.filter((p) => changedFolders.has(p.folder));
}

// 3. Check for existing changesets
function getExistingChangesets() {
  if (!fs.existsSync(changesetDir)) return [];
  return fs.readdirSync(changesetDir)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md');
}

// Main release execution flow
async function run() {
  header('Ripperdoc Package Release Pipeline');

  const allPackages = getWorkspacePackages();
  const detectedChanged = detectModifiedPackages(allPackages);
  const existingChangesets = getExistingChangesets();

  log(`📦 Found ${allPackages.length} workspace packages:`, colors.dim);
  allPackages.forEach((pkg) => {
    const isChanged = detectedChanged.some((c) => c.folder === pkg.folder);
    const statusBadge = isChanged ? `${colors.yellow}[modified]${colors.reset}` : `${colors.dim}[clean]${colors.reset}`;
    console.log(`   - ${pkg.name.padEnd(32)} (${pkg.version}) ${statusBadge}`);
  });

  if (isPublishOnly) {
    log('\n⏩ --publish-only specified: skipping changeset creation and version bump.', colors.yellow);
    await buildAndPublish(npmTag);
    return;
  }

  let selectedPackages = [];

  // Determine packages to release
  if (targetPackagesArg) {
    const inputNames = targetPackagesArg.split(',').map((s) => s.trim().toLowerCase());
    selectedPackages = allPackages.filter((p) => {
      const cleanName = p.name.replace(/^@ripperdoc-chrome77\//, '').toLowerCase();
      return inputNames.includes(p.folder.toLowerCase()) ||
             inputNames.includes(p.name.toLowerCase()) ||
             inputNames.includes(cleanName);
    });
  } else if (!skipChangeset) {
    if (process.stdin.isTTY && !releaseMessage) {
      console.log('\n' + colors.bright + 'Selection:' + colors.reset);
      console.log('Detected modified packages: ' +
        (detectedChanged.length > 0 ? detectedChanged.map((p) => p.folder).join(', ') : 'none (all clean)'));

      const defaultChoice = detectedChanged.length > 0
        ? detectedChanged.map((p) => p.folder).join(', ')
        : 'all';

      const pkgInput = await askQuestion(
        `Enter packages to release [comma-separated names, or 'all'] (Default: ${defaultChoice}): `
      );

      const resolvedInput = pkgInput || defaultChoice;
      if (resolvedInput === 'all') {
        selectedPackages = [...allPackages];
      } else {
        const names = resolvedInput.split(',').map((s) => s.trim().toLowerCase());
        selectedPackages = allPackages.filter((p) => {
          const cleanName = p.name.replace(/^@ripperdoc-chrome77\//, '').toLowerCase();
          return names.includes(p.folder.toLowerCase()) ||
                 names.includes(p.name.toLowerCase()) ||
                 names.includes(cleanName);
        });
      }

      const bumpInput = await askQuestion(`Select bump type [patch, minor, major] (Default: ${bumpType}): `);
      if (['patch', 'minor', 'major'].includes(bumpInput.toLowerCase())) {
        bumpType = bumpInput.toLowerCase();
      }

      const msgInput = await askQuestion('Enter changelog summary / release notes: ');
      releaseMessage = msgInput || `chore(release): bump package versions (${bumpType})`;

      const tagInput = await askQuestion(`Enter npm dist-tag (Default: ${npmTag}): `);
      if (tagInput) {
        npmTag = tagInput;
      }
    } else {
      // Non-interactive fallback
      selectedPackages = detectedChanged.length > 0 ? detectedChanged : [...allPackages];
      if (!releaseMessage) {
        releaseMessage = `chore: automated ${bumpType} release`;
      }
    }
  }

  if (!skipChangeset) {
    if (selectedPackages.length === 0) {
      log('\n⚠️ No packages selected for release. Exiting.', colors.yellow);
      process.exit(0);
    }

    // Step A: Generate Changeset File
    log('\n📝 1. Generating Changeset...', colors.cyan);
    if (!fs.existsSync(changesetDir)) {
      fs.mkdirSync(changesetDir, { recursive: true });
    }

    const timestamp = Date.now();
    const changesetFilename = `release-${timestamp}.md`;
    const changesetPath = path.join(changesetDir, changesetFilename);

    const frontmatterLines = selectedPackages.map((p) => `"${p.name}": ${bumpType}`).join('\n');
    const changesetContent = `---\n${frontmatterLines}\n---\n\n${releaseMessage}\n`;

    fs.writeFileSync(changesetPath, changesetContent, 'utf-8');
    log(`   ✓ Created changeset: .changeset/${changesetFilename}`, colors.green);
    log(`   Targeting: ${selectedPackages.map((p) => p.name).join(', ')} (${bumpType})`, colors.dim);
  } else {
    log('\n📝 1. Using existing changeset(s)...', colors.cyan);
    if (existingChangesets.length === 0) {
      log('   ⚠️ No existing changeset files found in .changeset/', colors.yellow);
    } else {
      existingChangesets.forEach((f) => log(`   - .changeset/${f}`, colors.dim));
    }
  }

  // Step B: Run Changeset Versioning & Changelog Generation
  log('\n📋 2. Versioning Packages and Generating Changelogs...', colors.cyan);
  try {
    execSync('npx changeset version', { stdio: 'inherit', cwd: rootDir });
    log('   ✓ Versions bumped and CHANGELOG.md generated/updated for all affected packages.', colors.green);
  } catch (err) {
    log('   ❌ Changeset versioning failed.', colors.red);
    process.exit(1);
  }

  // Step C: Build Packages
  await buildAndPublish(npmTag);
}

// Build and publish logic
async function buildAndPublish(tag) {
  log('\n🔨 3. Compiling all workspace packages (tsup + tsc)...', colors.cyan);
  try {
    execSync('node ./scripts/build.mjs', { stdio: 'inherit', cwd: rootDir });
    log('   ✓ Build completed successfully.', colors.green);
  } catch (err) {
    log('   ❌ Package build failed. Aborting publish.', colors.red);
    process.exit(1);
  }

  // Step D: Publish
  log(`\n🚀 4. Publishing packages to NPM (Tag: ${tag})...`, colors.cyan);
  if (isDryRun) {
    log('   🔍 DRY RUN: Simulating package publication...', colors.yellow);
    const packages = getWorkspacePackages();
    for (const pkg of packages) {
      try {
        console.log(`\n   Validating tarball for ${pkg.name}...`);
        execSync(`npm pack --dry-run ./packages/${pkg.folder}`, { stdio: 'inherit', cwd: rootDir });
      } catch (err) {
        log(`   ❌ Dry-run packing failed for ${pkg.name}`, colors.red);
      }
    }
    log('\n✓ Dry run complete! No packages were published.', colors.green);
  } else {
    try {
      const gitTagFlag = noGitTag ? '--no-git-tag' : '';
      const publishCmd = `npx changeset publish --tag ${tag} ${gitTagFlag}`.trim();
      log(`   Executing: ${publishCmd}`, colors.dim);
      execSync(publishCmd, { stdio: 'inherit', cwd: rootDir });
      log('\n🎉 Package publication complete!', colors.bright + colors.green);
    } catch (err) {
      log('   ❌ Changeset publish encountered an error.', colors.red);
      process.exit(1);
    }
  }

  console.log('\n' + '='.repeat(60));
  log('  Release Process Finished Successfully', colors.bright + colors.green);
  console.log('='.repeat(60) + '\n');
}

run().catch((err) => {
  console.error('\n❌ Unexpected error during release process:', err);
  process.exit(1);
});
