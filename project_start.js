const os = require('os');
const path = require('path');
const spawn = require('cross-spawn');

function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return null;
}

const ip = getLocalIP();

const portArg = process.argv[2];
const port = portArg && /^\d+$/.test(portArg) ? portArg : '4208';

if (!ip) {
  console.error('Dont have a local IP address please check your network connection.');
  process.exit(1);
}

const ngCommand = process.platform === 'win32' ? 'ng.cmd' : 'ng';
const ngPath = path.join(__dirname, 'node_modules', '.bin', ngCommand);

console.log(`Project starting on ${ip}:${port} using Angular CLI...`);

const ng = spawn(ngPath, ['serve', '--host', ip, '--port', port, '-o'], {
  stdio: 'inherit'
});

ng.on('error', (err) => {
  console.error('Error:', err.message);
});

ng.on('close', (code) => {
  console.log(`ng serve closed with code ${code}`);
});


// Kullanım !!
// npm start
// veya
// npm start [istenilen port numarası]
