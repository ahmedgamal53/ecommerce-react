import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const Productroute = ({ children }) => {
  const { user } = useUser();
  const [redirect, setRedirect] = useState(false);
  //   useEffect(() => {
  //     if (!user) {
  //       toast.warn("Please Sign in!");
  //       setTimeout(() => {
  //         setRedirect(true);
  //       }, 50);
  //     }
  //   }, [user]);

  //   if (redirect) {
  //     return <Navigate to="/" replace />;
  //   }

  //   return user ? children : null;
  // };

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
