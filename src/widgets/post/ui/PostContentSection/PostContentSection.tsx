import { VoteSection } from '@/widgets/vote';

import { PostDetailContent, PostDetailTitle } from '@/entities/post';

import { ImageList } from '@/shared';

interface PostContentSectionProps {
  postTitle: Post.PostDto['title'];
  postContent: Post.PostDto['content'];
  isPostVote: Post.PostDto['isPostVote'];
  fileUrlList: Post.PostDto['fileUrlList'];
  voteData: Vote.VoteResponseDto;
}

export const PostContentSection = ({ postTitle, postContent, fileUrlList, voteData }: PostContentSectionProps) => {
  return (
    <section className="flex w-full flex-col items-start px-3">
      <div className="w-full overflow-x-auto">
        <PostDetailTitle postTitle={postTitle} />
        <PostDetailContent postContent={postContent} />
        {voteData && <div className="flex w-full lg:pr-12">{<VoteSection voteData={voteData} />}</div>}
      </div>

      <div className="relative">
        <ImageList images={fileUrlList} imageSize={90} />
      </div>
    </section>
  );
};
