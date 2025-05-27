'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { Header, LoadingComponent } from '@/entities';
import { CircleRscService, CircleService } from '@/shared';

const CircleApplyManagement = ({
  params: { state, id, userId },
}: {
  params: { state: string; id: string; userId: string };
}) => {
  const { getApplicationById, rejectApplyUser, acceptApplyUser, getApplication } = CircleService();

  const { getCircleUserByStateAndId } = CircleRscService();

  const [data, setData] = useState<Circle.Apply | null>(null);
  const [application, setApplication] = useState<Post.QuestionResponseDto[]>([]);
  const [applicationId, setApplicationId] = useState<string>('');
  const [user, setUser] = useState<Circle.CircleUser>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3]: [Circle.Apply, Post.FormResponseDto, Circle.CircleUser] = await Promise.all([
          getApplicationById(id, userId),
          getApplication(id),
          getCircleUserByStateAndId(id, 'AWAIT', userId),
        ]);
        setData(data1);
        setApplication(data2.questionResponseDtoList.sort((a, b) => a.questionNumber - b.questionNumber));
        setApplicationId(data3.id);
        setUser(data3);
      } catch (error) {
        throw error;
      }
    };
    fetchData();
  }, []);

  if (!data) return <LoadingComponent />;

  return (
    <>
      <div className="relative left-1/2 mb-10 mt-10 flex w-3/4 min-w-[280px] -translate-x-1/2 transform flex-col gap-3 sm:min-w-[530px]">
        <Link href={'/setting/management/circle/' + id + '/apply'} className="flex items-center text-lg">
          <span className="icon-[weui--back-filled] mr-6 text-3xl font-bold"></span>
          이전
        </Link>
        <Header bold big>
          {user?.user.name}({user?.user.studentId})의 동아리 신청서
        </Header>
      </div>
      <div className="flex w-full flex-col items-center gap-8 overflow-y-auto">
        {application.map((question: Post.QuestionResponseDto) => {
          const userReply = data.replyQuestionResponseDtoList.filter(
            (reply) => reply.questionId === question.questionId,
          )[0];
          return (
            <div key={question.questionId} className="w-3/4 min-w-[280px] sm:min-w-[530px]">
              <div className="flex w-full items-center justify-between">
                <div className="w-2/3 bg-[#D9D9D9] p-2 text-[#FF0000] sm:min-w-[200px]">
                  <p className="truncate text-[14px] group-hover:block sm:text-xl">{question.questionText}</p>
                </div>
              </div>
              <div className="flex w-full flex-col items-start gap-2 rounded-md border border-black px-4 py-2">
                {question.questionType === 'OBJECTIVE' ? (
                  question.optionResponseDtoList
                    .sort((a, b) => a.optionNumber - b.optionNumber)
                    .map((option) => {
                      return (
                        <div key={option.optionId} className="flex gap-2">
                          {question.isMultiple ? (
                            <input
                              type="checkbox"
                              checked={userReply.selectedOptionList.includes(option.optionNumber)}
                              disabled
                            />
                          ) : (
                            <input
                              type="radio"
                              checked={userReply.selectedOptionList.includes(option.optionNumber)}
                              disabled
                            />
                          )}
                          <p>{option.optionText}</p>
                        </div>
                      );
                    })
                ) : (
                  <input
                    value={userReply.questionAnswer}
                    readOnly
                    className="flex h-10 w-full items-center bg-[#E8E8E8] pl-2 text-[#515151]"
                  />
                )}
              </div>
            </div>
          );
        })}
        <div className="flex w-full flex-col justify-center gap-3 md:flex-row">
          <button
            className="flex h-10 w-80 items-center justify-center rounded-xl bg-default text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              acceptApplyUser(applicationId).then(() => {
                window.location.href = '/setting/management/circle/' + id + '/apply';
              });
            }}
          >
            승인
          </button>
          <button
            className="flex h-10 w-80 items-center justify-center rounded-xl bg-gray-400 text-lg text-white md:h-16 lg:text-xl"
            onClick={() => {
              rejectApplyUser(applicationId).then(() => {
                window.location.href = '/setting/management/circle/' + id + '/apply';
              });
            }}
          >
            거부
          </button>
        </div>
      </div>
    </>
  );
};

export default CircleApplyManagement;
