import { execSync } from 'node:child_process';

const args = process.argv.slice(2);

try {
  if (args.length === 0) {
    console.log('📦 Building all workspace packages...');
    execSync('pnpm -r --filter "./packages/*" build', { stdio: 'inherit' });
  } else {
    // Normalizes "tokens" -> "@ripperdoc/tokens"
    const filters = args
      .map((pkg) => `--filter "@ripperdoc/${pkg.replace(/^@ripperdoc\//, '')}"`)
      .join(' ');

    console.log(`📦 Building targeted packages: ${args.join(', ')}...`);
    execSync(`pnpm ${filters} build`, { stdio: 'inherit' });
  }
} catch (error) {
  process.exit(error.status || 1);
}
