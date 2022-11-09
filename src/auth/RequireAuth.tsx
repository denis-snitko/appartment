import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

export const RequireAuth = ({ children }: any) => {
	const { user } = useAuth();

	if (!user) {
		return <Navigate to="/login" />;
	}

	return children;
};
