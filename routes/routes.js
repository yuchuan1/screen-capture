const spawn = require('child_process').spawn;
var fs = require('fs');

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send('<a href=\'/desktop\' />/desktop</a> to get screenshot of the entire desktop, <br /><a href=\'/activeWindow\' />/activeWindow</a> to get screenshot of current active window');
    });
    app.get("/desktop", function(req, res) {
        const screenCapture = spawn(process.cwd() + '\\bin\\' + 'CmdCapture.exe', ['/f', 'snapshot.png']);
        screenCapture.stdout.on('data', (data) => {
            //  console.log(`stdout: ${data}`);
        });
        screenCapture.stderr.on('data', (data) => {
            //  console.log(`stderr: ${data}`);
        });

        screenCapture.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code == 0) {
                var img = fs.readFileSync(process.cwd() + '\\snapshot.png');
                res.type('image/png');
                res.end(img, 'binary');
            } else {
                res.send("Error");
            }
        });
    });

    app.get("/activeWindow", function(req, res) {
        const screenCapture = spawn(process.cwd() + '\\bin\\' + 'nircmd.exe', ['savescreenshotwin', 'snapshot.png']);
        screenCapture.stdout.on('data', (data) => {
            //  console.log(`stdout: ${data}`);
        });
        screenCapture.stderr.on('data', (data) => {
            //  console.log(`stderr: ${data}`);
        });

        screenCapture.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (code == 0) {
                var img = fs.readFileSync(process.cwd() + '\\snapshot.png');
                res.type('image/png');
                res.end(img, 'binary');
            } else {
                res.send("Error");
            }
        });
    });
}

module.exports = appRouter;
