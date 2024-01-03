import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-custom-black text-primary p-4 flex justify-between items-center pl-10 pr-10">
      <h2 onClick={() => navigate("/dashboard")} className="cursor-pointer">
        Move by Web5
      </h2>
      <div className="flex gap-12">
        <p className="cursor-pointer hover:scale-110 transition-transform hover:font-medium">
          Username
        </p>
        <p className="cursor-pointer hover:scale-110 transition-transform hover:font-medium">
          About
        </p>
        <p className="text-custom-red cursor-pointer hover:scale-110 transition-transform hover:font-medium">
          Logout
        </p>
      </div>
    </div>
  );
};

export default Header;
