import { useDispatch } from "react-redux";
import { setWeb5 } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Fade } from "@mui/material";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      dispatch(
        setWeb5({
          accessToken: "access_token",
          refreshToken: "refresh_token",
        })
      );
      navigate("/dashboard");
    } catch (err: any) {
      if (err?.code === 4902) {
        console.log("inside");
        navigate("/dashboard");
      }
    }
  };

  useEffect(() => {
    console.log("login screen");
  }, []);

  return (
    <div className="min-h-screen">
      <Fade in={true} timeout={1000}>
        <div className="flex flex-col justify-center items-center h-screen gap-8">
          <h1>Welcome to Move by Web5</h1>
          <button
            className="p-4 rounded-sm bg-primary text-custom-black"
            onClick={handleLogin}
          >
            Login Now
          </button>
        </div>
      </Fade>
    </div>
  );
};

export default Login;
