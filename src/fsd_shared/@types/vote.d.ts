declare namespace Vote {
  export interface VoteResponseDto {
    voteId: string;
    title: string;
    allowAnonymous: boolean;
    allowMultiple: boolean;
    options: Vote.VoteOption[];
    postId: Post.PostDto['id'];
    isOwner: boolean;
    hasVoted: boolean;
    isEnd: boolean;
    totalVoteCount: number;
    totalUserCount: number;
  }
  export interface VoteOption {
    id: string;
    optionName: string;
    voteCount: number;
    voteUsers: User.User[];
  }
}
