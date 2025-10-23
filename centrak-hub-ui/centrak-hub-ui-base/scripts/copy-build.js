// Copy CRA build into Laravel public/app
const path = require('path');
const fs = require('fs-extra');

async function main() {
  const root = path.resolve(__dirname, '..');
  const buildDir = path.join(root, 'build');
  // Prefer centrak-hub, fallback to GPS-Tracker for backward compatibility
  const candidateTargets = [
    path.resolve(root, '..', '..', 'centrak-hub', 'public', 'app'),
    path.resolve(root, '..', '..', 'GPS-Tracker', 'public', 'app'),
  ];
  const targetDir = candidateTargets.find((p) => fs.pathExistsSync(path.dirname(p))) || candidateTargets[0];

  if (!(await fs.pathExists(buildDir))) {
    console.error('Build directory not found:', buildDir);
    process.exit(1);
  }

  await fs.ensureDir(targetDir);
  await fs.emptyDir(targetDir);
  await fs.copy(buildDir, targetDir);
  console.log('Copied React build to:', targetDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
