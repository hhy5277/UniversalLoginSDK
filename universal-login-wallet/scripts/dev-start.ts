const {startDevelopment, createEnv, spawnProcess} = require('universal-login-ops');

function runWebServer(vars: any) {
  const env = {...process.env, ...vars};
  spawnProcess('web', 'yarn', ['start'], {env});
}

async function start() {
  const basicRelayer = true;
  const artefacts = await startDevelopment('', basicRelayer);
  const env = createEnv(artefacts);
  runWebServer(env);
}

start().catch(console.error);
