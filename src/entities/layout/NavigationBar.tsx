export const NavigationBar = () => {
  return (
    <div className="w-40 h-screen fixed top-0 left-0 bg-lightBlue flex flex-col justify-center items-center space-y-16 rounded-r-3xl">
      <span className="icon-[iconamoon--home] text-white text-5xl"></span>
      <span className="icon-[mingcute--menu-line] text-white text-5xl"></span>
      <span className="icon-[material-symbols--check-box-outline] text-white text-5xl"></span>
      <span className="icon-[ph--bell] text-white text-5xl"></span>
      <span className="icon-[ep--setting] text-white text-5xl"></span>
    </div>
  );
};
