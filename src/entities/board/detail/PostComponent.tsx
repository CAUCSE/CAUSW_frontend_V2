interface UsrProps {
  usrImg?: string,
  usrId: string,
}

interface PostProps {
  postTitle: string,
  postDetail: string,
  postImg?: string,
  goodCnt: number,
  starCnt: number,
  commentCnt: number,
}

export const PostComponent = ({
  usrImg, 
  usrId,
  postTitle,
  postDetail,
  postImg,
  goodCnt,
  starCnt,
  commentCnt,
}: {
  usrImg?: string;
  usrId: string;
  postTitle: string;
  postDetail: string;
  postImg?: string;
  goodCnt: number;
  starCnt: number;
  commentCnt: number;
}) => (
  <div>
    post
  </div>
);
