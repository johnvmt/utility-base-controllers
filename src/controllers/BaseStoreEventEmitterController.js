/**
 * Base Generic Controller with Store and EventEmitter v0.0.3
 * Extends base controller (which provides options, logger and Event Emitter) to also provide a store
 * Similar code to BaseStoreController but extends BaseEventEmitterController instead of BaseController
 */

import BaseEventEmitterController from './BaseEventEmitterController.js';
import { NestedObjectWithSubscriptions } from 'object-subscriptions';

class BaseStoreEventEmitterController extends BaseEventEmitterController {
	constructor(options = {}) {
		super(options);

		this._store = options.store
			? options.store
			: new NestedObjectWithSubscriptions(options.value ?? {});

		this._subscriptions = new Set();
	}

	/**
	 * Returns object store
	 * @returns {module:object-subscriptions.NestedObjectWithSubscriptions}
	 */
	get store() {
		return this._store;
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
	}
}

export default BaseStoreEventEmitterController;