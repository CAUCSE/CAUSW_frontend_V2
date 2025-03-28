interface Props {
  content: string;}

export const AuthFormSubmitButton = ({content}: Props) => {
    return (
      <div className="w-full flex justify-center">
      <button
        type="submit"
        className="flex items-center w-40 justify-center mt-6 h-10 rounded-lg bg-focus text-white hover:bg-blue-400 mb-4"
      >
        {content}
      </button>
      </div>
    );
  };
  