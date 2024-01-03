import { useEffect } from "react";
import Header from "../../components/Header";


const Dashboard = () => {

useEffect(() => {
  console.log('Dashboard Screen')
}, []);

  return (
    <div className="min-h-screen">
      <Header />
    </div>
  );
};

export default Dashboard;
