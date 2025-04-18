'use client';

import { useShallow } from 'zustand/react/shallow';

import { usePostCreationStore } from '../../model';
import { CustomToggle } from './CustomToggle';

export const QuestionToggle = () => {
  const { isQuestion, toggleQuestion } = usePostCreationStore(
    useShallow(state => ({
      isQuestion: state.isQuestion,
      toggleQuestion: state.toggleQuestion,
    })),
  );

  return <CustomToggle isChecked={isQuestion} onClick={toggleQuestion} text="질문" />;
};
