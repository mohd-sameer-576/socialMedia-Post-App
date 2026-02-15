import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/auth/logout-user",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="group relative px-6 py-2 font-black uppercase tracking-tighter
                 bg-red-500 text-white border-4 border-black 
                 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                 hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5
                 active:bg-black active:text-red-500
                 transition-all duration-75 cursor-pointer"
    >
      <span className="relative z-10 flex items-center gap-2">
        Logout
        <span className="text-xl group-hover:animate-bounce">🏃💨</span>
      </span>
      
      {/* Comic Book "Inner Border" Detail */}
      <div className="absolute inset-0.5 border-2 border-white opacity-20 pointer-events-none"></div>
    </button>
  );
};

export default LogoutButton;