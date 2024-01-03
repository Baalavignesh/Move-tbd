import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Login } from "./pages";
import withAuth from "./HOC/withAuth";
import { useEffect } from "react";
import { Web5 } from "@web5/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import protocolDefinition from "./assets/move-protocol.json";
import { setWeb5 } from "./features/auth/authSlice.ts";
import { useWeb5 } from "./plugin/web5Context.tsx";

function App() {

  const { web5, myDID } = useWeb5();
  const configureProtocol = async () => {
    const { protocols, status } = await web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: protocolDefinition.protocol,
        },
      },
    });

    if (status.code !== 200) {
      alert("Error querying protocols");
      console.error("Error querying protocols", status);
      return;
    }

    // if the protocol already exists, we return
    if (protocols.length > 0) {
      console.log("Protocol already exists");
      return;
    }

    // configure protocol on local DWN
    const { status: configureStatus, protocol } =
      await web5.dwn.protocols.configure({
        message: {
          definition: protocolDefinition,
        },
      });

    console.log("Protocol configured", configureStatus, protocol);
  };

  useEffect(() => {
    // connectToWeb5();
    configureProtocol();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={withAuth(Dashboard)} />
        <Route path="/error" Component={ErrorPage} />
        <Route path="/" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
