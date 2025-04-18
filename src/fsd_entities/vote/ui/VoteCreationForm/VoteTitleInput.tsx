'use client';

import { useShallow } from 'zustand/react/shallow';

import { useVoteCreationStore } from '../../model';

export const VoteTitleInput = () => {
  const { voteTitle, setVoteTitle } = useVoteCreationStore(
    useShallow(state => ({
      voteTitle: state.voteTitle,
      setVoteTitle: state.setVoteTitle,
    })),
  );

  const handleVoteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVoteTitle(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="투표 제목"
      value={voteTitle}
      onChange={handleVoteTitleChange}
      className="w-full border-b-post-title-input border-black bg-transparent p-1 text-lg placeholder:text-create-post-text focus:outline-none md:text-2xl lg:p-2"
    />
  );
};
