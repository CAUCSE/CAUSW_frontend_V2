import { create } from 'zustand';

import {
  type BoardCreationSlice,
  createBoardCreationSlice,
} from './boardCreationSlice';

export const useBoardCreationStore = create<BoardCreationSlice>()(
  (...args) => ({
    ...createBoardCreationSlice(...args),
  }),
);
