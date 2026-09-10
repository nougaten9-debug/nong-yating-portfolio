import { spawnSync } from 'node:child_process';

const environment = { ...process.env, TENCENT_CLOUD: 'true' };

for (const [command, args] of [
  [process.execPath, ['node_modules/vinext/dist/cli.js', 'build']],
  [process.execPath, ['scripts/prepare-tencent-cloud.mjs']],
]) {
  const result = spawnSync(command, args, {
    env: environment,
    stdio: 'inherit',
  });

  if (result.status !== 0) process.exit(result.status ?? 1);
}
