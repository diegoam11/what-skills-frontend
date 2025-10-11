interface InputTextProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputText: React.FC<InputTextProps> = ({
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
        type="text"
        className="w-full p-2.5 border border-gray-300 rounded-xl outline-none transition-all shadow-sm focus:border-[#0FBB82] focus:ring-2 focus:ring-green-200"
        placeholder={placeholder || ""}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};