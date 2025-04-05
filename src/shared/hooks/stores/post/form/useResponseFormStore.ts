import { create } from 'zustand';

interface ResponseFormStore {
  form: Post.FormResponseDto | null;
  setForm: (form: Post.FormResponseDto) => void;
  clearForm: () => void;
}

export const useResponseFormStore = create<ResponseFormStore>(set => ({
  form: null,
  setForm: form => set(() => ({ form })),
  clearForm: () => set(() => ({ form: null })),
}));
