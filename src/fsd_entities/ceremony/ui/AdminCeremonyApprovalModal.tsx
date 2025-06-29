import { MESSAGES } from '@/fsd_shared';
import { Modal } from '@/shared';

export const CeremonyApprovalModal = ({ closeModal, ceremonyTitle }: Ceremony.CeremonyApprovalModalProps) => {
  return (
    <Modal closeModal={closeModal}>
      <div className="flex flex-col items-center gap-10 text-center">
        <h1 className="text-xl font-bold md:text-2xl">{MESSAGES.CEREMONY.REGISTRATION_SUCCESS}</h1>
        <p className="text-lg break-keep md:text-xl">
          <span className="text-[#FF0000]">{ceremonyTitle}</span> {MESSAGES.CEREMONY.REGISTRATION_SUCCESS_MESSAGE}
        </p>
      </div>
    </Modal>
  );
};
