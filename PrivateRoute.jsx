import { Navigate } from "react-router-dom";
import { useStateContext } from "./context";
import PropTypes from "prop-types";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
    const { isAdmin } = useStateContext();

    useEffect(() => {
        if (!isAdmin) {
            alert("You can't access the admin's page");
        }
    }, [isAdmin]);

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
