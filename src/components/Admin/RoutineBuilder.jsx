import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { MdOutlineCheckCircle } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai"; // Added for + icon

const RoutineBuilder = () => {
  const [step, setStep] = useState(1);
  const [routineData, setRoutineData] = useState({
    name: "",
    duration: "",
    description: "",
    milestones: "",
    steps: ["", "", "", "", ""],
    benefits: [],
    image: null,
    imagePreview: null,
  });

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;

    if (type === "steps") {
      // Handle dynamic steps input change
      const updatedSteps = [...routineData.steps];
      updatedSteps[index] = value;
      setRoutineData({ ...routineData, steps: updatedSteps });
    } else if (type === "benefits") {
      // Handle weekly benefits input change
      const updatedBenefits = [...routineData.benefits];
      updatedBenefits[index] = value;
      setRoutineData({ ...routineData, benefits: updatedBenefits });
    } else {
      // Handle other fields (name, duration, description, milestones, etc.)
      setRoutineData({ ...routineData, [name]: value });
    }
  };

  const addStep = () => {
    setRoutineData({ ...routineData, steps: [...routineData.steps, ""] });
  };

  const handleSubmit = () => {
    console.log("Routine Created:", routineData);
  };

  const updateMilestone = (milestone) => {
    setRoutineData({ ...routineData, milestones: milestone });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setRoutineData({ ...routineData, image: file, imagePreview: previewURL });
    }
  };

  return (
    <div className="w-[90vw] sm:w-[50vw] h-auto max-h-[80vh] my-8 bg-gray-200 rounded-xl p-8 shadow-xl border border-black absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-auto">
      <h1 className="text-3xl font-extrabold text-gray-700 mb-6 text-center main4">
        Routine Builder
      </h1>

      {/* Step 1: Routine Name */}
      {step === 1 && (
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 font-semibold main2">
            Routine Name
          </label>
          <input
            type="text"
            name="name"
            value={routineData.name}
            onChange={handleChange}
            placeholder="Enter routine name (e.g., Hair Care Routine)"
            className="w-full shadow-xl p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
          />
        </div>
      )}

      {/* Step 2: Routine Duration */}
      {step === 2 && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold main2 text-gray-600">
            Duration (in weeks)
          </label>
          <input
            type="number"
            name="duration"
            value={routineData.duration}
            onChange={handleChange}
            placeholder="Enter duration (e.g., 8)"
            className="w-full shadow-xl p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
          />
        </div>
      )}

      {/* Step 3: Routine Description */}
      {step === 3 && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold main2 text-gray-600">
            Routine Description
          </label>
          <textarea
            name="description"
            value={routineData.description}
            onChange={handleChange}
            placeholder="Describe the routine benefits, goals, etc."
            className="w-full shadow-xl p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
          />
        </div>
      )}

      {/* Step 4: Routine Milestones */}
      {step === 4 && (
        <div className="mb-6">
          <label className="block mb-2 font-semibold main2 text-gray-600">
            Milestones:
          </label>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => updateMilestone("Weekly")}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/60 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => updateMilestone("Bi-Weekly")}
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/60 font-medium rounded-lg text-lg px-5 py-2.5 text-center"
            >
              Bi-Weekly
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Describing Steps */}
      {step === 5 && (
        <div className="mb-6">
          <div className="block mb-2 text-zinc-800 font-semibold text-xl main">
            Describe steps for your routine:
          </div>
          {routineData.steps.map((step, index) => (
            <div key={index}>
              <label className="block mb-2 text-gray-600 font-semibold main2 mt-4">
                Step-{index + 1}:
              </label>
              <textarea
                name="description"
                value={step}
                onChange={(e) => handleChange(e, index, "steps")}
                placeholder={`Describe step ${index + 1}`}
                className="w-full shadow-xl p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
              />
            </div>
          ))}
          <div
            onClick={addStep}
            className="flex items-center cursor-pointer mt-4 text-xl text-indigo-600"
          >
            <AiOutlinePlusCircle className="mr-2" /> Add More Steps
          </div>
        </div>
      )}

      {/* Weekly Benefits */}
      {step === 6 && (
        <div className="mb-6">
          <div className="block mb-2 text-zinc-800 font-semibold text-xl main">
            Describe weekly benefits of your routine
          </div>

          {Array.from({ length: routineData.duration }).map((_, index) => (
            <div key={index} className="mb-4">
              <label className="block mb-2 text-gray-600 font-semibold main2">
                Week-{index + 1}:
              </label>
              <input
                type="text"
                name={`week-${index + 1}`}
                value={routineData.benefits[index] || ""}
                onChange={(e) => handleChange(e, index, "benefits")}
                placeholder={`Enter benefit for Week ${index + 1}`}
                className="w-full shadow-xl p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
              />
            </div>
          ))}
        </div>
      )}

      {/* Step 7: Upload Image */}
      {step === 7 && (
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 font-semibold main2">
            Upload Image
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-3 border border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-800"
          />
          {routineData.imagePreview && (
            <div className="mt-4">
              <p className="text-zinc-900 font-semibold main4">Image Preview:</p>
              <div className="w-[40vw] h-[30vh] overflow-hidden rounded-lg shadow-lg">
                <img
                  src={routineData.imagePreview}
                  alt="Routine Preview"
                  className="w-full h-full object-cover object-center shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleBack}
          disabled={step === 1}
          className="flex main2 items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        >
          <AiOutlineArrowLeft className="text-xl" />
          Back
        </button>
        {step < 7 ? (
          <button
            onClick={handleNext}
            className="flex main2 items-center justify-center shadow-lg gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Next
            <AiOutlineArrowRight className="text-xl" />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="flex main2 items-center justify-center shadow-lg gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Submit
            <MdOutlineCheckCircle className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};

export default RoutineBuilder;
