import * as process from 'process';
import {spawn, spawnSync, SpawnSyncOptionsWithStringEncoding, SpawnSyncReturns} from 'child_process';

// declaring utf8 makes sure a string is returned (as opposed to a buffer) from spawnSync
const spawnSyncOptions: SpawnSyncOptionsWithStringEncoding = {
  encoding: 'utf8'
};

/**
 * Some few adaptions are necessary for making installation work on windows
 */
const isWin = /^win/.test(process.platform);
const spawnSyncCommand = (cmdName): string => {
  return isWin ? `${cmdName}.cmd` : cmdName;
};

/**
 * Test all modules
 */
const startingDirectory = process.cwd();
// TODO: re-add main module
const modules = ['dbadapter', 'mongo', 'mysql', 'router', 'auth'];
modules.forEach(moduleName => {
  changeToDirectory(startingDirectory);
  changeToDirectory(`${moduleName}-module`);
  const testModule = spawnSync(spawnSyncCommand('npm'), isWin ? ['run', 'windows_test'] : ['test'], spawnSyncOptions);
  handleCommandResult(testModule);
});

/**
 * Helper functions
 */
function handleCommandResult(result: SpawnSyncReturns<string>) {
  if (result.error) {
    console.error('ERROR in process:', result.error);
    process.exit();
  } else if (result.stderr !== undefined && result.stderr !== "") {
    console.error('stderr not empty:', result.stderr);
    process.exit();
  } else {
    console.log(result.stdout);
  }
}

function changeToDirectory (dir) {
  try {
    process.chdir(dir);
  } catch (err) {
    console.log(`Could not change to directory ${dir}: ${err}`);
    process.exit();
  }
}
