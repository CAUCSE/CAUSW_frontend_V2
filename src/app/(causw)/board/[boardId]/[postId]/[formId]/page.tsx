'use client';

import { notFound, useParams } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';

import { LoadingComponent } from '@/entities';
import { PreviousButton } from '@/fsd_shared';
import { FormService, Modal, useHandleApplySubmit, useResponseFormStore } from '@/shared';
import { ExpiredForm, NoPermissionForm, ResponseForm } from '@/widget';

const ApplyPage = () => {
  const params = useParams();
  const { formId } = params;

  const methods = useForm<Form.QuestionReplyRequestDtoList>({
    defaultValues: {
      questionReplyRequestDtoList: [],
    },
  });
  const form = useResponseFormStore((state) => state.form);

  const { setError } = methods;
  const { useGetFormResponseInfo } = FormService();
  const { data, isPending, isError } = useGetFormResponseInfo(formId as string);
  const { onSubmit, closeModal, modalMessage, modalOpen } = useHandleApplySubmit({ setError });

  if (isPending) {
    return <LoadingComponent />;
  }

  if (isError) {
    return notFound();
  }

  const canReply = data[1];

  return (
    <>
      <PreviousButton />
      {form?.isClosed ? (
        <ExpiredForm />
      ) : !canReply ? (
        <NoPermissionForm />
      ) : (
        <>
          <div className="flex h-20 w-full items-end pl-4 text-xl">{form?.title}</div>
          <FormProvider {...methods}>
            <ResponseForm onSubmit={onSubmit} />
          </FormProvider>
          {modalOpen && (
            <Modal closeModal={closeModal}>
              <p>{modalMessage}</p>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default ApplyPage;
