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
    navigate("/routines");
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


    console.log(import.meta.env)
    console.log(envAdminId, envAdminPass, adminId, adminPass)

    if (adminId === envAdminId && adminPass === envAdminPass) {
      navigate("/admin/Routines");
      // console.log(isAdmin);
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
        <div className="w-4/5 sm:w-2/3 lg:w-1/3 h-3/5 sm:h-2/4 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center space-y-8 p-8">
          <div className="text-2xl sm:text-4xl font-semibold text-gray-800 font-mono">
            Admin Login
          </div>
          <form className="flex flex-col space-y-4 w-2/3 items-center justify-center" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Admin ID"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              className="sm:w-full w-56 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={adminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              className="sm:w-full w-56 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-3 sm:w-1/2 w-36 bg-blue-500 text-white font-medium text-lg rounded-md shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
            >
              Login
            </button>
          </form>
          <button
            className="flex items-center text-gray-500 hover:text-gray-700 transition duration-200 ease-in-out"
            onClick={handleGoBack}
          >
            <IoArrowBackCircle className="text-4xl mr-2" />
            <span className="text-lg font-medium">Go Back</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserIdentity;
