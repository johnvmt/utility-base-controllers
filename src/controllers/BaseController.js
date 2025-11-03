/**
 * Base generic controller v0.0.1
 * Provides options and a logger from the options
 */

class BaseController {
	constructor(options = {}) {
		this._options = options;
        this._subscriptions = new Set();
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

    /**
     * Add a subscription (cancel function) to call when destroyed
     * @param cancelSubscription
     */
    addSubscription(cancelSubscription) {
        this._subscriptions.add(cancelSubscription);
    }

    /**
     * Remove a subscription (cancel function) if it is no longer needed
     * @param cancelSubscription
     */
    removeSubscription(cancelSubscription) {
        this._subscriptions.delete(cancelSubscription);
    }

    /**
     * Cancel all subscriptions when the controller is removed from the DOM
     */
    destroy() {
        for(let cancelSubscription of this._subscriptions) {
            try {
                cancelSubscription();
            }
            catch(error) {
                this.log("error", `Error in callback during store controller destruction: ${error.message}`);
            }
        }

        this._subscriptions.clear();
    }
}

export default BaseController;