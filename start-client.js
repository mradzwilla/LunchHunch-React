//Moves into the client directory and launches React app
const args = [ 'run-script build' ];
const opts = { stdio: 'inherit', cwd: 'client', shell: true };
require('child_process').spawn('npm', args, opts);
