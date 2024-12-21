import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context"
import Tilt from 'react-parallax-tilt';
import { useEffect } from "react";
import { FaChampagneGlasses } from "react-icons/fa6";

const CustomerRoutines = () => {

  const navigate = useNavigate()
  const { myRoutines, setMyRoutines, allRoutines } = useStateContext();

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
        const api_url = import.meta.env.VITE_API_URL
        // const api_url = "http://localhost:3000";
        const response = await fetch(`${api_url}/routines/my`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.error("Error fetching my routines:", response);
          return;
        }

        // console.log(response)
        const data = await response.json(); // Read response as JSON

        // const text = await response.text(); // Read response as text
        // const data = text ? JSON.parse(text) : []; // Parse JSON if text exists
        // console.log("data", data); 
        setMyRoutines(data);
      } catch (error) {
        console.error("Error fetching my routines:", error);
      }
    };

    fetchMyRoutines();
  }, [navigate, setMyRoutines]);


  return (
    <div className="w-[100vw] h-auto p-4 bg-slate-200 flex flex-col items-center justify-center gap-8">
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
      <div className="w-full text-center md:p-8">
        <div className="text-4xl font-extrabold main2 text-emerald-600 mb-6">My Routines</div>
        {myRoutines.length === 0 ? (
          <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
            You haven&apos;t started any routines yet.
          </div>
        ) : (
          <div className="flex items-start justify-center md:justify-start gap-8 md:gap-12 lg:gap-20 flex-wrap">
            {myRoutines.map((routine) => (
              <Tilt
                key={routine.id}
                className="w-full sm:w-[30rem] md:w-[40vw] lg:max-w-[28rem] border border-green-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.05}
                transitionSpeed={450}
              >
                <img
                  src={routine.imagePreview}
                  alt={routine.name}
                  className="shadow rounded-lg w-full h-60 object-cover border border-gray-300"
                />
                <div className="mt-2 flex flex-col items-start justify-center w-full p-1">
                  <h4 className="font-bold text-2xl text-indigo-700 main4">{routine.name}</h4>
                  <p className="mt-3 text-zinc-600 text-lg leading-relaxed main1 text-start">{routine.description}</p>
                  <div className="mt-4 flex flex-col space-y-3 items-start justify-center">
                    <p className="text-base text-slate-700 main1 font-semibold">
                      <span className="font-semibold text-indigo-600 main4">Duration:</span> {routine.duration} Weeks
                    </p>
                    <p className="text-base text-slate-700 main1 font-semibold">
                      <span className="font-semibold text-indigo-600 main4">Milestones:</span> {routine.milestones}
                    </p>
                  </div>
                  <div className="mt-6 w-full text-center flex items-center justify-center">
                    <div onClick={() => { navigate(`/admin/routines/${routine.id}`) }}>
                      <button
                        type="button"
                        className={`text-white ${routine.completed ? " flex items-center justify-center gap-2 from-purple-300 via-purple-500 to-purple-700 text-xl focus:ring-indigo-600 dark:focus:ring-indigo-800 dark:shadow-indigo-800/80" : "from-green-300 via-green-500 to-green-700 focus:ring-emerald-600 dark:focus:ring-emerald-800 dark:shadow-emerald-800/80"}  bg-gradient-to-r  hover:bg-gradient-to-br focus:ring-4 focus:outline-none shadow-lg shadow-emerald-500/50 dark:shadow-lg font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2`}>
                        <div>{routine.completed ? "Completed" : "Continue"}</div>
                        {routine.completed && <div><FaChampagneGlasses /></div>}
                      </button>
                    </div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>

      {/* All Routines Section */}
      <div className="w-full text-center md:p-8">
        <div className="text-4xl font-extrabold main2 text-violet-500 mb-6">Get Started Easily</div>
        {allRoutines.length === 0 ? (
          <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
            No more routines created yet. We will be adding more routines soon...
          </div>
        ) : (
          <div className="flex items-start justify-center md:justify-start gap-8 md:gap-12 lg:gap-20 flex-wrap">
            {allRoutines.map((routine) => (
              <Tilt
                key={routine.id}
                className="w-full sm:w-[30rem] md:w-[40vw] lg:max-w-[28rem] border border-green-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.05}
                transitionSpeed={450}
              >
                <img
                  src={routine.imagePreview}
                  alt={routine.name}
                  className="shadow rounded-lg w-full h-60 object-cover border border-gray-300"
                />
                <div className="mt-2 flex flex-col items-start justify-center w-full p-1">
                  <h4 className="font-bold text-2xl text-indigo-700 main4">{routine.name}</h4>
                  <p className="mt-3 text-zinc-600 text-lg leading-relaxed main1 text-start">{routine.description}</p>
                  <div className="mt-4 flex flex-col space-y-3 items-start justify-center">
                    <p className="text-base text-slate-700 main1 font-semibold">
                      <span className="font-semibold text-indigo-600 main4">Duration:</span> {routine.duration} Weeks
                    </p>
                    <p className="text-base text-slate-700 main1 font-semibold">
                      <span className="font-semibold text-indigo-600 main4">Milestones:</span> {routine.milestones}
                    </p>
                  </div>
                  <div className="mt-6 w-full text-center">
                    <div onClick={() => { handleGetRoutineStarted(routine.id) }}><button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">
                      Get Started
                    </button></div>
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        )}
      </div>

      {/* Your Engagement This Week Section */}
      <div className="w-full text-center md:p-8">
        <div className="text-4xl font-extrabold main2 text-blue-600 mb-6">Your Engagement This Week</div>
        {myRoutines.length === 0 ? (
          <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
            No engagement data available yet.
          </div>
        ) : (
          <div className="flex items-start justify-center md:justify-start gap-8 md:gap-12 lg:gap-20 flex-wrap">
            {myRoutines.map((routine) => {
              const weeksCompleted = Math.floor((routine.progress / 100) * routine.duration);

              return (
                <Tilt key={routine.id}
                className="w-full sm:w-[30rem] md:w-[40vw] lg:max-w-[28rem] border border-green-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2"
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.05}
                transitionSpeed={450}
                >
                <div
                  
                  className="w-full sm:w-[26rem] max-w-[28rem] border border-blue-300 rounded-2xl shadow-md bg-gradient-to-r from-blue-50 to-cyan-50 p-4"
                >
                  <div className="text-xl font-semibold text-blue-700">{routine.name}</div>
                  <div className="mt-2 text-lg text-gray-600">Progress: {routine.progress}%</div>
                  <div className="mt-2 text-lg text-gray-600">Weeks Completed: {weeksCompleted}/{routine.duration}</div>
                  <div className="mt-4 w-full text-center">
                    <button
                      type="button"
                      className="text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-400 hover:to-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => navigate(`/admin/routines/${routine.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
                </Tilt>
              );
            })}
          </div>
        )}
      </div>

    </div >
  );
};

export default CustomerRoutines;