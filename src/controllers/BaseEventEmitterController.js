/**
 * Base generic controller with event emitter v0.0.1
 * Provides options and a logger from the options
 */
import SimpleEventEmitter from "cancelable-event-emitter";

class BaseEventEmitterController extends SimpleEventEmitter {
	constructor(options = {}) {
		super();
		this._options = options;
	}

	/**
	 * Returns options object
	 * @returns {{}}
	 */
	get options() {
		return this._options;
	}

	/**
	 * Overwrite options object
	 * @param options
	 */
	set options(options) {
		this._options = options;
	}

	/**
	 * Get the logger from options, if it is set
	 * @returns {*}
	 */
	get logger() {
		return this._options.logger;
	}

	/**
	 * Log a message to the logger, if it exists
	 * @param severity
	 * @param messageParts
	 */
	log(severity, ...messageParts) {
		if(this.logger)
			this.logger[severity](...messageParts);
	}
}

export default BaseEventEmitterController;