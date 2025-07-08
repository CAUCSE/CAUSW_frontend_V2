'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useGetWaitingUser } from '@/fsd_entities/user/api';
import { changeAttendanceUserState } from '@/fsd_entities/user/api';

import { ImageList } from '@/shared/ui/ImageList';

import { Header, Line, LoadingComponent, SubHeader } from '@/entities';
import { ImageModal, Modal } from '@/shared';

const WaitingDetail = ({ params: { id } }: { params: { id: string } }) => {
  const idArray = id.split('%26%26%26');
  const userId = idArray[0];
  const applicationId = idArray[1];

  const { data, isLoading } = useGetWaitingUser(userId, applicationId);

  const [onModal, setModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const rejectMessage = useRef('');

  const closeModal = () => {
    setModal(false);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {onModal ? (
        <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black p-4">
          <div className="relative flex flex-col items-center rounded-lg bg-white p-8 md:w-1/2">
            <button className="absolute top-0 left-0 p-2" onClick={closeModal}>
              <Image src="/images/modal_close_icon.png" alt="modal-close-btn" width={15} height={15} />
            </button>
            <SubHeader bold big>
              거부 사유
            </SubHeader>
            <textarea
              onChange={(event) => {
                rejectMessage.current = event.target.value;
              }}
              className="h-24 min-h-24 w-full rounded-md border-2 p-3"
              placeholder="거부 사유를 작성해주세요."
            ></textarea>
            <button
              className="mt-5 h-10 w-full rounded-sm bg-red-500 text-white"
              onClick={() => {
                changeAttendanceUserState(userId, applicationId, 'REJECT', rejectMessage.current).then(() => {
                  window.location.href = '/setting/management/attendance/waiting';
                });
              }}
            >
              거부하기
            </button>
          </div>
        </div>
      ) : null}
      <main className="flex h-full flex-col gap-2">
        <div className="relative mt-6 mb-3 flex w-full justify-center">
          <Link href=".." className="absolute left-0 text-lg">
            <span className="icon-[tabler--x] mr-6 text-3xl font-bold"></span>
          </Link>
          <Header bold>
            {data?.userName}({data?.studentId})
          </Header>
        </div>

        <SubHeader bold big>
          본 학기 등록 완료 하기 차수
        </SubHeader>
        <div>{data?.targetCompletedSemester + ''}차 학기</div>

        <SubHeader bold big>
          유저 작성 특이사항
        </SubHeader>
        <div className="h-24 min-h-24 w-full rounded-md border-2 p-3">{data?.note}</div>

        <SubHeader bold big>
          증빙 서류
        </SubHeader>
        <div className="flex h-1/2 gap-1 lg:h-2/3">
          {data?.attachedImageUrlList && <ImageList images={data.attachedImageUrlList} imageSize={125} />}
        </div>

        <div className="flex w-full justify-between">
          <div
            onClick={() => {
              changeAttendanceUserState(userId, applicationId, 'ACCEPT', rejectMessage.current).then(() => {
                window.location.href = '/setting/management/attendance/waiting';
              });
            }}
            className="bg-focus mb-3 flex h-12 w-[49%] items-center justify-center rounded-xl text-lg text-white"
          >
            승인하기
          </div>
          <div
            onClick={() => {
              setModal(true);
            }}
            className="mb-3 flex h-12 w-[49%] items-center justify-center rounded-xl bg-red-500 text-lg text-white"
          >
            거부하기
          </div>
        </div>
        {selectedImage && <ImageModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />}
      </main>
    </>
  );
};

export default WaitingDetail;
