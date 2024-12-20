import RoutineSidebar from "./RoutineSidebar"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuBadgeCent } from "react-icons/lu";
import { useStateContext } from "../../../context";
import { FaCheckCircle } from 'react-icons/fa'; // Import check icon

const RoutineDetails = () => {
    const { id } = useParams();
    const [routine, setRoutine] = useState({});
    const { isAdmin } = useStateContext()
    const [completedTasks, setCompletedTasks] = useState({});

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
            } catch (error) {
                console.error("Failed to fetch routine details.", error);
            }
        };

        fetchRoutine();
    }, [id]);

    if (!routine || Object.keys(routine).length === 0) {
        return <div>Loading...</div>; // Wait for the data to load
    }

    const handleCompletedWeekTask = (index) => () => {
        for (let i = 0; i < index; i++) {
          if (!completedTasks[i]) {
            alert('Please complete all previous tasks first!');
            return;
          }
        }
    
        setCompletedTasks((prev) => ({
          ...prev,
          [index]: !prev[index],
        }));
      };

    return (
        <div className="bg-slate-200 w-[100vw] h-auto flex items-start justify-start p-4">
            <div className="fixed w-[30vw] h-[95vh] p-4 flex items-start justify-center">
                <RoutineSidebar />
            </div>

            {/* Main content */}
            <div className="ml-[30vw] w-[70vw] p-8 h-auto  rounded-xl">
                <div className="p-8 rounded-2xl shadow-lg ">
                    {/* Routine Header */}
                    <h1 id="name" className="text-5xl font-extrabold text-purple-700 mb-6 main1">{routine.name}</h1>
                    <p id="desc" className="text-xl text-zinc-700 mb-6 main4">{routine.description}</p>

                    {/* Duration and Milestones */}
                    <div className="flex flex-col gap-4 text-xl text-gray-800 main2">
                        <div id="duration" className="flex items-center gap-2">
                            <span className="font-semibold text-purple-600">Duration:</span>
                            <span className="text-gray-600 font-bold">{routine.duration} Weeks</span>
                        </div>
                        <div id="mile" className="flex items-center gap-2">
                            <span className="font-semibold text-purple-600">Milestones:</span>
                            <span className="text-gray-600 font-bold">{routine.milestones}</span>
                        </div>
                    </div>

                    {/* Weekly Benefits */}
                    {routine.benefits && routine.benefits.length > 0 && (
                        <div className="mt-12" id="weekly-benefits">
                            <h2 className="text-4xl font-bold text-purple-700 mb-6">Weekly Benefits</h2>
                            <ul className="list-disc pl-8 text-lg text-gray-700 space-y-12">
                                {routine.benefits.map((benefit, index) => (
                                    <div key={index} className="flex flex-col items-center justify-center gap-4 w-full">
                                        <li

                                            className="p-6 w-full bg-pink-100 rounded-xl shadow-lg hover:bg-pink-200 hover:scale-105 transition-all duration-300 transform"
                                        >
                                            <p className="text-2xl font-semibold text-purple-800 main1">{`Week ${index + 1}:`}</p>
                                            <p className="text-xl font-medium text-gray-800">{benefit}</p>
                                        </li>
                                        {/* Completed Button for each week */}
                                        {!isAdmin && (
                                            <div className="flex justify-between items-center w-full mt-4">
                                                {/* Completed Button */}
                                                <button
                                                    onClick={handleCompletedWeekTask(index)}
                                                    className={`px-6 py-2 text-xl font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all ${completedTasks[index]
                                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                                                        }`}
                                                >
                                                    {completedTasks[index] ? 'You have done' : 'Completed'}
                                                </button>

                                                {/* Milestones */}
                                                {(routine.milestones === 'Bi-Weekly' ? (index + 1) % 2 === 0 : true) && (
                                                    <div className="flex items-center space-x-2">
                                                        {completedTasks[index] ? (
                                                            <>
                                                                <FaCheckCircle className="text-green-500 text-2xl" />
                                                                <span className="text-lg text-gray-800 font-medium">Milestone achieved</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <LuBadgeCent className="text-yellow-500 text-2xl" />
                                                                <span className="text-lg text-gray-800 font-medium">Milestone pending</span>
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
                            <h2 className="text-4xl font-bold text-purple-700 mb-6">Steps</h2>
                            <ul className="list-disc pl-8 text-lg text-gray-700 space-y-8">
                                {routine.steps.map((step, index) => (
                                    <li
                                        key={index}
                                        className="p-8 bg-purple-100 rounded-xl shadow-lg hover:bg-purple-200 hover:scale-105 transition-all duration-300 transform"
                                    >
                                        <div className="space-y-4">
                                            {/* Step Title */}
                                            <p className="text-2xl font-semibold text-purple-800 main1">{`Step ${index + 1}:`}</p>

                                            {/* Step Description */}
                                            <p className="text-base font-medium main4 text-gray-800">{step.description}</p>

                                            {/* Product Information (if available) */}
                                            {step.product && (
                                                <div className="mt-6 space-y-2">
                                                    <p className="font-medium text-gray-800 main1">
                                                        Product: <span className="font-bold text-purple-600 main4">{step.product["product-name"]}</span>
                                                    </p>
                                                    <p className="font-medium text-gray-800 main1">Description: <span className="font-semibold text-purple-600 main4">{step.product["product-desc"]}</span></p>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoutineDetails;