import RoutineSidebar from "./RoutineSidebar"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuBadgeCent } from "react-icons/lu";
import { useStateContext } from "../../../context";
import { FaCheckCircle } from 'react-icons/fa';
import { IoMenuSharp } from "react-icons/io5";
import { FaSkullCrossbones } from "react-icons/fa6";
import RoutineBuilder from "./RoutineBuilder";
import Loader from "../Home/Loader";


const RoutineDetails = () => {
    const { id } = useParams();
    const [routine, setRoutine] = useState({});
    const [completedTasks, setCompletedTasks] = useState([]);
    const [thisRoutine, setThisRoutine] = useState({});
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(false);
    const {
        sidebar, setSidebar, isAdmin, showRoutineBuilder, setShowRoutineBuilder,
        setId
    } = useStateContext(false);

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }


    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const api = import.meta.env.VITE_API_URL
                // const api_url = `http://localhost:3000/routines/${id}`;
                const api_url = `${api}/routines/${id}`;
                const response = await fetch(api_url, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const responseData = await response.json();
                setRoutine(responseData);
                // console.log(routine)
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch routine details.", error);
                setLoading(false)
            }
        };

        setLoading(true)
        fetchRoutine();
    }, [id]);

    useEffect(() => {

        const fetchCompletedTasks = async () => {
            const accessToken = localStorage.getItem("access_token");
            if (!accessToken) return;

            try {
                const api = import.meta.env.VITE_API_URL
                // const api_url = `http://localhost:3000/routines/${id}/tasks`;
                const api_url = `${api}/routines/${id}/tasks`
                const response = await fetch(api_url, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch completed tasks.");
                }

                const data = await response.json();
                setProgress(data.progress);
                setCompletedTasks(data.completedTasks || []);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching completed tasks:", error);
                setLoading(false); // Set loading to false after data is fetched
            }
        };

        setLoading(true);
        fetchCompletedTasks();
    }, [id])

    // useEffect(() => {
    //     console.log(isAdmin)
    //   }, [isAdmin])


    if (!routine || Object.keys(routine).length === 0) {
        return <div>Loading...</div>; // Wait for the data to load
    }

    const handleCompletedWeekTask = async (index) => {

        const updatedTasks = [...completedTasks];
        updatedTasks[index] = !completedTasks[index];

        setCompletedTasks(updatedTasks);


        const accessToken = localStorage.getItem("access_token");
        if (!accessToken) return;

        setLoading(true);
        try {
            const api = import.meta.env.VITE_API_URL
            // const api_url = `http://localhost:3000/routines/${id}/tasks`;
            const api_url = `${api}/routines/${id}/tasks`
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ completedTasks: updatedTasks }),
            });

            if (!response.ok) {
                throw new Error("Failed to update tasks in backend.");
            }
            setLoading(false)
        } catch (error) {
            console.error("Error updating tasks in backend:", error);
            setLoading(false)
        }
    };

    const handleEditRoutine = () => {
        // console.log("editing")
        const { name, duration, description, milestones, steps, benefits, imagePreview } = routine;

        if (!name || !duration || !description || !milestones || !steps || !benefits || !imagePreview) {
            // console.log("something is missing while editing")
            alert("Please try again editing")
            return;
        }
        setThisRoutine({
            name: name,
            duration: duration,
            description: description,
            milestones: milestones,
            steps: steps,
            benefits: benefits,
            imagePreview: imagePreview,
        })
        setId(id);
        setShowRoutineBuilder(true)
    }



    return (
        <>
            {loading ? (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                </div>
            ) : (
                <div className={`bg-slate-200 md:m-0 w-[100vw] h-auto flex items-start justify-start ${showRoutineBuilder && "opacity-50 blur-lg"} ${sidebar ? 'p-0' : 'p-1'} lg:p-2 xl:p-4`}>
                    <div className="md:flex hidden fixed w-[32.5vw] h-[90vh] lg:h-[95vh] p-2 xl:p-4 items-start justify-center">
                        <RoutineSidebar />
                    </div>

                    <div className={`md:ml-[30vw] md:w-[67.5vw] lg:w-[70vw] p-8  rounded-xl ${sidebar && "opacity-0"}`}>
                        <div className="sm:p-8 p-4 rounded-2xl shadow-lg ">
                            {/* Routine Header */}
                            <h1 id="name" className="text-3xl sm:text-5xl font-extrabold text-purple-700 mb-6 main1">{routine.name}</h1>
                            <p id="desc" className="text-base sm:text-xl text-zinc-700 mb-6 main4">{routine.description}</p>

                            {/* Duration and Milestones */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center justify-center flex-col gap-4 text-lg sm:text-xl text-gray-800 main2">
                                    <div id="duration" className="flex items-center gap-2">
                                        <span className="font-semibold text-purple-600">Duration:</span>
                                        <span className="text-gray-600 font-bold">{routine.duration} Weeks</span>
                                    </div>
                                    <div id="mile" className="flex items-center gap-2">
                                        <span className="font-semibold text-purple-600">Milestones:</span>
                                        <span className="text-gray-600 font-bold">{routine.milestones}</span>
                                    </div>
                                </div>
                                {isAdmin && <div onClick={handleEditRoutine} className="flex cursor-pointer items-center justify-center">
                                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2">
                                        Edit this Routine
                                    </button>
                                </div>}
                            </div>

                            {/* Weekly Benefits */}
                            {routine.benefits && routine.benefits.length > 0 && (
                                <div className="mt-12" id="weekly-benefits">
                                    <h2 className="text-2xl sm:text-4xl font-bold text-purple-700 mb-6">Weekly Benefits</h2>
                                    <ul className="list-disc pl-2 sm:pl-8 text-lg text-gray-700 space-y-12">
                                        {routine.benefits.map((benefit, index) => (
                                            <div key={index} className="flex flex-col items-center justify-center gap-4 w-full">
                                                <li

                                                    className="sm:p-6 p-3 w-full bg-pink-100 rounded-xl shadow-lg hover:bg-pink-200 hover:scale-105 transition-all duration-300 transform"
                                                >
                                                    <p className="text-lg sm:text-2xl font-semibold text-purple-800 main1">{`Week ${index + 1}:`}</p>
                                                    <p className="sm:text-xl text-base font-normal text-gray-800 main4">{benefit}</p>
                                                </li>
                                                {/* Completed Button for each week */}
                                                {!isAdmin && (
                                                    <div className="flex sm:flex-row flex-col gap-4 sm:gap-0 justify-between items-center w-full mt-4">
                                                        {/* Completed Button */}
                                                        <button
                                                            onClick={() => { handleCompletedWeekTask(index) }}
                                                            className={`px-6 py-2 sm:text-xl text-base font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all ${completedTasks[index]
                                                                ? 'bg-green-600 hover:bg-green-700 text-white'
                                                                : 'bg-purple-600 hover:bg-purple-700 text-white'
                                                                }`}
                                                            disabled={completedTasks[index]}
                                                        >
                                                            {completedTasks[index] ? 'You have done' : 'Completed'}
                                                        </button>

                                                        {/* Milestones */}
                                                        {(routine.milestones === 'Bi-Weekly' ? (index + 1) % 2 === 0 : true) && (
                                                            <div className="flex items-center space-x-2">
                                                                {completedTasks[index] ? (
                                                                    <>
                                                                        <FaCheckCircle className="text-green-500 sm:text-2xl text-lg" />
                                                                        <span className="sm:text-lg text-base text-gray-800 font-medium">Milestone achieved</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <LuBadgeCent className="text-yellow-500 sm:text-2xl text-lg" />
                                                                        <span className="sm:text-lg text-base text-gray-800 font-medium">Milestone pending</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}


                                            </div>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Steps */}
                            {routine.steps && routine.steps.length > 0 && (
                                <div className="mt-12" id="steps">
                                    <h2 className="sm:text-4xl text-2xl font-bold text-purple-700 mb-6">Steps</h2>
                                    <ul className="list-disc sm:pl-8 pl-2 text-lg text-gray-700 space-y-8">
                                        {routine.steps.map((step, index) => (
                                            <li
                                                key={index}
                                                className="sm:p-8 p-4 bg-purple-100 rounded-xl shadow-lg hover:bg-purple-200 hover:scale-105 transition-all duration-300 transform"
                                            >
                                                <div className="space-y-4">
                                                    {/* Step Title */}
                                                    <p className="sm:text-2xl text-xl font-semibold text-purple-800 main1">{`Step ${index + 1}:`}</p>

                                                    {/* Step Description */}
                                                    <p className="text-base font-normal main4 text-gray-800">{step.description}</p>

                                                    {/* Product Information (if available) */}
                                                    {step.product && (
                                                        <div className="mt-6 space-y-2 text-base sm:text-lg">
                                                            <p className="font-normal text-gray-800 main1">
                                                                Product: <span className="font-bold text-purple-600 main4">{step.product["product-name"]}</span>
                                                            </p>
                                                            <p className="font-normal text-gray-800 main1">Description: <span className="font-semibold text-purple-600 main4">{step.product["product-desc"]}</span></p>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Progress Section */}
                            {progress !== 0 && (
                                <div className="mt-12" id="progress">
                                    {/* Progress Heading */}
                                    <h2 className="sm:text-4xl text-3xl main1 font-extrabold text-purple-800 mb-8 uppercase tracking-wide">
                                        Progress
                                    </h2>

                                    {/* Progress Bar */}
                                    <div className="w-full bg-zinc-300 rounded-full h-8 shadow-inner">
                                        <div
                                            className="h-8 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="mt-4 sm:text-3xl text-xl text-gray-600 font-semibold main4">{`Progress: ${progress}%`}</p>

                                    <p className="mt-2 sm:text-2xl text-xl text-gray-700 font-medium main4">
                                        {`Weeks Remaining: ${completedTasks.filter((task) => task === false).length}`}
                                    </p>


                                    {/* Benefits Achieved */}
                                    {completedTasks.length > 0 && (
                                        <div className="mt-8">
                                            <h3 className="sm:text-3xl text-2xl font-bold text-purple-700 mb-6">Benefits Achieved</h3>
                                            <ul className="list-disc sm:pl-8 pl-2 text-lg text-gray-800 space-y-3">
                                                {routine.benefits
                                                    .filter((_, index) => completedTasks[index]) // Only show completed benefits
                                                    .map((benefit, index) => (
                                                        <li
                                                            key={index}
                                                            className="sm:text-xl text-sm main4 font-semibold text-purple-900 bg-purple-100 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                                                        >
                                                            {`Week ${index + 1}: ${benefit}`}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                    </div>

                </div>)}

                
            {!sidebar && (
                <div onClick={toggleSidebar} className="absolute top-0 left-0 m-2 text-3xl rounded-xl md:hidden bg-indigo-300 p-1">
                    <IoMenuSharp />
                </div>
            )}

            {sidebar && (
                <>
                    <div className="w-[100vw] absolute top-0 h-screen">
                        <RoutineSidebar />
                    </div>
                    <div onClick={toggleSidebar} className="absolute top-0 text-3xl right-0 m-2 p-1 bg-indigo-300 rounded-xl md:hidden">
                        <FaSkullCrossbones />
                    </div>
                </>
            )}

            {showRoutineBuilder && (
                <RoutineBuilder data={thisRoutine} isEdit={true} />
            )}
        </>
    );
};

export default RoutineDetails;