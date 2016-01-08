var Blast = __Protoblast,
    Obj = Blast.Bound.Object,
    Fn = Blast.Bound.Function,
    ChildProcess = require('child_process'),
    telnet = require('telnet-client'),
    Cvlc = require('cvlc'),
    fs = require('fs'),
    Vlc;

/**
 * The Sonority Backend class
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Vlc = Fn.inherits('SonorityBackend', function VlcSonorityBackend(sonority_player, options) {

	VlcSonorityBackend.super.call(this, sonority_player, options);

	this.cvlc = new Cvlc();
});

/**
 * Set the file to play,
 * can be a stream, filepath or url
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 *
 * @return   {String}   The type of the file set (stream, url, path)
 */
Vlc.setMethod(function setFile(file) {

	this.cvlc.setFile(file);

	return setFile.super.call(this, file);
});

/**
 * Actually start playing the file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Vlc.setMethod(function _play(optional_file) {

	if (optional_file) {
		this.cvlc.setFile(optional_file);
	}

	this.cvlc.play();
});

/**
 * Pause the file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Vlc.setMethod(function _pause() {
	this.cvlc.cmd('pause');
});

module.exports = Vlc;