import { useState, useEffect } from "react";
import type { User, Subscription } from "../../types/domain/User";
import type { Plan } from "../../types/domain/Plan";

import { authService } from "../../services/auth";

export const usePlansLogic = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Plan | null>(null);

  // 1. Carga inicial de datos
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // A. Cargar Usuario (Usando la fuente de verdad)
        const user = authService.getCurrentUser();
        setCurrentUser(user);

        // B. Cargar Planes (Lógica específica de esta vista)
        const plansData = localStorage.getItem("mockPlans");
        if (plansData) {
          setPlans(JSON.parse(plansData));
        } else {
          // Si no existen, los cargamos del JSON maestro
          console.warn("Cargando planes iniciales...");
          const response = await fetch("/users.json");
          const data = await response.json();
          if (data && data.plans) {
            localStorage.setItem("mockPlans", JSON.stringify(data.plans));
            setPlans(data.plans);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // --- HELPER: Guardar cambios en el Mock (Base de datos falsa) ---
  // Esto simula la petición PUT /users/subscription
  const saveSubscriptionChange = (updatedUser: User) => {
    // 1. Actualizamos estado local
    setCurrentUser(updatedUser);

    // 2. Actualizamos sesión actual (localStorage 'userData')
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    // 3. Actualizamos la "Base de Datos" (localStorage 'mockUsers')
    try {
      const mockUsersData = localStorage.getItem("mockUsers");
      if (mockUsersData) {
        const mockUsers = JSON.parse(mockUsersData);
        // Buscamos y actualizamos el usuario en la lista maestra
        // Usamos map para crear un nuevo array inmutable
        const updatedMockUsers = mockUsers.map((u: any) =>
          u.id === updatedUser.id ? { ...u, ...updatedUser } : u
        );
        localStorage.setItem("mockUsers", JSON.stringify(updatedMockUsers));
      }
    } catch (error) {
      console.error("Error al persistir suscripción en mockUsers:", error);
    }
  };

  // 2. Lógica de SUSCRIPCIÓN
  const confirmSubscription = () => {
    if (!currentUser || !selectedPlanForPayment) return;

    const newSubscription: Subscription = {
      planId: selectedPlanForPayment.id,
      planName: selectedPlanForPayment.name,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + selectedPlanForPayment.durationDays * 24 * 60 * 60 * 1000
      ).toISOString(),
      isActive: true,
      isTrial: selectedPlanForPayment.isTrial,
    };

    const updatedUser: User = {
      ...currentUser,
      currentSubscription: newSubscription,
    };

    saveSubscriptionChange(updatedUser);

    setIsModalOpen(false);
    setSelectedPlanForPayment(null);
    alert(`¡Pago completado! Te has suscrito al ${selectedPlanForPayment.name}`);
  };

  // 3. Lógica de CANCELACIÓN
  const handleCancelSubscription = () => {
    if (!currentUser) return;

    const trialPlan = plans.find((p) => p.code === "TRIAL");
    if (!trialPlan) {
      alert("Error: No se encontró configuración del plan gratuito.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que quieres cancelar tu suscripción? Volverás al plan gratuito.")) {
      return;
    }

    const newSubscription: Subscription = {
      planId: trialPlan.id,
      planName: trialPlan.name,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + trialPlan.durationDays * 24 * 60 * 60 * 1000
      ).toISOString(),
      isActive: true,
      isTrial: true,
    };

    const updatedUser: User = {
      ...currentUser,
      currentSubscription: newSubscription,
    };

    saveSubscriptionChange(updatedUser);
    alert("Suscripción cancelada. Has vuelto al plan gratuito.");
  };

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
    currentUser,
    isLoading,
    isModalOpen,
    selectedPlanForPayment,
    openPaymentModal,
    closePaymentModal,
    confirmSubscription,
    handleCancelSubscription,
  };
};