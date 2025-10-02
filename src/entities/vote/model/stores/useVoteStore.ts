import { create } from 'zustand';

interface VoteState {
  vote: Post.VoteResponseDto;
  voteOptions: Post.VoteOptionDto[];
  totalVote: number; // 전체 투표수를 저장
  votedMostOptions: string[];
  setVote: (voteData: Post.VoteResponseDto) => void;
  incrementVoteCount: (optionId: string) => void;
  decrementVoteCount: (optionId: string) => void;
  endVote: () => void;
  restartVote: () => void;
  castVote: (optionIds: string[]) => void;
  cancelVote: (optionIds: string[]) => void;
  //addVoteUser: (optionId: string, user: VoteUserDto) => void;
  //removeVoteUser: (optionId: string, userId: string) => void;
}

export const useVoteStore = create<VoteState>((set) => ({
  vote: {
    voteId: '',
    title: '',
    allowAnonymous: false,
    allowMultiple: false,
    options: [],
    postId: '',
    isOwner: false,
    isEnd: false,
    hasVoted: false,
    totalVoteCount: 0,
    totalUserCount: 0,
  },
  voteOptions: [],
  totalVote: 0, // 초기값은 0
  votedMostOptions: [],

  setVote: (voteData: Post.VoteResponseDto) => {
    const totalVotes = voteData.options.reduce(
      (total, option) => total + option.voteCount,
      0,
    );
    const maxVoteCount = Math.max(
      ...voteData.options.map((option) => option.voteCount),
    );
    const mostVotedOptions = voteData.options
      .filter((option) => option.voteCount === maxVoteCount)
      .map((option) => option.id);
    set({
      vote: voteData,
      voteOptions: voteData.options,
      totalVote: totalVotes,
      votedMostOptions: mostVotedOptions,
    });
  },

  incrementVoteCount: (optionId: string) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        option.id === optionId
          ? { ...option, voteCount: option.voteCount + 1 }
          : option,
      );
      const newTotalVote = newOptions.reduce(
        (total, option) => total + option.voteCount,
        0,
      );
      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
        vote: {
          ...state.vote,
          options: newOptions,
          totalUserCount: state.vote.totalUserCount + 1,
        },
      };
    }),

  // 특정 옵션에 대한 투표 수 감소
  decrementVoteCount: (optionId: string) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        option.id === optionId && option.voteCount > 0
          ? { ...option, voteCount: option.voteCount - 1 }
          : option,
      );
      const newTotalVote = newOptions.reduce(
        (total, option) => total + option.voteCount,
        0,
      );

      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
        vote: {
          ...state.vote,
          options: newOptions,
          totalUserCount: state.vote.totalUserCount - 1,
        },
      };
    }),

  endVote: () =>
    set((state) => ({
      vote: { ...state.vote, isEnd: true },
    })),

  restartVote: () =>
    set((state) => ({
      vote: { ...state.vote, isEnd: false },
    })),

  castVote: (optionIds: string[]) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        optionIds.includes(option.id)
          ? { ...option, voteCount: option.voteCount + 1 }
          : option,
      );
      const newTotalVote = newOptions.reduce(
        (total, option) => total + option.voteCount,
        0,
      );
      const maxVoteCount = Math.max(
        ...newOptions.map((option) => option.voteCount),
      );
      const mostVotedOptions = newOptions
        .filter((option) => option.voteCount === maxVoteCount)
        .map((option) => option.id);

      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
        votedMostOptions: mostVotedOptions,
        vote: {
          ...state.vote,
          hasVoted: true,
          options: newOptions,
          totalUserCount: state.vote.totalUserCount + 1,
        }, // hasVoted를 true로 설정
      };
    }),

  cancelVote: (optionIds: string[]) =>
    set((state) => {
      const newOptions = state.voteOptions.map((option) =>
        optionIds.includes(option.id)
          ? { ...option, voteCount: option.voteCount - 1 }
          : option,
      );
      const newTotalVote = newOptions.reduce(
        (total, option) => total + option.voteCount,
        0,
      );
      const maxVoteCount = Math.max(
        ...newOptions.map((option) => option.voteCount),
      );
      const mostVotedOptions = newOptions
        .filter((option) => option.voteCount === maxVoteCount)
        .map((option) => option.id);

      return {
        voteOptions: newOptions,
        totalVote: newTotalVote,
        votedMostOptions: mostVotedOptions,
        vote: {
          ...state.vote,
          hasVoted: false,
          options: newOptions,
          totalUserCount: state.vote.totalUserCount - 1,
        }, // hasVoted를 true로 설정
      };
    }),

  /* // 특정 옵션에 투표한 사용자 추가
  addVoteUser: (optionId: string, user: VoteUserDto) =>
    set((state) => ({
      voteOptions: state.voteOptions.map((option) =>
        option.id === optionId
          ? { ...option, voteUsers: [...option.voteUsers, user] }
          : option
      ),
    })),*/
}));
