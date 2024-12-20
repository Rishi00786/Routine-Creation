import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context"
import Tilt from 'react-parallax-tilt';
import { useEffect, useState } from "react";

const CustomerRoutines = () => {

  const navigate = useNavigate()
  const [myRoutines, setMyRoutines] = useState([]);


  const handleGetRoutineStarted = async (routineId) => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/user/login");
      return;
    }

    try {
      const api_url = import.meta.env.VITE_API_URL
      // const api_url = 'http://localhost:3000'
      const response = await fetch(`${api_url}/routines/assign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ routineId }),
      });

      if (!response.ok) {
        console.error("Error starting the routine:", response);
        // alert("Failed to start the routine. Please try again.");
      }

      navigate(`/admin/routines/${routineId}`)
    } catch (error) {
      console.error("Error starting the routine:", error);
      // alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    const fetchMyRoutines = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        navigate("/user/login");
        return;
      }

      // console.log("Access token", accessToken);
  
      try {
        const api_url = "http://localhost:3000";
        const response = await fetch(`${api_url}/routines/my`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (!response.ok) {
          console.error("Error fetching my routines:", response);
          return;
        }

        console.log(response)
  
        const text = await response.text(); // Read response as text
        const data = text ? JSON.parse(text) : []; // Parse JSON if text exists
        console.log("data", data);
        setMyRoutines(data);
      } catch (error) {
        console.error("Error fetching my routines:", error);
      }
    };
  
    fetchMyRoutines();
  }, [navigate]);
  


  const { allRoutines } = useStateContext()

  return (
    <div className="w-[100vw] h-auto p-4 bg-slate-200">
      <div
        className="w-full h-[40vh] bg-cover bg-center rounded-xl shadow-lg flex items-end justify-start"
        style={{
          backgroundImage:
            "url('https://static.canva.com/web/images/4a825d24e6fb578c2ff6061aade52217.jpg')",
        }}
      >
        <div className="text-white mb-4 ml-4 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl main1 font-extrabold">Effective , Easy to follow Routines</div>
      </div>

      {/* My Routines Section */}
      <div className="w-full text-center p-8">
        <div className="text-4xl font-extrabold main2 text-violet-500 mb-6">My Routines</div>
        {myRoutines.length === 0 ? (
          <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
            You haven&apos;t started any routines yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myRoutines.map((routine) => (
              <Tilt key={routine.id} className="w-full sm:w-[26rem] max-w-[28rem] border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2">
                <img
                  src={routine.imagePreview}
                  alt={routine.name}
                  className="shadow rounded-lg w-full h-60 object-cover border border-gray-300"
                />
                <div className="mt-2 flex flex-col items-start justify-center w-full p-1">
                  <h4 className="font-bold text-2xl text-indigo-700 main4">{routine.name}</h4>
                  <p className="mt-3 text-zinc-600 text-lg leading-relaxed main1 text-start">
                    {routine.description}
                  </p>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>

      {/* All Routines Section */}
      <div className="w-full text-center p-8">
        <div className="text-4xl font-extrabold main2 text-violet-500 mb-6">Get Started Easily</div>
        {allRoutines.length === 0 ? (
          <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
            No routines created yet. Click the &quot;Create New Routine&quot; button to start building your custom routines.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRoutines.map((routine) => (
              <Tilt key={routine.id} className="w-full sm:w-[26rem] max-w-[28rem] border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2">
                <img
                  src={routine.imagePreview}
                  alt={routine.name}
                  className="shadow rounded-lg w-full h-60 object-cover border border-gray-300"
                />
                <div className="mt-2 flex flex-col items-start justify-center w-full p-1">
                  <h4 className="font-bold text-2xl text-indigo-700 main4">{routine.name}</h4>
                  <p className="mt-3 text-zinc-600 text-lg leading-relaxed main1 text-start">
                    {routine.description}
                  </p>
                  <div className="mt-6 w-full text-center">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2"
                      onClick={() => handleGetRoutineStarted(routine.id)}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerRoutines;