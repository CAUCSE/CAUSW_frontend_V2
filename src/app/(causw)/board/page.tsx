/**
 * @description 나중에 게시물 + 사용자 정보로 바뀔 예정
 * @description 중복되는 코드 개선 필요
 */

const BoardPage = () => {
  return (
    <div className="absolute w-full  md:w-auto md:left-40 md:right-72 top-24  md:top-0 bottom-28 md:bottom-0 p-6 ">
      <div className="h-full lg:h-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 lg:gap-y-10 gap-y-5 border border-red-500 rounded-2xl p-10 bg-boardBackground overflow-y-auto">
          <div>
            <h1 className="text-xl font-semibold truncate">
              ❗ <span className="underline">서비스 공지</span>
            </h1>
            <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
              <ul className="space-y-4 divide-y-2">
                <li className="truncate">서버 점검 18:00 ~ 21:00</li>
                <li className="truncate">서버 점검 18:00 ~ 21:00</li>
                <li className="truncate">서버 점검 18:00 ~ 21:00</li>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold truncate">
              🏆 <span className="underline">학생회 공지 게시판</span>
            </h1>
            <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
              <ul className="space-y-4 divide-y-2">
                <li className="truncate">기말고사 간식 행사 안내</li>
                <li className="truncate">신복편전 안내</li>
                <li className="truncate">체육 대회 안내</li>
              </ul>
            </div>
          </div>

          <div>
            <h1 className="text-xl font-bold truncate">
              📖
              <span className="underline">소프트웨어학부 공지</span>
            </h1>
            <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
              <ul className="space-y-4 divide-y-2">
                <li className="truncate">탑싯 서류 제출 안내</li>
                <li className="truncate">기말고사 시험표</li>
                <li className="truncate">성적 조회 안내</li>
              </ul>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold truncate">
              🌏
              <span className="underline">동문회 공지 게시판</span>
            </h1>
            <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
              <ul className="space-y-4 divide-y-2 ">
                <li className="truncate">????????????????????</li>
                <li className="truncate">
                  ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㄹㄹㄹㄹㄹㄹㄹㅇㅇㅇㅇㅇㅇㅇㅇㅇasdasd
                </li>
                <li className="truncate">
                  ㅁㄴㅇㄴㅁㅇㅁㅇㅁㅈㅇㅁㅇㅁㄴㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 lg:gap-y-10 gap-y-5 p-10 bg-white overflow-y-auto">
            <div>
              <h1 className="text-xl font-bold truncate">
                <span className="underline">스포츠 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">3대 500 달성법</li>
                  <li className="truncate">벤치 프레스 그립의 종류</li>
                  <li className="truncate">메시 vs 호날두 누가 GOAT인가</li>
                </ul>
              </div>
            </div>
            <div className="overflow-y-auto">
              <h1 className="text-xl font-bold truncate">
                <span className="underline">과제 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">프로그래밍 과제 어려워요</li>
                  <li className="truncate">수치해석 중간고사 ㅠㅠ</li>
                  <li className="truncate">운영체제 데드락 과제 ㅠㅠ</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold truncate">
                <span className="underline">스포츠 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">3대 500 달성법</li>
                  <li className="truncate">벤치 프레스 그립의 종류</li>
                  <li className="truncate">메시 vs 호날두 누가 GOAT인가</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold truncate">
                <span className="underline">스포츠 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">3대 500 달성법</li>
                  <li className="truncate">벤치 프레스 그립의 종류</li>
                  <li className="truncate">메시 vs 호날두 누가 GOAT인가</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold truncate">
                <span className="underline">스포츠 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">3대 500 달성법</li>
                  <li className="truncate">벤치 프레스 그립의 종류</li>
                  <li className="truncate">메시 vs 호날두 누가 GOAT인가</li>
                </ul>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold truncate">
                <span className="underline">스포츠 게시판</span>
              </h1>
              <div className="border border-black rounded-2xl text-center mt-4 bg-white shadow-lg p-4">
                <ul className="space-y-2 divide-y-2 ">
                  <li className="truncate">3대 500 달성법</li>
                  <li className="truncate">벤치 프레스 그립의 종류</li>
                  <li className="truncate">메시 vs 호날두 누가 GOAT인가</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
