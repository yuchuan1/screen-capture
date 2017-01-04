const spawn = require('child_process').spawn;
//const screenCapture = spawn('ls', ['-lh', '/usr']);
var fs = require('fs');

var appRouter = function(app) {
    app.get("/", function(req, res) {
        console.log(process.cwd() + '\\bin\\' + 'CmdCapture.exe');
        const screenCapture = spawn(process.cwd() + '\\bin\\' + 'CmdCapture.exe', ['/f', 'snapshot.png']);
        screenCapture.stdout.on('data', (data) => {
          //  console.log(`stdout: ${data}`);
        });
        screenCapture.stderr.on('data', (data) => {
          //  console.log(`stderr: ${data}`);
        });

        screenCapture.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if(code == 0){
              //var img = fs.readFileSync(process.cwd() + 'snapshot.png');
              res.sendFile(process.cwd() + '\\snapshot.png');
            } else {
              res.send("Hello World");
            }
        });
        //res.send("Hello World");
    });
}

module.exports = appRouter;
