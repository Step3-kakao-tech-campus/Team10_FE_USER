const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src="/Loader/bdbdLoader.gif" alt="로딩 중" className="w-20 h-20" />
      <div className="font-bold text-primary m-4">로딩 중</div>
    </div>
  );
};

export default Loader;
