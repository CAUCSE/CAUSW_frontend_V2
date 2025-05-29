import { MESSAGES } from '@/fsd_shared';
import { Modal } from '@/shared';

export const OccasionApprovalModal = ({ closeModal, occasionTitle }: Occasion.OccasionApprovalModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col items-center gap-10 text-center">
        <h1 className="text-xl font-bold md:text-2xl">{MESSAGES.OCCASION.REGISTRATION_SUCCESS}</h1>
        <p className="text-lg break-keep md:text-xl">
          <span className="text-[#FF0000]">{occasionTitle}</span> {MESSAGES.OCCASION.REGISTRATION_SUCCESS_MESSAGE}
        </p>
      </div>
    </Modal>
  );
};
