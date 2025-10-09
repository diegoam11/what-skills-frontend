import { Bell, UserCircle, LogOut,} from "lucide-react";

export const NavBar: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <img src="/vite.svg" alt="logo" className="h-6" />
        <h1 className="text-lg font-semibold text-gray-800">What Skills</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9]">
          <Bell size={20} /> <span className="text-sm">Alertas</span>
        </button>

        <button className="flex items-center gap-1.5 bg-white text-gray-800 font-[500] px-3 py-1.5 rounded-xl hover:bg-gray-300 transition border-2 border-[#E8F5E9]">
          <UserCircle size={20} /> <span className="text-sm">Perfil</span>
        </button>

        <button className="flex items-center gap-1.5 bg-[#0FBB82] text-white px-3 py-1.5 text-[80%] font-[600] rounded-xl hover:bg-green-700 transition">
          <LogOut size={20} /> <span className="text-sm">Salir</span>
        </button>
      </div>
    </header>
  );
};