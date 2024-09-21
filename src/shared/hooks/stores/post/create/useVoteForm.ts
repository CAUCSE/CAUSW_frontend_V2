import { useCreateVoteStore } from '@/shared';

export const useVoteForm = () => {
  const {
    isVote,
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    toggleVote,
    setVoteTitle,
    setOption,
    addOption,
    removeOption,
    toggleMultipleChoice,
    toggleAllowAnonymous,
    submitVote,
  } = useCreateVoteStore();

  return {
    isVote,
    voteTitle,
    options,
    isMultipleChoice,
    allowAnonymous,
    handleVoteToggle: toggleVote,
    handleVoteTitleChange: setVoteTitle,
    handleVoteChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
      setOption(index, e.target.value),
    handleAddOption: addOption,
    handleRemoveOption: removeOption,
    handleSelectMultiple: toggleMultipleChoice,
    handleAllowAnonymous: toggleAllowAnonymous,
    handleSubmitVote: submitVote,
  };
};
