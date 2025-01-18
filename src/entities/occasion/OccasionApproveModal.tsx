import { Modal } from "@/shared";

interface OccasionApproveModalProp {
  closeModal: () => void;
  occasionTitle: string;
}

export const OccasionApproveModal = ({
  closeModal,
  occasionTitle,
}: OccasionApproveModalProp) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col items-center gap-10 text-center">
        <h1 className="text-2xl font-bold">경조사 등록 성공</h1>
        <p className="text-xl">
          <span className="text-[#FF0000]">{occasionTitle}</span> 경조사 등록
          신청이 정상적으로 승인되었습니다.
        </p>
      </div>
    </Modal>
  );
};
