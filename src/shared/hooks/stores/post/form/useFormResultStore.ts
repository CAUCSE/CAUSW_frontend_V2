import { create } from 'zustand';

interface FormResultStore {
  formData: Post.FormResponseDto | null;
  resultView: Form.TResultView;
  sortedQuestionIdList: string[];
  currentPage: number;
  setFormData: (data: Post.FormResponseDto) => void;
  setFormClosedStatus: (status: boolean) => void;
  setResultView: (view: Form.TResultView) => void;
  setCurrentPage: (num: number) => void;
}

export const useFormResultStore = create<FormResultStore>((set) => ({
  formData: null,
  resultView: 'summary',
  sortedQuestionIdList: [],
  currentPage: 1,
  setFormData: (data) =>
    set((state) => {
      if (state.formData && state.formData.formId === data.formId) {
        return {};
      }
      const questionMap = new Map<number, string>();
      data.questionResponseDtoList.forEach((question) => {
        questionMap.set(question.questionNumber, question.questionId);
      });
      return {
        formData: data,
        sortedQuestionIdList: Array.from(questionMap.entries())
          .sort((a, b) => a[0] - b[0])
          .map((value) => value[1]),
      };
    }),
  setFormClosedStatus: (status) =>
    set((state) => ({
      formData: { ...state.formData!, isClosed: status },
    })),
  setResultView: (view) => set({ resultView: view }),
  setCurrentPage: (num) => set({ currentPage: num }),
}));
