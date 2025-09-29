import { useLoginLogic } from "./LoginLogic";
import logo from "../../assets/logo.png";

export const LoginView: React.FC = () => {
  const { email, setEmail, password, setPassword, handleSubmit } =
    useLoginLogic();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md space-y-5"
      >
        {/* Logo */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="What Skills Logo"
            className="h-16 w-auto mb-2 rounded-md"
          />
          <h1 className="ml-2">What skills?</h1>
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Iniciar Sesión
        </h1>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Iniciar Sesión
        </button>

        <a
          href="/register"
          className="mt-3 block text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ¿No tienes una cuenta? Regístrate
        </a>
      </form>
    </div>
  );
};
