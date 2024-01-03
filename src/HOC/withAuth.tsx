import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Fade, LinearProgress } from "@mui/material";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            setLoading(false)
            navigate("/dashboard");
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 10);
  
      return () => {
        clearInterval(timer);
      };
    }, []);


    if (loading) {
      return (
        <Fade in={true} timeout={1000}>
          <div className="flex flex-col justify-center items-center h-screen gap-8">
            <Box className="w-1/2" >
              <LinearProgress variant="determinate" color="success" value={progress} />
            </Box>
          </div>
        </Fade>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
