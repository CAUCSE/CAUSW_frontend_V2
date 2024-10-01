"use client";

import { LoadingComponent } from "@/entities";
import { FormRscService, PreviousButton } from "@/shared";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CustomButtonProps {
  width: number;
  height: number;
  bgColor: string;
  message: string;
  handleClick: () => void;
}

const CustomButton = ({
  width,
  height,
  bgColor,
  message,
  handleClick,
}: CustomButtonProps) => {
  return (
    <button
      className={`flex h-[${height}px] w-[${width}px] items-center justify-center rounded-3xl border border-black bg-[${bgColor}]`}
      onClick={handleClick}
    >
      <p className="font-bold">{message}</p>
    </button>
  );
};

const FormInfoPage = () => {
  const { getFormData } = FormRscService();

  const params = useParams();
  const { formId } = params;

  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Post.FormResponseDto | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await getFormData(formId);
        setForm(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <PreviousButton />
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="flex h-20 items-end justify-between">
            <p className="pl-4 text-2xl">{form?.title}</p>
            <div className="flex gap-4">
              <CustomButton
                width={60}
                height={40}
                bgColor="#76C6D1"
                message="요약"
                handleClick={() => {}}
              />
              <CustomButton
                width={60}
                height={40}
                bgColor="#FFFFFF"
                message="개별"
                handleClick={() => {}}
              />
            </div>
            <div className="flex gap-4 pr-4">
              <CustomButton
                width={60}
                height={40}
                bgColor="#FFFFFF"
                message="마감"
                handleClick={() => {}}
              />
              <CustomButton
                width={120}
                height={40}
                bgColor="#FFFFFF"
                message="Excel export"
                handleClick={() => {}}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormInfoPage;
