// IndexedDB Utility to store and retrieve the custom MP3/Audio file locally in the browser
const DB_NAME = "YudiaBirthdayDB";
const STORE_NAME = "audioStore";
const AUDIO_KEY = "custom_bgm";

export function initAudioDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export async function saveAudioFile(file: File): Promise<void> {
  const db = await initAudioDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    
    // Store the raw File/Blob object directly in IndexedDB
    const request = store.put(file, AUDIO_KEY);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

export async function getAudioFile(): Promise<Blob | null> {
  try {
    const db = await initAudioDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(AUDIO_KEY);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("IndexedDB is not available or failed:", error);
    return null;
  }
}

export async function clearAudioFile(): Promise<void> {
  const db = await initAudioDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(AUDIO_KEY);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}
