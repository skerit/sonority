var Blast = __Protoblast,
    Obj = Blast.Bound.Object,
    Fn = Blast.Bound.Function,
    Backend;

/**
 * The Sonority Backend class
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend = Fn.inherits('Informer', function SonorityBackend(sonority_player, options) {

	this.sonority = sonority_player;
	this.options = options;

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
Backend.setMethod(function setFile(file) {

	var type;

	if (!file) {
		throw new Error('Undefined file given');
	}

	if (typeof file == 'object') {
		// Check for streams
		if (typeof file.read == 'function' && typeof file.on == 'function') {
			type = this.setStream(file);
		} else {
			// Check for buffers?
			throw new Error('Not a valid stream');
		}
	} else if (typeof file == 'string') {
		if (file.slice(0, 4) == 'http') {
			type = this.setUrl(file);
		} else {
			type = this.setPath(file);
		}
	} else {
		throw new Error('Not a valid filename given');
	}

	// Emit the set_file event
	this.emit('set_file', type, file);

	// Set the type of file
	this.file_type = type;
});

/**
 * Set a stream to play
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function setStream(stream) {

	// Store the stream
	this.file_stream = stream;

	// See if this instance has specific functionality
	if (this._setStream != null) this._setStream(stream);

	return 'stream';
});

/**
 * Set a url to play
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function setUrl(url) {

	// Store the url
	this.file_url = url;

	// See if this instance has specific functionality
	if (this._setUrl != null) this._setUrl(url);

	return 'url';
});

/**
 * Set a path to play
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function setPath(file_path) {

	// Store the path
	this.file_path = file_path;

	// See if this instance has specific functionality
	if (this._setPath != null) this._setPath(file_path);

	return 'path';
});

/**
 * Play the audio file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function play(optional_file) {

	// Set the file if a file is given
	if (optional_file) {
		this.setFile(optional_file);
	}

	// Execute the _play method
	this._play(optional_file);
});

/**
 * Method that should actually start playing the file,
 * needs to be overwritten by backend
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function _play(optional_file) {
	throw new Error('Method has not been implemented in ' + this.constructor.name);
});

/**
 * Pause the audio file
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function pause() {
	// Execute the _pause method
	this._pause();
});

/**
 * Method that should actually pause the file,
 * needs to be overwritten by backend
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    0.1.0
 * @version  0.1.0
 */
Backend.setMethod(function _pause() {
	throw new Error('Method has not been implemented in ' + this.constructor.name);
});

module.exports = Backend;