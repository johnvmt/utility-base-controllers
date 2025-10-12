import BaseStoreController from './BaseStoreController.js';

/**
 * Base Chid Store Controller v0.0.1
 */
class BaseChildStoreController extends BaseStoreController {
	constructor(options, parentStore, parentStorePath, deleteParentStorePathOnDestroy = true) {
		const mergedOptions = {
			...options
		};

		let useParentStore = false;
		if (!mergedOptions.store) {
			useParentStore = true;
			mergedOptions.store = parentStore.child(parentStorePath);
		}

		super(mergedOptions);

		// delete path in parent store when destroying the controller
		if (useParentStore && deleteParentStorePathOnDestroy) {
			this.addSubscription(() => {
				parentStore.delete(parentStorePath);
			});
		}

		this._parentStorePath = parentStorePath
	}

	/**
	 * Returns path parts in parent store from path parts in child store
	 * @param childStorePath
	 */
	parentStorePath(childStorePath) {
		return [...this._parentStorePath, ...childStorePath];
	}
}

export default BaseChildStoreController;