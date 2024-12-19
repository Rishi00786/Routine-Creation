import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserIdentity from "./components/Home/UserIdentity";
import Routines from "./components/Custom/Routines";
import AdminRoutines from "./components/Admin/AdminRoutines";
import PrivateRoute from "../PrivateRoute";
import RoutineDetails from "./components/Admin/RoutineDetails";

function App() {

  return (
    <BrowserRouter>
      <div className="w-[100vw] h-[100vh]">
        <Routes>
          <Route path="/" element={<UserIdentity />} />
          <Route path="/routines" element={<Routines />} />
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
      </div>
    </BrowserRouter >
  );
}

export default App;