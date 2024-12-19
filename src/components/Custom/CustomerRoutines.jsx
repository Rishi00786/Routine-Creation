import { Link } from "react-router-dom"
import { useStateContext } from "../../../context"
import Tilt from 'react-parallax-tilt';

const CustomerRoutines = () => {

  const { allRoutines } = useStateContext()

  return (
    <div className="w-[100vw] h-auto p-8 bg-slate-200">
      {/* Your Routines Section */}
      <div className="w-full text-center p-8">
          <div className={`flex items-center justify-start gap-8 p-6 rounded-lg ${allRoutines.length === 0 ? 'shadow-md' : ''}`}>
            <div className="text-4xl font-bold main2 text-violet-500">Your Creations</div>
            {allRoutines.length === 0 ? (
              <div className="text-zinc-600 text-lg p-4 rounded-full shadow-md bg-gray-200 border border-gray-200 main4">
                No routines created yet. Click the &ldquo;Create New Routine&ldquo; button to start building your custom routines.
              </div>
            ) : ''}
          </div>
          {allRoutines.length !== 0 ? (
            <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allRoutines.map((routine) => (
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
    </div>
  )
}

export default CustomerRoutines