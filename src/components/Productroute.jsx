import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Productroute = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      //   toast.warn("Please Sign in!");
      toast.warn("Please Sign in!", {
        toastId: "auth-warning",
      });
    }
  }, [user]);

  return <div>{user ? children : <Navigate to={"/"} />}</div>;
};

export default Productroute;
