interface InputNumberProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const InputNumber: React.FC<InputNumberProps> = ({
  label,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        className="w-full p-2.5 border border-gray-300 rounded-xl outline-none transition-all shadow-sm focus:border-[#0FBB82] focus:ring-2 focus:ring-green-200"
        placeholder={placeholder || ""}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};