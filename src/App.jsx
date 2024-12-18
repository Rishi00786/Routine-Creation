import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserIdentity from "./components/Home/UserIdentity";
import Routines from "./components/Custom/Routines";
import AdminRoutines from "./components/Admin/AdminRoutines";

function App() {

  return (
    <BrowserRouter>
      <div className="w-[100vw] h-[100vh]">
        <Routes>
          <Route path="/" element={<UserIdentity />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/admin/Routines" element={<AdminRoutines />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;