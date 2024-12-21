import { FaClock, FaClipboardList, FaInfoCircle, FaStepForward, FaAward, FaTag, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context";
import { GiProgression } from "react-icons/gi";

const RoutineSidebar = () => {
    const navigate = useNavigate();
    const { setSidebar, isAdmin } = useStateContext(false);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
        setSidebar(false);
    };

    return (
        <div className="w-full h-full bg-gradient-to-r from-indigo-700 to-purple-600 text-white md:rounded-[3rem] shadow-2xl flex flex-col items-center justify-start p-2 lg:p-8 gap-8 lg:gap-12">
            {/* Header */}
            <div className="mt-6 lg:mt-0 xl:mt-8 text-4xl lg:text-5xl font-bold underline underline-offset-8 decoration-white tracking-wider">
                Routine
            </div>
            {/* Routine Details */}
            <div className="flex flex-col items-start justify-center text-lg w-full px-12 md:px-10 md:mt-4 lg:mt-0 lg:px-3">
                <div className="flex flex-col items-start justify-center gap-5 lg:gap-6 xl:gap-8 text-lg w-full">
                    <div 
                        onClick={() => scrollToSection("name")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaTag className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Name</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("desc")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaInfoCircle className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Description</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("duration")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaClock className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Duration</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("mile")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaClipboardList className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Milestones</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("weekly-benefits")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaAward className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Weekly Benefits</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("steps")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <FaStepForward className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Steps</span>
                    </div>
                    <div 
                        onClick={() => scrollToSection("progress")}
                        className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all"
                    >
                        <GiProgression className="text-xl lg:text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-xl lg:text-2xl">Progress</span>
                    </div>
                </div>
            </div>
            {/* Footer Section */}
            <div className="mt-8 w-full flex xl:flex-row flex-col items-center text-center justify-between gap-3 xl:gap-8">
                <div className="flex gap-8">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-2xl lg:text-3xl hover:text-white transition-all">
                        <FaTwitter />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-2xl lg:text-3xl hover:text-white transition-all">
                        <FaGithub />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-2xl lg:text-3xl hover:text-white transition-all">
                        <FaInstagram />
                    </a>
                </div>
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                    <button
                        onClick={() => { isAdmin ? navigate('/admin/routines') : navigate('/routines'); }}
                        className="flex items-center font-semibold text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                    >
                        <MdArrowBack className="text-3xl mr-2" />
                        <span>Back</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoutineSidebar;