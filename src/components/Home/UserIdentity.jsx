import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import { useStateContext } from "../../../context";

const UserIdentity = () => {

  const { isAdmin, setIsAdmin } = useStateContext();

  const [choiceMade, setChoiceMade] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const navigate = useNavigate();

  const handleCustomerClick = () => {
    navigate("/user/signup");
  };

  const handleAdminClick = () => {
    setIsAdmin(true);
    setChoiceMade(true);
  };

  const handleGoBack = () => {
    setIsAdmin(false);
    setChoiceMade(false);
    setAdminId("");
    setAdminPass("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const envAdminId = import.meta.env.VITE_ADMIN_ID;
    const envAdminPass = import.meta.env.VITE_ADMIN_PASS;


    // console.log(import.meta.env)
    // console.log(envAdminId, envAdminPass, adminId, adminPass)

    if (adminId === envAdminId && adminPass === envAdminPass) {
      navigate("/admin/Routines");
      setIsAdmin(true);
      localStorage.setItem('admin', true);
      localStorage.removeItem('access_token')
    } else {
      alert("Invalid Admin ID or Password");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-200 flex items-center justify-center">
      {!choiceMade && !isAdmin && (
        <div className="w-4/5 sm:w-2/3 lg:w-1/3 h-2/5 sm:h-2/4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-2xl sm:text-4xl font-semibold text-gray-800 font-mono">
            Who are you?
          </div>
          <div className="flex items-center justify-center gap-8">
            <button
              className="sm:px-6 sm:py-3 px-3 py-1 bg-blue-500 text-white font-medium text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
              onClick={handleCustomerClick}
            >
              Customer
            </button>
            <button
              className="sm:px-6 sm:py-3 px-3 py-1 bg-gray-500 text-white font-medium text-lg rounded-md shadow-md hover:bg-gray-600 transition duration-200 ease-in-out"
              onClick={handleAdminClick}
            >
              Admin
            </button>
          </div>
        </div>
      )}

      {isAdmin && (
        <section className="bg-gray-50 dark:bg-gray-900 w-[100vw] h-screen">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome Admin
            </div>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                  <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your admin ID</label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={adminId}
                      onChange={(e) => setAdminId(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your admin ID"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl w-full px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Login
                  </button>
                  <p className="font-light space-y-2 text-gray-500 dark:text-gray-400 text-md text-center w-full">
                    <div>Not an Admin?</div>
                    <div onClick={handleGoBack} className="font-medium cursor-pointer flex items-center justify-center gap-2 text-xl text-primary-600  dark:text-primary-500">
                      <div><IoArrowBackCircle /></div>
                      <div>Go Back</div>
                    </div>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserIdentity;
