import { spawnSync } from 'node:child_process'

const env = { ...process.env, NODE_ENV: 'production' }
const child = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env,
  shell: false,
})

if (typeof child.status === 'number') {
  process.exit(child.status)
}

process.exit(1)
