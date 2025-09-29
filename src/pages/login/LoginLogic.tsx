import { useState } from "react";

export const useLoginLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Intentando iniciar sesión con:", { email, password });
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
