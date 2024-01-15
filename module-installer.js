const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const port = 1002;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/idle/module-installer/index.html');
});

app.post('/submit', (req, res) => {
  const packageName = req.body.input.trim();
  var installPath = req.body.inpath.trim().replace(/\\/g, '/');
  const npmCommand = `npm install ${packageName} --prefix ${installPath}`;
  console.log('User Input:', packageName);

  // Validate and sanitize the input before running the command
  if (/^[a-zA-Z0-9\s-]+$/.test(packageName)) {
    exec(npmCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error.message}`);
        res.send(`Error executing command: ${error.message}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
      res.send(`Command output: ${stdout}`);
    });
  } else {
    console.error('Invalid input. Only alphanumeric characters, spaces, and hyphens are allowed.');
    res.send('Invalid input. Only alphanumeric characters, spaces, and hyphens are allowed.');
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
  exec(`start http://localhost:${port}`);

});
