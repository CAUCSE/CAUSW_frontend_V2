interface UsrProps {
  usrImg?: string,
  usrId: string,
}
interface CommentProps {
  commentDetail: string,
  goodCnt: number,
  badCnt: number,
}

export const CommentComponent = ({
  usrImg, 
  usrId,
  commentDetail,
  goodCnt,
  badCnt,
}: {
  usrImg?: string;
  usrId: string;
  commentDetail: string;
  goodCnt: number;
  badCnt: number;
}) => (
  <div>
    comment
  </div>
);
