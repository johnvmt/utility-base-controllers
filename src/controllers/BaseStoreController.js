/**
 * Base Generic Controller with Store v0.0.3
 * Extends base controller (which provides options and logger) to also provide a store
 * Similar code to BaseStoreEventEmitterController but extends BaseController instead of BaseEventEmitterController
 */

import BaseController from './BaseController.js';
import { NestedObjectWithSubscriptions } from 'object-subscriptions';

class BaseStoreController extends BaseController {
	constructor(options = {}) {
		super(options);

		this._store = options.store
			? options.store
			: new NestedObjectWithSubscriptions(options.storeValue ?? {}, options.storeOptions ?? {});
	}

	/**
	 * Returns object store
	 * @returns {module:object-subscriptions.NestedObjectWithSubscriptions}
	 */
	get store() {
		return this._store;
	}
}

export default BaseStoreController;