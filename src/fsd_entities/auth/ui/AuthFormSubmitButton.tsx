interface Props {
  content: string;
}

export const AuthFormSubmitButton = ({ content }: Props) => {
  return (
    <div className="flex w-full justify-center">
      <button
        type="submit"
        className="mb-4 mt-6 flex h-10 w-40 items-center justify-center rounded-lg bg-focus text-white hover:bg-blue-400"
      >
        {content}
      </button>
    </div>
  );
};
