import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { plansAPI, type Plan } from "../../api/endpoints";

export const usePlansLogic = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  // Usamos el usuario del contexto global, y la función para recargarlo
  const { user, refreshUser } = useAuth(); 
  
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Plan | null>(null);

  // 1. Cargar Planes del Backend
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await plansAPI.getAll();
        // Opcional: Filtramos solo los activos para que el usuario no vea planes archivados
        const activePlans = data.filter(p => p.is_active);
        setPlans(activePlans);
      } catch (error) {
        console.error("Error al cargar planes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Lógica de SUSCRIPCIÓN (Real)
  const confirmSubscription = async () => {
    if (!user || !selectedPlanForPayment) return;

    try {
      // A. Llamada al Backend (POST /plans/subscribe/CODE)
      await plansAPI.subscribe(selectedPlanForPayment.code);
      
      // B. Actualizar el Contexto Global
      // Esto hace que el "Plan Actual" se actualice en toda la app sin recargar página
      await refreshUser(); 
      
      // C. Feedback y Limpieza
      alert(`¡Pago exitoso! Bienvenido al ${selectedPlanForPayment.name}`);
      setIsModalOpen(false);
      setSelectedPlanForPayment(null);

    } catch (error) {
      console.error("Error suscribiendo:", error);
      alert("Hubo un error al procesar tu suscripción. Intenta nuevamente.");
    }
  };

  // 3. Lógica de CANCELACIÓN (Real)
  const handleCancelSubscription = async () => {
    if (!user) return;

    if (!window.confirm("¿Estás seguro de que quieres cancelar tu suscripción y volver al plan gratuito?")) {
      return;
    }

    try {
      // A. Llamada al Backend
      await plansAPI.cancel();

      // B. Actualizar el Contexto Global
      await refreshUser();

      alert("Suscripción cancelada. Has vuelto al plan gratuito.");
    } catch (error) {
      console.error("Error cancelando:", error);
      alert("No se pudo cancelar la suscripción.");
    }
  };

  // --- Manejo del Modal ---
  const openPaymentModal = (plan: Plan) => {
    setSelectedPlanForPayment(plan);
    setIsModalOpen(true);
  };

  const closePaymentModal = () => {
    setSelectedPlanForPayment(null);
    setIsModalOpen(false);
  };

  return {
    plans,
    currentUser: user, // Mapeamos 'user' a 'currentUser' para mantener compatibilidad con la vista
    isLoading,
    isModalOpen,
    selectedPlanForPayment,
    openPaymentModal,
    closePaymentModal,
    confirmSubscription,
    handleCancelSubscription,
  };
};