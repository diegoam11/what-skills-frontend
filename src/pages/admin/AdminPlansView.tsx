import React, { useState, useEffect } from "react";
import { CreditCard, Edit2, Trash2, Plus, DollarSign, Calendar } from "lucide-react";
import { AdminLayout } from "./AdminLayout";

interface Plan {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  durationDays: number;
  isTrial: boolean;
  isActive: boolean;
  features: string[];
  displayOrder: number;
}

export const AdminPlansView: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    try {
      const response = await fetch("/users.json");
      const data = await response.json();
      const mockPlans = localStorage.getItem("mockPlans");
      
      if (mockPlans) {
        setPlans(JSON.parse(mockPlans));
      } else {
        localStorage.setItem("mockPlans", JSON.stringify(data.plans));
        setPlans(data.plans);
      }
    } catch (error) {
      console.error("Error loading plans:", error);
    }
  };

  const handleEdit = (plan: Plan) => {
    setSelectedPlan({ ...plan });
    setIsCreating(false);
    setShowEditModal(true);
  };

  const handleCreate = () => {
    setSelectedPlan({
      id: `plan_${Date.now()}`,
      code: "",
      name: "",
      description: "",
      price: 0,
      durationDays: 30,
      isTrial: false,
      isActive: true,
      features: [],
      displayOrder: plans.length + 1,
    });
    setIsCreating(true);
    setShowEditModal(true);
  };

  const handleDelete = (planId: string) => {
    if (window.confirm("¿Estás seguro de eliminar este plan?")) {
      const updatedPlans = plans.filter((p) => p.id !== planId);
      setPlans(updatedPlans);
      localStorage.setItem("mockPlans", JSON.stringify(updatedPlans));
    }
  };

  const handleToggleActive = (planId: string) => {
    const updatedPlans = plans.map((p) =>
      p.id === planId ? { ...p, isActive: !p.isActive } : p
    );
    setPlans(updatedPlans);
    localStorage.setItem("mockPlans", JSON.stringify(updatedPlans));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    let updatedPlans;
    if (isCreating) {
      updatedPlans = [...plans, selectedPlan];
    } else {
      updatedPlans = plans.map((p) =>
        p.id === selectedPlan.id ? selectedPlan : p
      );
    }

    setPlans(updatedPlans);
    localStorage.setItem("mockPlans", JSON.stringify(updatedPlans));
    setShowEditModal(false);
    setSelectedPlan(null);
  };

  const addFeature = () => {
    if (selectedPlan) {
      setSelectedPlan({
        ...selectedPlan,
        features: [...selectedPlan.features, ""],
      });
    }
  };

  const updateFeature = (index: number, value: string) => {
    if (selectedPlan) {
      const newFeatures = [...selectedPlan.features];
      newFeatures[index] = value;
      setSelectedPlan({ ...selectedPlan, features: newFeatures });
    }
  };

  const removeFeature = (index: number) => {
    if (selectedPlan) {
      const newFeatures = selectedPlan.features.filter((_, i) => i !== index);
      setSelectedPlan({ ...selectedPlan, features: newFeatures });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-8 h-8 text-indigo-600" />
            Gestión de Planes
          </h1>
          <p className="text-gray-600 mt-2">
            Administra los planes de suscripción disponibles
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Plan
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
              plan.isActive ? "border-indigo-200" : "border-gray-200 opacity-60"
            }`}
          >
            {/* Plan Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-semibold rounded ${
                    plan.isTrial
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {plan.code}
                </span>
              </div>
              <button
                onClick={() => handleToggleActive(plan.id)}
                className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  plan.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                title={plan.isActive ? "Activo" : "Inactivo"}
              >
                {plan.isActive ? "Activo" : "Inactivo"}
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">
                  S/ {plan.price.toFixed(2)}
                </span>
                <span className="text-gray-600">
                  / {plan.durationDays} días
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Características:
              </h4>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-indigo-600 mt-1">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => handleEdit(plan)}
                className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 flex items-center justify-center gap-2"
                title="Editar plan"
              >
                <Edit2 className="w-4 h-4" />
                Editar
              </button>
              <button
                onClick={() => handleDelete(plan.id)}
                className="flex-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2"
                title="Eliminar plan"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No hay planes disponibles
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Crea un nuevo plan para comenzar
          </p>
        </div>
      )}

      {/* Edit/Create Modal */}
      {showEditModal && selectedPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {isCreating ? "Crear Nuevo Plan" : "Editar Plan"}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Código *
                  </label>
                  <input
                    type="text"
                    value={selectedPlan.code}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, code: e.target.value.toUpperCase() })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="MONTHLY"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    value={selectedPlan.name}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="Plan Mensual"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  value={selectedPlan.description}
                  onChange={(e) =>
                    setSelectedPlan({ ...selectedPlan, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  rows={2}
                  placeholder="Descripción del plan..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Precio (S/) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedPlan.price}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, price: parseFloat(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="29.90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Duración (días) *
                  </label>
                  <input
                    type="number"
                    value={selectedPlan.durationDays}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, durationDays: parseInt(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPlan.isTrial}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, isTrial: e.target.checked })
                    }
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Es plan de prueba</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedPlan.isActive}
                    onChange={(e) =>
                      setSelectedPlan({ ...selectedPlan, isActive: e.target.checked })
                    }
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Activo</span>
                </label>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Características
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar
                  </button>
                </div>
                <div className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(idx, e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Característica del plan..."
                      />
                      <button
                        type="button"
                        onClick={() => removeFeature(idx)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Eliminar característica"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedPlan(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  {isCreating ? "Crear Plan" : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};
