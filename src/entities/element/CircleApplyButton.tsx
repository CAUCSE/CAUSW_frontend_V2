'use client';

import { useState } from 'react';

import { CircleService } from '@/shared';

export const CircleApplyOnButton = ({ circle, xl }: { circle: Circle.CircleRequestDto; xl: boolean }) => {
  const { editCircle } = CircleService();

  const submitHandler = () => {
    const formData = new FormData();

    formData.append(
      'circleUpdateRequestDto',
      new Blob(
        [
          JSON.stringify({
            name: circle.name,
            description: circle.description,
            circleTax: circle.circleTax,
            recruitMembers: circle.numMember,
            recruitEndDate: circle.joinedAt,
            isRecruit: !circle.isRecruit,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    editCircle(circle.id, formData);
  };

  return (
    <>
      {xl ? (
        <div
          onClick={() => {
            submitHandler();
          }}
          className="hidden h-16 w-48 items-center justify-center rounded-md border-2 border-black text-lg xl:flex"
        >
          {!circle.isRecruit ? '가입 신청 활성화' : '가입 신청 비활성화'}
        </div>
      ) : (
        <div
          onClick={() => {
            submitHandler();
          }}
          className="col-span-3 row-span-1 flex h-10 items-center justify-center rounded-md border-2 border-black text-lg xl:hidden xl:h-16"
        >
          {!circle.isRecruit ? '가입 신청 활성화' : '가입 신청 비활성화'}
        </div>
      )}
    </>
  );
};
