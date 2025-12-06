import { useState } from "react";
import { jobsAPI, type JobIngestResponse } from "../../../api/endpoints";

export const useAdminJobsLogic = () => {
  const [formData, setFormData] = useState({
    rawText: "",
    url: "",
    source: "LinkedIn", // Valor por defecto
  });

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<JobIngestResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rawText.trim()) {
      setError("Por favor pega el texto de la oferta.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await jobsAPI.ingest({
        raw_text: formData.rawText,
        url: formData.url,
        source: formData.source,
      });
      setResult(response);
      // Limpiamos el texto grande para dejar listo para la siguiente
      setFormData(prev => ({ ...prev, rawText: "", url: "" }));
    } catch (err: any) {
      console.error(err);
      setError("Error al procesar la oferta. Verifica que el backend esté activo.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleIngest,
    isLoading,
    result,
    error,
  };
};