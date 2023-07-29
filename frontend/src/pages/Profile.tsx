import userImg from "../images/user.avif";

import { RootState } from "../redux";
import { useAppSelector } from "../utils/hooks/useAppSelector";

const Profile = () => {
  const user = useAppSelector((state: RootState) => state.user);

  return (
    <div className="flex flex-grow font-raleway">
      <div className="grid grid-cols-3 m-auto">
        <div className="grid justify-center items-center col-span-1  ">
          <img src={userImg} alt="userImage" className="w-48 pt-20" />
        </div>
        <div className="col-span-2 pt-10 pl-5">
          <div className="grid grid-cols-2 pb-10">
            <h1 className="text-4xl font-Raleway text-slate-900 dark:text-slate-200">
              Profile
            </h1>
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
                  placeholder={user.name}
                  readOnly
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 dark:text-gray-200 text-xl font-bold mb-2"
                  htmlFor="email"
                >
                  Email ID
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  name="text"
                  type="text"
                  placeholder={user.email}
                  readOnly
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
                  placeholder={user.role}
                  readOnly
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
