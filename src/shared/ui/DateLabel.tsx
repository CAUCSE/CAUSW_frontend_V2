interface DateLabelProps {
  label: string;
}
export const DateLabel = ({ label }: DateLabelProps) => (
  <div className="mx-auto my-1 w-[106px] rounded-3xl bg-[#848888] py-1 text-center text-sm font-normal text-[#f4f4f4] md:w-[212px] md:bg-gray-200 md:text-[#616464]">
    {label}
  </div>
);
