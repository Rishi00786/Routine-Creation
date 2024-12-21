import { FaClock, FaClipboardList, FaInfoCircle, FaStepForward, FaAward, FaTag, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context";

const RoutineSidebar = () => {

    const navigate = useNavigate()
    const { isAdmin }  = useStateContext()

    return (
        <div className="w-full h-full bg-gradient-to-r from-indigo-700 to-purple-600 text-white rounded-[3rem] shadow-2xl flex flex-col items-center justify-start p-8 gap-12">
            {/* Header */}
            <div className="mt-8 text-5xl font-bold underline underline-offset-8 decoration-white tracking-wider">
                Routine
            </div>
            {/* Routine Details */}
            <div className="flex flex-col items-start justify-center gap-24 text-lg w-full px-6">
                <div className="flex flex-col items-start justify-center gap-8 text-lg w-full">
                    <a href="#name" className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaTag className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Name</span>
                    </a>
                    <a href="#desc" className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaInfoCircle className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Description</span>
                    </a>
                    <a href="#duration" className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaClock className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Duration</span>
                    </a>
                    <a href="#mile" className="cursor-pointer flex items-center gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaClipboardList className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Milestones</span>
                    </a>
                    <a href="#weekly-benefits" className="flex cursor-pointer items-center gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaAward className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Weekly Benefits</span>
                    </a>
                    <a href="#steps" className="flex items-center cursor-pointer  gap-4 group hover:underline hover:text-gray-200 transition-all">
                        <FaStepForward className="text-2xl group-hover:text-white transition-all" />
                        <span className="font-medium text-2xl">Steps</span>
                    </a>
                </div>
            </div>
            {/* Footer Section */}
            <div className="mt-8 w-full flex items-center text-center justify-between gap-8">
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                    <button
                        onClick={() => {isAdmin ? navigate('/admin/routines') : navigate('/routines')}}
                        className="flex items-center font-semibold text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
                    >
                        <MdArrowBack className="text-3xl mr-2" />
                        <span>Back</span>
                    </button>
                </div>
                <div className="flex gap-8">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-3xl hover:text-white transition-all">
                        <FaTwitter />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-3xl hover:text-white transition-all">
                        <FaGithub />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="cursor-pointer text-3xl hover:text-white transition-all">
                        <FaInstagram />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RoutineSidebar;
