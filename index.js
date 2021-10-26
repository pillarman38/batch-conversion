const { spawn } = require('child_process');
let fs = require('fs')
var i = 0
const Path = require("path");
var arrLeng = 0;
let Files  = [];

var hi = fs.readdirSync("F:/Shows/")

function ThroughDirectory(Directory) {
  fs.readdirSync(Directory).forEach(File => {
      const Absolute = Path.join(Directory, File);
      if (fs.statSync(Absolute).isDirectory()) return ThroughDirectory(Absolute);
      else {
        Files.push(Absolute)
      };
  });
}

ThroughDirectory("F:/Shows/")
console.log("FILES", Files);

var newJob = function () {
  var dirrSplitter = Files[i].split("\\")
  console.log(dirrSplitter);
    var newProc = spawn('F:/ffmpeg', [
      '-i', `${dirrSplitter[0]}//${dirrSplitter[1]}//${dirrSplitter[2]}//${dirrSplitter[3]}`,
      // '-y', 
      '-c:v', 'copy', 
      // '-crf', '18',
      '-acodec', 
      'aac','-ac', '6', 
      // '-filter:v', 'scale=w=1920:h=1080', 
      `H:/Jakes shows/${dirrSplitter[3]}.m4v`
    ])
    newProc.on('error', function (err) {
      console.log('ls error', err);
    });
    
    newProc.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
    });
    
    newProc.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
    
    newProc.on('close', function (code) {
        if(i + 1 != Files.length) {
          i += 1
          setTimeout(function(){ console.log("Moving on..."); }, 10000);
          newJob()
        } else {
          console.log("Done");
        }
        console.log('child process exited with code ' + code);
    });
    processId = newProc.pid
  // }
}
newJob()





