"use client";

import { ExpiredForm, NoPermissionForm, ResponseForm } from "@/widget";
import { FormProvider, useForm } from "react-hook-form";
import {
  FormService,
  Modal,
  PreviousButton,
  useHandleApplySubmit,
  useResponseFormStore,
} from "@/shared";
import { notFound, useParams } from "next/navigation";

import { LoadingComponent } from "@/entities";

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
  const { useGetFormInfo } = FormService();
  const { data, isPending, isError } = useGetFormInfo(formId as string);
  const { onSubmit, closeModal, modalMessage, modalOpen } =
    useHandleApplySubmit({ setError });

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
          <div className="flex h-20 w-full items-end pl-4 text-xl">
            {form?.title}
          </div>
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
