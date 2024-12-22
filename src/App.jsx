import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserIdentity from "./components/Home/UserIdentity";
import AdminRoutines from "./components/Admin/AdminRoutines";
// import PrivateRoute from "../PrivateRoute";
import RoutineDetails from "./components/Admin/RoutineDetails";
import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import CustomerRoutines from "./components/Custom/CustomerRoutines";
import Signup from "./components/Custom/Signup";
import Login from "./components/Custom/Login";
import Loader from "./components/Home/Loader";

function App() {

  const { setYourRoutines, setPreBuiltRoutines, setAllRoutines, myRoutines } = useStateContext()

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchRoutines = async () => {
      try {

        const api = import.meta.env.VITE_API_URL
        // const api_url = 'http://localhost:3000/routines';
        const api_url = `${api}/routines`;

        const response = await fetch(api_url);

        if (!response.ok) {
          const errorData = await response.json(); // Read the error response if available
          throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json()
        // console.log("Fetched routines from DATABASE:", data);

        const filteredRoutines = data.filter(
          (routine) => !myRoutines.some((myRoutine) => myRoutine.id === routine.id)
        );

        const yourRoutines = data.filter(routine => routine.preBuilt === false);
        const preBuiltRoutines = data.filter(routine => routine.preBuilt === true);

        setYourRoutines(yourRoutines);
        setPreBuiltRoutines(preBuiltRoutines);
        setAllRoutines(filteredRoutines)
        setLoading(false); // Set loading to false after data is fetched
        // console.log("yourRoutines.length",yourRoutines.length)
        // console.log("preBuiltRoutines.length", preBuiltRoutines.length)
      } catch (error) {
        console.error("Error fetching the routines from DATABASE", error)
        setLoading(false); // Set loading to false in case of an error
      }
    }

    fetchRoutines();
  }, [myRoutines, setAllRoutines, setPreBuiltRoutines, setYourRoutines])

  return (
    <BrowserRouter>
      <div className="w-[100vw] h-[100vh]">
        {loading ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<UserIdentity />} />
            <Route path="/user/signup" element={<Signup />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/routines" element={<CustomerRoutines />} />
            <Route
              path="/admin/Routines"
              element={
                // <PrivateRoute>
                <AdminRoutines />
                // </PrivateRoute>
              }
            />

            <Route
              path="/admin/routines/:id"
              element={
                // <PrivateRoute>
                <RoutineDetails />
                // </PrivateRoute>
              }
            /> {/* Dynamic Route */}
          </Routes>
        )}
      </div>
    </BrowserRouter >
  );
}

export default App;