import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const secureStorage = {
  async get(key: string): Promise<string | null> {
    const { value } = await SecureStoragePlugin.get({ key });
    return value;
  },

  async set(key: string, value: string): Promise<void> {
      await SecureStoragePlugin.set({ key, value });
  },

  async remove(key: string): Promise<void> {
      await SecureStoragePlugin.remove({ key });
  },
};
