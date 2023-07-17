import userImg from "../images/user.avif";

const Profile = () => {
  return (
    <div className="flex flex-grow font-exo m-auto">
      <div className="grid grid-cols-3">
        <div className="grid justify-center items-center col-span-1  ">
          <img src={userImg} alt="userImage" className="w-48 pt-20" />
        </div>
        <div className="col-span-2 pt-10 pl-5">
          <div className="grid grid-cols-2 pb-10">
            <h1 className="text-4xl font-Raleway text-slate-900 dark:text-slate-200">
              Profile Page
            </h1>
            <div className="grid grid-cols-3">
              <button className="bg-transparent dark:bg-slate-500 hover:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-slate-200 font-semibold hover:text-white py-2 px-4 border border-slate-500 hover:border-transparent rounded col-span-1 ">
                Edit Profile
              </button>
            </div>
          </div>
          <div className="w-full max-w-lg">
            <form action="">
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  name="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2"
                  htmlFor="billerId"
                >
                  Biller Id
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="billerId"
                  type="text"
                  placeholder="Biller Id"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="password"
                  type="password"
                  placeholder="****************"
                />
                <label
                  className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2"
                  htmlFor="role"
                >
                  Role
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="role"
                  type="text"
                  placeholder="Role"
                />
              </div>
              <button className="bg-slate-700 dark:bg-slate-500 hover:bg-slate-900 dark:hover:bg-slate-700 text-white font-bold py-2 px-7 border border-slate-500 rounded ">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
