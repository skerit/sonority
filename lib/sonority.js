var Blast = __Protoblast,
    Obj = Blast.Bound.Object,
    Fn = Blast.Bound.Function,
    ChildProcess = require('child_process'),
    libpath = require('path'),
    fs = require('fs'),
    Backend = require('./sonority_backend'),
    Vlc = require('./vlc_sonority_backend'),
    Sonority;

/**
 * The Sonority class
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Sonority = Fn.inherits('Informer', function Sonority(options) {

	// Merge all the options into a new object
	this.options = Obj.merge({}, Sonority.default_options, options);

	if (this.options.debug) {
		this.debug = true;
	}

});

/**
 * Default options for a new sonority instance
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Sonority.setStatic('default_options', {
	backend: 'mplayer',
	debug: false
});

/**
 * Get the backend class
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Sonority.setMethod(function getBackendClass() {
	return Vlc;
});

/**
 * Play the file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Sonority.setMethod(function play(soundpath) {

	if (!this.backend) {
		this.backend = new Vlc(this);
	}

	if (soundpath) {
		this.backend.setFile(soundpath);
	}

	this.backend.play();

	return;

	console.log('Playing ...', soundpath)
ChildProcess.execFile('cvlc', ['--intf', 'telnet', '--telnet-password', '"t"', soundpath]);
	return

	var proc = ChildProcess.execFile('cvlc', ['--intf', 'telnet', '--telnet-password', '"t"', '-']);

	fs.createReadStream(soundpath).pipe(proc.stdin);


});

/**
 * Pause the file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Sonority.setMethod(function pause() {
	this.backend.pause();
});


module.exports = Sonority;