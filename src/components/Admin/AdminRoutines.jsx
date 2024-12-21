/* eslint-disable no-unused-vars */
import Tilt from 'react-parallax-tilt';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoutineBuilder from "./RoutineBuilder";
import { useStateContext } from "../../../context";
import { IoEnterSharp } from 'react-icons/io5';

const AdminRoutines = () => {

  const navigate = useNavigate()

  const { yourRoutines, preBuiltRoutines } = useStateContext()
  const [engagementData, setEngagementData] = useState(null);

  // const [preBuiltRoutines, setPreBuiltRoutines] = useState([]);
  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

  const handleCreateRoutine = () => {
    setShowRoutineBuilder(true);
  };

  useEffect(() => {
    const fetchEngagementData = async () => {
      try {
        const api = import.meta.env.VITE_API_URL
        // const api_url = 'http://localhost:3000/routines/engagement';
        const api_url = `${api}/routines/engagement`;
        const response = await fetch(api_url, {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        const data = await response.json(); // Read response as JSON
        // const data = await response.text(); // Read response as text
        console.log("Raw response text:", data);
        // const data = text? JSON.parse(text) : []; // Parse JSON if text exists
        setEngagementData(data);
      } catch (error) {
        console.error('Error fetching engagement data:', error);
      }
    };

    fetchEngagementData();
  }, []);

  return (
    <>
      <div className={`w-full p-4 min-h-screen ${showRoutineBuilder ? 'blur-lg -z-10' : ''} bg-slate-200 flex flex-col items-center justify-start gap-8`}>
        <div
          className="w-[98vw] h-[20vh] bg-cover bg-center rounded-xl shadow-lg flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://static.canva.com/web/images/e733916c4616f5baa19098cc2844369b.jpg')",
          }}
        >
          <div className="text-white m-1 sm:m-0 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl main1 font-semibold">Create and Manage Routines for Your Customers</div>
        </div>

        {/* Create New Routine Button */}
        <button
          type="button"
          onClick={handleCreateRoutine}
          className="relative inline-flex text-2xl main3 items-center justify-center p-0.5 mb-2 me-2 overflow-hidden font-semibold  text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-slate-200 text-indigo-600  rounded-md hover:text-white group-hover:bg-opacity-0">
            Create New Routine
          </span>
        </button>

        {/* Your Routines Section */}
        <div className="w-full text-center md:p-8">
          <div className={`flex items-center justify-start gap-8  p-6 rounded-lg  ${yourRoutines.length === 0 ? 'shadow-md' : ''}`}>
            <div className="text-4xl w-full md:w-auto font-extrabold main2 text-violet-500 main2">Your Creations</div>
            {yourRoutines.length === 0 ? (
              <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
                No routines created yet. Click the &ldquo;Create New Routine&ldquo; button to start building your custom routines.
              </div>
            ) : ''}
          </div>
          {yourRoutines.length !== 0 ? (
            <div className="flex items-start justify-center md:justify-start gap-8 md:gap-12 lg:gap-20 flex-wrap">
              {yourRoutines.map((routine) => (
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
                      <Link to={`/admin/routines/${routine.id}`}><button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">
                        Get Started
                      </button></Link>
                    </div>
                  </div>
                </Tilt>
              ))}

            </div>
          ) : ''}
        </div>

        {/* Pre-built Routines Section */}
        <div className="w-full text-center md:p-8">
          <div className={`flex items-center justify-start gap-8 p-6 rounded-lg ${preBuiltRoutines.length === 0 ? 'shadow-md' : ''}`}>
            <div className="text-4xl font-extrabold md:w-auto w-full main2 text-violet-500">Pre-built Routines</div>
            {preBuiltRoutines.length === 0 ? (
              <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
                No routines created yet. Click the &ldquo;Create New Routine&ldquo; button to start building your custom routines.
              </div>
            ) : ''}
          </div>
          {preBuiltRoutines.length !== 0 ? (
            <div className="flex items-start justify-center md:justify-start gap-8 md:gap-12 lg:gap-20 flex-wrap">
              {preBuiltRoutines.map((routine) => (
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
                      <Link to={`/admin/routines/${routine.id}`}><button type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2">
                        Get Started
                      </button></Link>
                    </div>
                  </div>
                </Tilt>
              ))}

            </div>
          ) : ''}
        </div>


      </div>

      <div className="w-full text-center p-2 lg:p-8 bg-slate-200 rounded-xl shadow-xl">
        <div className="text-4xl font-extrabold text-violet-600 mb-6 animate__animated animate__fadeIn">
          Engagement Insights
        </div>

        {!engagementData ? (
          <div className="text-zinc-600 text-lg p-4 animate-pulse">
            Loading engagement data...
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            {/* Total Completions */}
            <div className="flex flex-col items-start justify-start w-full p-8 space-y-6">
              {/* Popular Routines */}
              <div className="p-8 bg-indigo-500 rounded-xl shadow-lg w-full">
                <h3 className="text-slate-100 font-extrabold main4 text-2xl mb-6">Popular Routines</h3>
                <ul className="space-y-4">
                  {engagementData.popularRoutines.map((routine, index) => (
                    <li
                      key={index}
                      className="p-4 md:p-6 w-full bg-pink-100 rounded-xl shadow-lg hover:bg-pink-200 hover:scale-105 transition-all duration-300 transform"
                    >
                      <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <span className='font-semibold text-lg md:text-xl text-zinc-800 main2'>{routine.routineName}</span>
                        <span className="text-indigo-500 font-semibold text-xl md:text-2xl main1">
                          {routine.count} participants
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Total Completions */}
              <div className="p-8 bg-indigo-500 rounded-xl shadow-lg w-full">
                <h3 className="text-slate-100 font-extrabold main4 text-2xl mb-6">Total Completions</h3>
                <p className="font-semibold p-4 text-3xl text-zinc-800 main2 bg-pink-100 rounded-xl shadow-lg hover:bg-pink-200 hover:scale-105 transition-all duration-300 transform">{engagementData.totalCompletions}</p>
              </div>

              {/* Progress */}
              <div className="xl:p-8 p-3  bg-indigo-500 rounded-xl shadow-lg w-full">
                <h3 className="text-slate-100 font-extrabold main4 text-2xl mb-6">Progress</h3>
                <ul className="space-y-4">
                  {engagementData.progress.map((entry, index) => (
                    <li key={index} className="p-2 md:p-6 w-full bg-pink-100 rounded-xl shadow-lg hover:bg-pink-200 hover:scale-105 transition-all duration-300 transform">
                      <div className="flex sm:flex-row flex-col justify-between items-center gap-2 sm:gap-8 md:gap-4">
                        <div className='lg:w-[80vw] md:w-[65vw] text-center sm:text-start'>
                          <span className='font-semibold text-base sm:text-lg md:text-xl w-full text-zinc-800 main2 '>User with Username </span><span className='font-bold text-base sm:text-lg md:text-xl text-purple-700 main4'>{entry.username} </span>
                          <span className='font-semibold text-base sm:text-lg md:text-xl w-full text-zinc-800 main2'>is enrolled in {entry.routineName}</span>
                        </div>
                        <div className='w-auto lg:w-[15vw] text-end'>
                          <span className='text-indigo-500 font-semibold text-xl md:text-xl main1'>Progress: {entry.progress}%</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>








      {showRoutineBuilder && (
        // <div className=" flex items-center justify-center">
        <RoutineBuilder />
        // </div>
      )}


    </>


  );
};

export default AdminRoutines;
