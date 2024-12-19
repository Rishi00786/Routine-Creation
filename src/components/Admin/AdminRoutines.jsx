/* eslint-disable no-unused-vars */
import Tilt from 'react-parallax-tilt';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoutineBuilder from "./RoutineBuilder";
import { useStateContext } from "../../../context";

const AdminRoutines = () => {

  const navigate = useNavigate()

  const { yourRoutines, setYourRoutines } = useStateContext()

  const [preBuiltRoutines, setPreBuiltRoutines] = useState([]);
  const [showRoutineBuilder, setShowRoutineBuilder] = useState(false);

  const handleCreateRoutine = () => {
    setShowRoutineBuilder(true);
  };

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        const api_url = 'http://localhost:3000/routines';

        const response = await fetch(api_url);

        if (!response.ok) {
          const errorData = await response.json(); // Read the error response if available
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json()
        // console.log("Fetched routines from DATABASE:", data);
        setYourRoutines(data);
      } catch (error) {
        console.error("Error fetching the routines from DATABASE", error)
      }
    }

    fetchRoutines();
  }, [setYourRoutines])

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
        <div className="w-full text-center p-8">
          <div className={`flex items-center justify-start gap-8 p-6 rounded-lg ${yourRoutines.length === 0 ? 'shadow-md' : ''}`}>
            <div className="text-4xl font-bold main2 text-violet-500">Your Creations</div>
            {yourRoutines.length === 0 ? (
              <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
                No routines created yet. Click the &ldquo;Create New Routine&ldquo; button to start building your custom routines.
              </div>
            ) : ''}
          </div>
          {yourRoutines.length !== 0 ? (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {yourRoutines.map((routine) => (
                <Tilt
                key={routine.id}
                className="w-full sm:w-[26rem] max-w-[28rem] border border-indigo-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-200 flex flex-col items-center bg-gradient-to-r from-purple-50 to-indigo-50 p-2"
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
        <div className="w-full text-center p-8">
          <div className={`flex items-center justify-start gap-8 p-6 rounded-lg ${yourRoutines.length === 0 ? 'shadow-md' : ''}`}>
            <div className="text-4xl font-bold main2 text-violet-500">Pre-built Routines</div>
            {preBuiltRoutines.length === 0 ? (
              <div className="text-zinc-600 main4 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200">
                No pre-built routines available yet. You can create your own routines or explore the pre-built ones later.
              </div>
            ) : ''}
          </div>
          {preBuiltRoutines.length !== 0 ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {preBuiltRoutines.map((routine, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {routine}
                </div>
              ))}
            </div>
          ) : ''}
        </div>


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
