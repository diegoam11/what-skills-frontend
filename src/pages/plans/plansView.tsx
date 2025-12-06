import React from "react";
import { usePlansLogic } from "./PlansLogic";
import { Spinner } from "../../components/Spinner";
import { Check } from "lucide-react"; // Quitamos Star si no la usas, o déjala
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
    handleCancelSubscription,
  } = usePlansLogic();

  if (isLoading || !currentUser) {
    return (
      <div className="flex justify-center items-center h-full min-h-[300px]">
        <Spinner />
      </div>
    );
  }

  // --- CORRECCIÓN 1: Usamos 'plan_code' directo del usuario ---
  // Si es null o undefined, asumimos "TRIAL"
  const activePlanCode = currentUser.plan_code || "TRIAL"; 

  // Filtramos planes inactivos o de admin
  const userVisiblePlans = plans.filter(
    (plan) => plan.is_active && plan.code !== "UNLIMITED"
  );

  return (
    <>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Elige tu Plan</h1>
                <p className="text-gray-500 mt-1">Potencia tu carrera con herramientas avanzadas de IA.</p>
            </div>
            
            {/* Badge de Estado */}
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm">
                Estado: <span className={`font-semibold ${currentUser.subscription_status === 'active' ? 'text-green-600' : 'text-gray-500'}`}>
                    {currentUser.subscription_status === 'active' ? 'Suscripción Activa' : 'Sin Suscripción'}
                </span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userVisiblePlans.map((plan) => {
            // --- CORRECCIÓN 2: Comparación por CÓDIGO (Más robusto) ---
            const isCurrentPlan = plan.code === activePlanCode;
            
            // --- CORRECCIÓN 3: Variables en snake_case (como vienen del backend) ---
            const isThisPlanTrial = plan.is_trial; 

            return (
              <div
                key={plan.id}
                className={`rounded-2xl shadow-sm border-2 p-6 flex flex-col transition-all hover:shadow-md ${
                  isCurrentPlan
                    ? "bg-green-50 border-[#0FBB82] relative overflow-hidden"
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Etiqueta "Tu Plan Actual" */}
                {isCurrentPlan && (
                  <div className="absolute top-0 right-0 bg-[#0FBB82] text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                    TU PLAN
                  </div>
                )}

                {/* Header del Plan */}
                <div className="text-center mb-4 mt-2">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {plan.description}
                  </p>
                </div>

                {/* Precio y Duración */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-4xl font-bold text-gray-900">
                        {plan.price === 0 ? "Gratis" : `S/ ${plan.price.toFixed(2)}`}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    {/* --- CORRECCIÓN 4: duration_days (snake_case) --- */}
                    / {plan.duration_days} días
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <div className="mt-0.5 bg-green-100 p-1 rounded-full">
                        <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* --- LÓGICA DE BOTONES --- */}
                <div className="mt-auto">
                  {isThisPlanTrial ? (
                    // CASO 1: Es el plan TRIAL
                    <button
                      disabled
                      className="w-full px-4 py-3 font-semibold rounded-xl bg-gray-100 text-gray-500 cursor-default border border-gray-200"
                    >
                      {isCurrentPlan ? "Plan Activo por Defecto" : "Plan Gratuito Básico"}
                    </button>
                  ) : (
                    // CASO 2: Es un plan de PAGO
                    isCurrentPlan ? (
                      // Ya lo tengo activo -> Opción de cancelar
                      <button
                        onClick={handleCancelSubscription}
                        className="w-full px-4 py-3 font-semibold rounded-xl transition-colors bg-white border-2 border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 cursor-pointer"
                      >
                        Cancelar Suscripción
                      </button>
                    ) : (
                      // No lo tengo -> Opción de comprar
                      <button
                        onClick={() => openPaymentModal(plan)}
                        className="w-full px-4 py-3 font-semibold rounded-xl transition-all bg-[#0FBB82] text-white hover:bg-[#0FAE7D] shadow-sm hover:shadow-md cursor-pointer active:scale-95"
                      >
                        Mejorar Plan
                      </button>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <PaymentModal
        isOpen={isModalOpen}
        onClose={closePaymentModal}
        onSubmit={confirmSubscription}
        planName={selectedPlanForPayment?.name || "este plan"}
      />
    </>
  );
};