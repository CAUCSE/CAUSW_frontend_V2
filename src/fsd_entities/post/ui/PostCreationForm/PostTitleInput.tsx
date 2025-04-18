import { useCallback } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { usePostCreationStore } from '../../model';

export const PostTitleInput = () => {
  const { title, setTitle } = usePostCreationStore(
    useShallow(state => ({
      title: state.title,
      setTitle: state.setTitle,
    })),
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const autoFocusOnInput = useCallback((node: HTMLInputElement) => {
    if (node) {
      node.focus();
    }
  }, []);

  return (
    <input
      type="text"
      placeholder="제목"
      value={title}
      onChange={handleTitleChange}
      className="mb-2 w-full flex-grow border-b border-black border-b-black bg-transparent pb-2 text-2xl placeholder:text-[#b7b7b7] focus:outline-none lg:p-2"
      ref={autoFocusOnInput}
    />
  );
};
