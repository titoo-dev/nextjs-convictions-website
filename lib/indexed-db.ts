const DB_NAME = 'petition-images-db';
const DB_VERSION = 1;
const STORE_NAME = 'images';

type StoredImage = {
	id: string;
	blob: Blob;
	fileName: string;
	fileType: string;
	createdAt: string;
};

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
	return new Promise((resolve, reject) => {
		if (typeof window === 'undefined') {
			reject(new Error('IndexedDB is not available in this environment'));
			return;
		}

		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onerror = () => {
			reject(new Error('Failed to open IndexedDB'));
		};

		request.onsuccess = () => {
			resolve(request.result);
		};

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;

			if (!db.objectStoreNames.contains(STORE_NAME)) {
				const store = db.createObjectStore(STORE_NAME, {
					keyPath: 'id',
				});
				store.createIndex('fileName', 'fileName', { unique: false });
				store.createIndex('createdAt', 'createdAt', { unique: false });
			}
		};
	});
};

export const imageIndexedDB = {
	/**
	 * Store an image file in IndexedDB
	 */
	storeImage: async (file: File, id?: string): Promise<string> => {
		try {
			const db = await initDB();
			const imageId =
				id ||
				`img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

			const imageData: StoredImage = {
				id: imageId,
				blob: file,
				fileName: file.name,
				fileType: file.type,
				createdAt: new Date().toISOString(),
			};

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readwrite');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.put(imageData);

				request.onsuccess = () => {
					resolve(imageId);
				};

				request.onerror = () => {
					reject(new Error('Failed to store image in IndexedDB'));
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error storing image:', error);
			throw new Error('Failed to store image in IndexedDB');
		}
	},

	/**
	 * Retrieve an image file from IndexedDB
	 */
	getImage: async (id: string): Promise<File | null> => {
		try {
			const db = await initDB();

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readonly');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.get(id);

				request.onsuccess = () => {
					const result = request.result as StoredImage | undefined;

					if (result) {
						const file = new File([result.blob], result.fileName, {
							type: result.fileType,
						});
						resolve(file);
					} else {
						resolve(null);
					}
				};

				request.onerror = () => {
					reject(
						new Error('Failed to retrieve image from IndexedDB')
					);
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error retrieving image:', error);
			return null;
		}
	},

	/**
	 * Get an object URL for displaying an image
	 */
	getImageUrl: async (id: string): Promise<string | null> => {
		try {
			const file = await imageIndexedDB.getImage(id);

			if (file) {
				return URL.createObjectURL(file);
			}

			return null;
		} catch (error) {
			console.error('Error getting image URL:', error);
			return null;
		}
	},

	/**
	 * Delete an image from IndexedDB
	 */
	deleteImage: async (id: string): Promise<boolean> => {
		try {
			const db = await initDB();

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readwrite');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.delete(id);

				request.onsuccess = () => {
					resolve(true);
				};

				request.onerror = () => {
					reject(new Error('Failed to delete image from IndexedDB'));
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error deleting image:', error);
			return false;
		}
	},

	/**
	 * List all stored images
	 */
	listImages: async (): Promise<
		Array<{
			id: string;
			fileName: string;
			fileType: string;
			createdAt: string;
		}>
	> => {
		try {
			const db = await initDB();

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readonly');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.getAll();

				request.onsuccess = () => {
					const results = request.result as StoredImage[];
					const imageList = results.map(
						({ id, fileName, fileType, createdAt }) => ({
							id,
							fileName,
							fileType,
							createdAt,
						})
					);
					resolve(imageList);
				};

				request.onerror = () => {
					reject(new Error('Failed to list images from IndexedDB'));
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error listing images:', error);
			return [];
		}
	},

	/**
	 * Clear all stored images
	 */
	clearAllImages: async (): Promise<boolean> => {
		try {
			const db = await initDB();

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readwrite');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.clear();

				request.onsuccess = () => {
					resolve(true);
				};

				request.onerror = () => {
					reject(new Error('Failed to clear images from IndexedDB'));
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error clearing images:', error);
			return false;
		}
	},

	/**
	 * Check if an image exists in IndexedDB
	 */
	imageExists: async (id: string): Promise<boolean> => {
		try {
			const db = await initDB();

			return new Promise((resolve, reject) => {
				const transaction = db.transaction([STORE_NAME], 'readonly');
				const store = transaction.objectStore(STORE_NAME);
				const request = store.count(id);

				request.onsuccess = () => {
					resolve(request.result > 0);
				};

				request.onerror = () => {
					reject(
						new Error(
							'Failed to check image existence in IndexedDB'
						)
					);
				};

				transaction.oncomplete = () => {
					db.close();
				};
			});
		} catch (error) {
			console.error('Error checking image existence:', error);
			return false;
		}
	},
};
