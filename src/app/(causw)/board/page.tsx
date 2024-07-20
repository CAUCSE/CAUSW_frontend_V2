/**
 * @description 나중에 게시물 + 사용자 정보로 바뀔 예정
 * @description 중복되는 코드 개선 필요
 */

const BoardPage = async () => {
  return (
    <div className="absolute flex-grow top-0 left-40 right-72 h-full border border-green200 bg-boardBackground rounded-3xl">
      <div className="relative h-1/3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold pl-20 pt-10">최근 게시판</h2>
          <h5 className="pr-20 pt-12">더보기 →</h5>
        </div>

        <div className="border border-black rounded-lg ml-20 mr-20 mt-3 p-5 bg-white shadow">
          {/* 게시판 제목 + 내용 */}
          <div className="flex h-full">
            <div className="w-1/2 border-r border-gray-400 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg">게시글 1</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 1 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 2</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 2 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3">
                  <h5 className="text-lg">게시글 3</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 3 내용입니다.</p>
                  </span>
                </li>
              </ul>
            </div>

            <div className="w-1/2 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg">게시글 4</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 4 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 2</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 5 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 3</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 5 내용입니다.</p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-1/3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold pl-20 pt-10">내가 작성한 게시글</h2>
          <h5 className="pr-20 pt-12">더보기 →</h5>
        </div>
        <div className="border border-black rounded-lg ml-20 mr-20 mt-3 p-5 bg-white shadow">
          {/* 게시판 제목 + 내용 */}
          <div className="flex h-full">
            <div className="w-1/2 border-r border-gray-400 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg">게시글 1</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 1 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 2</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 2 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3">
                  <h5 className="text-lg">게시글 3</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 3 내용입니다.</p>
                  </span>
                </li>
              </ul>
            </div>
            <div className="w-1/2 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg">게시글 4</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 4 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 5</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 5 내용입니다.</p>
                  </span>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="text-lg">게시글 6</h5>
                  <span className="ml-5 mr-5">
                    <p>게시글 6 내용입니다.</p>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative h-1/3">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold pl-20 pt-10">찜한 게시글</h2>
          <h5 className="pr-20 pt-12">더보기 →</h5>
        </div>
        <div className="border border-black rounded-lg ml-20 mr-20 mt-3 p-5 bg-white shadow">
          {/* 게시판 제목 + 내용 */}
          <div className="flex h-full">
            <div className="w-1/2 border-r border-gray-400 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="flex text-lg underline">게시글 1</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 2</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 3</h5>
                </li>
              </ul>
            </div>
            <div className="w-1/2 border-r border-gray-400 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="flex text-lg">게시글 4</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 5</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 6</h5>
                </li>
              </ul>
            </div>
            <div className="w-1/2 p-5 h-full flex flex-col justify-between">
              <ul className="h-full w-full flex flex-col justify-between">
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="flex text-lg">게시글 7</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 8</h5>
                </li>
                <li className="flex items-center justify-center w-full h-1/3 mb-4">
                  <h5 className="flex text-lg mr-3">⭐</h5>
                  <h5 className="text-lg">게시글 9</h5>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
