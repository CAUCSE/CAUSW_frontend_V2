interface Props {
  content: string;
}

export const AuthFormSubmitButton = ({ content }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <button
        type="submit"
        className="bg-focus mt-6 mb-4 flex h-10 w-40 items-center justify-center rounded-lg text-white hover:bg-blue-400"
      >
        {content}
      </button>
    </div>
  );
};
