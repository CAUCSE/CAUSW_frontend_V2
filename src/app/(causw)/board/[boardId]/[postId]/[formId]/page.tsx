'use client';

import { notFound, useParams } from 'next/navigation';

import { FormProvider, useForm } from 'react-hook-form';

import { LoadingComponent, Modal } from '@/fsd_shared';
import { PreviousButton } from '@/fsd_shared';
import { useResponseFormStore } from '@/entities/form/model/stores';
import { useGetFormResponseInfo } from '@/entities/form/model';
import { useHandleApplySubmit } from '@/entities/form/model/hooks';
import { ExpiredForm, NoPermissionForm, ResponseForm } from '@/fsd_widgets/form/ui';

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
    <div className="h-full w-full pt-3">
      <PreviousButton className="pl-5" />
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
    </div>
  );
};

export default ApplyPage;
