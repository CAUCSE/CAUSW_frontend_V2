export const BoardEmptyPostPreview = ({
  contents,
}: Pick<Board.BoardResponseDto, 'contents'>) => {
  const emptyContents = new Array(3 - contents.length).fill(0);
  return emptyContents.map((_, idx) => (
    <div className="py-2" key={idx}>
      　
    </div>
  ));
};
