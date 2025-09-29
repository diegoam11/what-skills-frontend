import { SearchableSelect } from "../../components/SearchableSelect";
import { RegisterLogic } from "./RegisterLogic";
import logo from "../../assets/logo.png";

export const RegisterView: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    career,
    setCareer,
    job,
    setJob,
    careers,
    jobs,
    handleSubmit,
  } = RegisterLogic();

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
          Registro
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

        {/* Career */}
        <SearchableSelect
          label="Carrera"
          options={careers}
          value={career}
          onChange={setCareer}
          placeholder="Escribe tu carrera"
        />

        {/* Job */}
        <SearchableSelect
          label="Puesto Laboral Deseado"
          options={jobs}
          value={job}
          onChange={setJob}
          placeholder="Escribe el puesto"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Registrarme
        </button>
        <a
          href="/login"
          className="mt-3 block text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          ¿Ya tienes una cuenta?
        </a>
      </form>
    </div>
  );
};
