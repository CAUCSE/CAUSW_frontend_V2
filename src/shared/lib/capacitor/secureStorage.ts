import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    try {
      const { value } = await SecureStoragePlugin.get({ key });
      return value;
    } catch (error) {
      return null;
    }
  },

  async set(key: string, value: string): Promise<void> {
    await SecureStoragePlugin.set({ key, value });
  },

  async remove(key: string): Promise<void> {
    await SecureStoragePlugin.remove({ key });
  }
};
