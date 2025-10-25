import { useState, useEffect } from "react";
import type { User, Plan } from "./types";

export const usePlansLogic = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForPayment, setSelectedPlanForPayment] = useState<Plan | null>(null);

  // Carga inicial de datos (sin cambios)
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        // Cargar planes
        const plansData = localStorage.getItem("mockPlans");
        if (plansData) {
          setPlans(JSON.parse(plansData));
        } else {
          console.warn("mockPlans no encontrado. Cargando desde /users.json...");
          const response = await fetch("/users.json");
          const data = await response.json();
          if (data && data.plans) {
            localStorage.setItem("mockPlans", JSON.stringify(data.plans));
            setPlans(data.plans);
          }
        }

        // Cargar TODOS los usuarios
        let usersList: User[] = [];
        const mockUsersData = localStorage.getItem("mockUsers");
        if (mockUsersData) {
          usersList = JSON.parse(mockUsersData);
        } else {
          console.warn("mockUsers no encontrado. Cargando desde /users.json...");
          const response = await fetch("/users.json");
          const data = await response.json();
          if (data && data.users) {
            localStorage.setItem("mockUsers", JSON.stringify(data.users));
            usersList = data.users;
          }
        }

        // Cargar el usuario actual (y encontrar sus datos COMPLETOS)
        const simpleUserData = localStorage.getItem("userData");
        if (simpleUserData && usersList.length > 0) {
          const simpleUser = JSON.parse(simpleUserData);
          const fullUser = usersList.find(
            (u: User) => u.id === simpleUser.id
          );
          if (fullUser) {
            setCurrentUser(fullUser);
          } else {
            setCurrentUser(simpleUser);
          }
        }
      } catch (error) {
        console.error("Error al cargar datos de planes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [plans]); // <--- CAMBIO: Hacemos que se recargue si 'plans' cambia

  // Lógica de SUSCRIPCIÓN (sin cambios)
  const confirmSubscription = () => {
    if (!currentUser || !selectedPlanForPayment) return;

    const newSubscription = {
      planId: selectedPlanForPayment.id,
      planName: selectedPlanForPayment.name,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + selectedPlanForPayment.durationDays * 24 * 60 * 60 * 1000
      ).toISOString(),
      isActive: true,
      isTrial: selectedPlanForPayment.isTrial,
    };

    const updatedCurrentUser = {
      ...currentUser,
      currentSubscription: newSubscription,
    };
    localStorage.setItem("userData", JSON.stringify(updatedCurrentUser));
    setCurrentUser(updatedCurrentUser);

    try {
      const mockUsersData = localStorage.getItem("mockUsers");
      if (mockUsersData) {
        let mockUsers = JSON.parse(mockUsersData);
        const userIndex = mockUsers.findIndex(
          (u: User) => u.id === currentUser.id
        );
        if (userIndex !== -1) {
          mockUsers[userIndex] = updatedCurrentUser;
          localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
        }
      }
    } catch (error) {
      console.error("Error al actualizar mockUsers:", error);
    }

    setIsModalOpen(false);
    setSelectedPlanForPayment(null);
    alert(`¡Pago completado! Te has suscrito al ${selectedPlanForPayment.name}`);
  };

  // --- 1. NUEVA FUNCIÓN PARA CANCELAR ---
  const handleCancelSubscription = () => {
    if (!currentUser) return;

    // 1. Encontrar el plan Trial en la lista de planes
    const trialPlan = plans.find((p) => p.code === "TRIAL");
    if (!trialPlan) {
      console.error("No se encontró el plan Trial. No se puede cancelar.");
      alert("Error: No se encontró el plan gratuito.");
      return;
    }

    // 2. Confirmación
    if (
      !window.confirm(
        "¿Estás seguro de que quieres cancelar tu suscripción? Volverás al plan gratuito."
      )
    ) {
      return;
    }

    // 3. Crear la nueva suscripción "Trial"
    // (le damos 7 días nuevos de "prueba")
    const newSubscription = {
      planId: trialPlan.id,
      planName: trialPlan.name,
      startDate: new Date().toISOString(),
      endDate: new Date(
        Date.now() + trialPlan.durationDays * 24 * 60 * 60 * 1000
      ).toISOString(),
      isActive: true,
      isTrial: true,
    };

    // 4. Actualizar 'userData' (para el usuario actual)
    const updatedCurrentUser = {
      ...currentUser,
      currentSubscription: newSubscription,
    };
    localStorage.setItem("userData", JSON.stringify(updatedCurrentUser));
    setCurrentUser(updatedCurrentUser); // Actualizar estado local

    // 5. Actualizar 'mockUsers' (para la vista de Admin)
    try {
      const mockUsersData = localStorage.getItem("mockUsers");
      if (mockUsersData) {
        let mockUsers = JSON.parse(mockUsersData);
        const userIndex = mockUsers.findIndex(
          (u: User) => u.id === currentUser.id
        );
        if (userIndex !== -1) {
          mockUsers[userIndex] = updatedCurrentUser;
          localStorage.setItem("mockUsers", JSON.stringify(mockUsers));
        }
      }
    } catch (error) {
      console.error("Error al actualizar mockUsers:", error);
    }

    alert("Suscripción cancelada. Has vuelto al plan gratuito.");
  };

  // Controladores del Modal (sin cambios)
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
    // --- 2. EXPORTAR LA NUEVA FUNCIÓN ---
    handleCancelSubscription,
  };
};