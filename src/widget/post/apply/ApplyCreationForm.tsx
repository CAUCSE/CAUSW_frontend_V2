'use client';

import {
  FieldArrayWithId,
  FieldErrors,
  FormProvider,
  UseFieldArrayRemove,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReturn,
  UseFormWatch,
} from 'react-hook-form';

import { CustomCheckBox, FilePreview, Question } from '@/entities';
import { useFileUploadStore, useIsWindowLg } from '@/shared';

interface ApplyCreationFormProps {
  methods: UseFormReturn<Post.PostCreateWithFormRequestDto, any, undefined>;
  register: UseFormRegister<Post.PostCreateWithFormRequestDto>;
  errors: FieldErrors<Post.PostCreateWithFormRequestDto>;
  watch: UseFormWatch<Post.PostCreateWithFormRequestDto>;
  fields: FieldArrayWithId<
    Post.PostCreateWithFormRequestDto,
    'formCreateRequestDto.questionCreateRequestDtoList',
    'id'
  >[];
  remove: UseFieldArrayRemove;
  handleSubmit: UseFormHandleSubmit<Post.PostCreateWithFormRequestDto, undefined>;
  addSurveyForm: () => void;
  onSubmit: (data: any) => void;
}

export const ApplyCreationForm = ({
  methods,
  register,
  watch,
  fields,
  errors,
  remove,
  handleSubmit,
  addSurveyForm,
  onSubmit,
}: ApplyCreationFormProps) => {
  const { isViewPointLg } = useIsWindowLg();

  const { selectedFiles } = useFileUploadStore();

  const SemesterOptions = [
    { colSize: 1, name: '1-1 수료', value: 'FIRST_SEMESTER' },
    { colSize: 1, name: '1-2 수료', value: 'SECOND_SEMESTER' },
    { colSize: 1, name: '2-1 수료', value: 'THIRD_SEMESTER' },
    { colSize: 1, name: '2-2 수료', value: 'FOURTH_SEMESTER' },
    { colSize: 1, name: '3-1 수료', value: 'FIFTH_SEMESTER' },
    { colSize: 1, name: '3-2 수료', value: 'SIXTH_SEMESTER' },
    { colSize: 1, name: '4-1 수료', value: 'SEVENTH_SEMESTER' },
    { colSize: 1, name: '4-2 수료', value: 'EIGHTH_SEMESTER' },
    { colSize: 1, name: '5-1 이상', value: 'ABOVE_NINTH_SEMESTER' },
  ];

  return (
    <FormProvider {...methods}>
      <div className="h-full w-full">
        <div className="h-[calc(100%-60px)] w-full overflow-y-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-center gap-4 lg:items-start">
            <div className="mt-4 flex w-full items-center justify-between">
              <div className="flex w-full items-center space-x-2 lg:space-x-4">
                <div className="w-full flex-col">
                  <div className="w-full">
                    <input
                      type="text"
                      placeholder="제목"
                      {...register('title', {
                        required: true,
                      })}
                      className="mb-2 w-full border-b border-black bg-transparent pb-2 text-[24px] placeholder:text-[#B7B7B7] focus:outline-none lg:p-2"
                    />
                  </div>
                  {errors.title && (
                    <p className="md:text-md flex-shrink-0 text-xs text-red-500">게시글 제목을 입력해주세요</p>
                  )}
                </div>
                <div className="flex w-[85px] items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('isQuestion')}
                    className={`h-[12px] w-[12px] cursor-pointer appearance-none border-[2px] border-solid border-[#A0A0A0] bg-[#D9D9D9] bg-[length:100%_100%] checked:border-[#FF0000] checked:bg-[#FF0000] sm:h-[18px] sm:w-[18px]`}
                  />
                  <p className={`text-[16px] ${watch('isQuestion') ? 'text-[#FF0000]' : 'text-[#8C8C8C]'} text-nowrap`}>
                    질문
                  </p>
                </div>

                <div className="flex w-[85px] items-center gap-2">
                  <input
                    type="checkbox"
                    {...register('isAnonymous')}
                    className={`h-[12px] w-[12px] cursor-pointer appearance-none border-[2px] border-solid border-[#A0A0A0] bg-[#D9D9D9] bg-[length:100%_100%] checked:border-[#FF0000] checked:bg-[#FF0000] sm:h-[18px] sm:w-[18px]`}
                  />
                  <p
                    className={`text-[16px] ${watch('isAnonymous') ? 'text-[#FF0000]' : 'text-[#8C8C8C]'} text-nowrap`}
                  >
                    익명
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-64 w-full">
              <textarea
                id="content"
                {...register('content', {
                  required: '게시글 내용을 입력해주세요.',
                })}
                placeholder="내용을 입력하세요!"
                className="h-full w-full bg-[#F8F8F8] px-2 text-[24px] outline-none placeholder:text-[#b7b7b7]"
              ></textarea>
              {errors.content && <p className="absolute bottom-4 text-sm text-red-500">{errors.content.message}</p>}
            </div>
            {selectedFiles.length === 0 ? '' : <FilePreview />}
            <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
            <div className="ml-2 flex w-56 flex-col items-center border-b border-black">
              <input
                type="text"
                id="title"
                {...register('formCreateRequestDto.title', {
                  required: true,
                })}
                placeholder="신청서 제목"
                className="h-10 bg-[#F8F8F8] text-xl placeholder:text-center"
              />
              {errors.formCreateRequestDto?.title && <p className="text-sm text-red-500">신청서 제목을 입력해주세요</p>}
            </div>
            <div className="flex h-full w-full flex-col items-center gap-5 lg:items-start">
              <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FFF5C5] py-10 lg:min-w-[490px]">
                <div className="grid grid-cols-2 gap-1 lg:grid-cols-5 lg:gap-2">
                  <CustomCheckBox
                    colSize={1}
                    name="재학생"
                    register={register('formCreateRequestDto.isAllowedEnrolled')}
                  />
                  <CustomCheckBox
                    colSize={isViewPointLg ? 4 : 1}
                    name="학생회비 납부자"
                    register={register('formCreateRequestDto.isNeedCouncilFeePaid')}
                  />
                  <CustomCheckBox
                    colSize={1}
                    name="상관없음"
                    register={register('formCreateRequestDto.allowAllEnrolledRegisteredSemester')}
                  />
                  {SemesterOptions.map((grade, idx) => (
                    <CustomCheckBox
                      colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                      value={grade.value}
                      name={grade.name}
                      key={idx}
                      register={register('formCreateRequestDto.enrolledRegisteredSemesterList')}
                    />
                  ))}
                </div>
              </div>
              {errors.formCreateRequestDto?.isAllowedEnrolled && (
                <p className="text-red-500">{errors.formCreateRequestDto.isAllowedEnrolled.message}</p>
              )}
              <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
              <div className="flex w-3/4 min-w-[260px] items-center justify-around rounded-2xl bg-[#FDE4DE] py-10 lg:min-w-[490px]">
                <div className="grid grid-cols-2 gap-x-5 gap-y-1 lg:grid-cols-5 lg:gap-2">
                  <CustomCheckBox
                    colSize={1}
                    name="휴학생"
                    register={register('formCreateRequestDto.isAllowedLeaveOfAbsence')}
                  />
                  <CustomCheckBox
                    colSize={isViewPointLg ? 4 : 1}
                    name="졸업생"
                    register={register('formCreateRequestDto.isAllowedGraduation')}
                  />
                  <CustomCheckBox
                    colSize={1}
                    name="상관없음"
                    register={register('formCreateRequestDto.allowAllLeaveOfAbsenceRegisteredSemester')}
                  />
                  {SemesterOptions.map((grade, idx) => (
                    <CustomCheckBox
                      colSize={grade.colSize as 1 | 2 | 3 | 4 | 5}
                      value={grade.value}
                      name={grade.name}
                      key={idx}
                      register={register('formCreateRequestDto.leaveOfAbsenceRegisteredSemesterList')}
                    />
                  ))}
                </div>
              </div>
              {errors.formCreateRequestDto?.isAllowedLeaveOfAbsence && (
                <p className="text-red-500">{errors.formCreateRequestDto.isAllowedLeaveOfAbsence.message}</p>
              )}
              <hr className="w-3/4 min-w-[260px] border-dashed border-black lg:min-w-[490px]" />
              <div className="flex w-3/4 min-w-[260px] flex-col bg-white lg:min-w-[500px]"></div>
            </div>
            {fields.map((field, idx) => {
              return <Question key={field.id} index={idx} removeQuestion={() => remove(idx)} />;
            })}
            <button
              type="button"
              onClick={addSurveyForm}
              className="flex h-12 w-3/4 min-w-[260px] items-center justify-center rounded-xl bg-[#D9D9D9] text-[46px] font-bold lg:min-w-[490px]"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};
