import { execSync } from 'child_process';

console.log('🔨 Building production bundle...\n');

try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✓ Build complete\n');
} catch (err) {
  console.error('❌ Build failed');
  process.exit(1);
}

console.log('📤 Deploying to DreamHost...\n');

try {
  execSync('node deploy-sftp.js', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Deployment failed');
  process.exit(1);
}
