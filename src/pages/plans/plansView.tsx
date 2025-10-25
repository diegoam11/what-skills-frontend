import React from "react";
import { usePlansLogic } from "./PlansLogic";
import { Spinner } from "../../components/Spinner";
import { Check, Star } from "lucide-react";
import { PaymentModal } from "../../components/PaymentModal";

export const PlansView: React.FC = () => {
  const {
    plans,
    currentUser,
    isLoading,
    isModalOpen,
    selectedPlanForPayment,
    openPaymentModal,
    closePaymentModal,
    confirmSubscription,
    // --- 1. IMPORTAR LA NUEVA FUNCIÓN ---
    handleCancelSubscription,
  } = usePlansLogic();

  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  const activePlanId = currentUser.currentSubscription?.planId;

  // Filtramos planes inactivos o de admin para que el usuario no los vea
  const userVisiblePlans = plans.filter(
    (plan) => plan.isActive && plan.code !== "UNLIMITED"
  );

  return (
    <>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Elige tu Plan
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVisiblePlans.map((plan) => {
            const isCurrentPlan = plan.id === activePlanId;
            // --- 2. VARIABLE CLAVE: Identificar el plan Trial ---
            const isThisPlanTrial = plan.code === "TRIAL";

            return (
              <div
                key={plan.id}
                className={`rounded-2xl shadow-sm border-2 p-6 flex flex-col ${
                  isCurrentPlan
                    ? "bg-green-50 border-green-500"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Badges, Títulos, Precios, Features... todo eso queda igual */}
                
                {/* Badge de Plan Actual */}
                {isCurrentPlan && (
                  <div className="text-center -mt-9 mb-3">
                    <span className="px-4 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      Plan Actual
                    </span>
                  </div>
                )}
                {/* Badge de Trial (Ahora solo se muestra si NO es el actual) */}
                {isThisPlanTrial && !isCurrentPlan && (
                  <div className="text-center -mt-9 mb-3">
                    <span className="px-4 py-1.5 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg flex items-center gap-1.5 justify-center">
                      <Star size={16} /> Plan Gratuito
                    </span>
                  </div>
                )}

                {/* Header del Plan */}
                <div className="text-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>
                {/* Precio */}
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    S/ {plan.price.toFixed(2)}
                  </span>
                  <span className="text-gray-600">
                    / {plan.durationDays} días
                  </span>
                </div>
                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* --- 3. LÓGICA DE BOTONES TOTALMENTE NUEVA --- */}
                <div className="mt-auto">
                  {isThisPlanTrial ? (
                    // Es la tarjeta del Plan Trial
                    <button
                      disabled
                      className="w-full px-4 py-3 font-semibold rounded-xl transition-colors bg-gray-200 text-gray-600 cursor-default"
                    >
                      {isCurrentPlan ? "Tu Plan Actual" : "Plan Gratuito"}
                    </button>
                  ) : (
                    // Es una tarjeta de Plan de PAGO (Mensual, Anual)
                    isCurrentPlan ? (
                      // Es un plan de PAGO y está ACTIVO
                      <button
                        onClick={handleCancelSubscription}
                        className="w-full px-4 py-3 font-semibold rounded-xl transition-colors bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                      >
                        Cancelar Suscripción
                      </button>
                    ) : (
                      // Es un plan de PAGO y NO está activo
                      <button
                        onClick={() => openPaymentModal(plan)}
                        className="w-full px-4 py-3 font-semibold rounded-xl transition-colors bg-[#0FBB82] text-white hover:bg-[#0FAE7D] cursor-pointer"
                      >
                        Suscribirse
                      </button>
                    )
                  )}
                </div>
                {/* --- FIN DE LA LÓGICA DE BOTONES --- */}
                
              </div>
            );
          })}
        </div>
      </div>

      {/* El modal de pago no cambia */}
      <PaymentModal
        isOpen={isModalOpen}
        onClose={closePaymentModal}
        onSubmit={confirmSubscription}
        planName={selectedPlanForPayment?.name || "este plan"}
      />
    </>
  );
};