const spawn = require('await-spawn'),
	  path = require('path');

var Utils = function() {
	this.name = ''
}

Utils.prototype.runPython38Script = async function (scriptName, arg) {
	const scriptsDir = path.resolve(process.cwd()) + '/scripts/';
	const pythonProcess = await spawn('python3.8',[scriptName, arg], {cwd: scriptsDir});
    return pythonProcess.toString();
}

module.exports = new Utils();