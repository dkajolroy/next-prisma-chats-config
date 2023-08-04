const Page = () => {
  return (
    <div className="min-h-screen bg-[#111b21]">
      <div className="container">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col my-5">
            <span className="w-20 h-20 my-2 bg-slate-500 rounded-full mx-auto"></span>
            <h2 className="text-white text-lg">Your name</h2>
            <h2 className="text-white ">Username</h2>
            <h2 className="text-white ">Email</h2>
            <h2 className="text-white ">Password</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
