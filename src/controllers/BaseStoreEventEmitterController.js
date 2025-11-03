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
			: new NestedObjectWithSubscriptions(options.storeValue ?? {}, options.storeOptions ?? {});

		this._subscriptions = new Set();
	}

	/**
	 * Returns object store
	 * @returns {module:object-subscriptions.NestedObjectWithSubscriptions}
	 */
	get store() {
		return this._store;
	}
}

export default BaseStoreEventEmitterController;