import React, { useState } from "react";
import { Modal } from "./Modal";
import { InputText } from "./InputText";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void; // Función que se ejecuta al "pagar"
  planName: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  planName,
}) => {
  // Estados falsos solo para que los inputs funcionen
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la validación real, pero la omitimos
    console.log("Procesando pago (simulado)...");
    
    // Llamamos a la función onSubmit que nos pasaron
    onSubmit(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Suscripción a: ${planName}`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputText
          label="Nombre en la tarjeta"
          value={name}
          onChange={setName}
          placeholder="Juan Pérez"
        />
        <InputText
          label="Número de la tarjeta"
          value={cardNumber}
          onChange={setCardNumber}
          placeholder="0000 0000 0000 0000"
        />
        <div className="flex gap-4">
          <InputText
            label="Fecha de Vencimiento"
            value={expiry}
            onChange={setExpiry}
            placeholder="MM/AA"
          />
          <InputText
            label="CVC"
            value={cvc}
            onChange={setCvc}
            placeholder="123"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#0FBB82] text-white font-semibold rounded-xl hover:bg-[#0FAE7D] transition-colors shadow-sm cursor-pointer"
          >
            Pagar y Suscribirse
          </button>
        </div>
      </form>
    </Modal>
  );
};