const Error = () => {
  return (
    <div className="flex min-h-screen bg-[url('images/error-unsplash.jpg')] bg-no-repeat bg-cover bg-center">
      <div className="m-auto flex flex-col text-slate-200 backdrop-blur-sm backdrop-grayscale font-raleway px-10 py-10">
        <h1 className="text-5xl font-medium">Error</h1>
        <h4 className="text-xl">Looks like something went wrong!</h4>
        <h5 className="text-lg">Check if you entered a valid url</h5>
      </div>
    </div>
  );
};

export default Error;
