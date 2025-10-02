'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { FormTitleInput, Question } from '@/entities/form';
import { PostSchema } from '@/entities/post';

import PlusIcon from '../../../../../public/icons/add_icon.svg';
import { EnrollmentConditionSection } from '../EnrollmentConditionSection';
import { LeaveOfAbsenceAndGraduationSection } from '../LeaveOfAbsenceAndGraduationSection';

export const FormCreationForm = () => {
  const { control } = useFormContext<PostSchema>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'formCreateRequestDto.questionCreateRequestDtoList',
  });

  const addSurveyForm = () => {
    const newQuestion: Post.QuestionCreateRequestDto = {
      questionType: 'SUBJECTIVE',
      isMultiple: false,
      questionText: '',
      optionCreateRequestDtoList: [],
    };

    append(newQuestion);
  };

  return (
    <div className="flex flex-col gap-5">
      <FormTitleInput />
      <EnrollmentConditionSection />
      <LeaveOfAbsenceAndGraduationSection />
      {fields.map((field, idx) => (
        <Question
          key={field.id}
          index={idx}
          removeQuestion={() => remove(idx)}
        />
      ))}
      <button
        type="button"
        onClick={addSurveyForm}
        className="flex h-12 w-3/4 min-w-[260px] items-center justify-center rounded-xl bg-[#D9D9D9] text-[46px] font-bold lg:min-w-[490px]"
      >
        <PlusIcon width={28} height={28} />
      </button>
    </div>
  );
};
