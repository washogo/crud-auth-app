type InputProps = {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
  required: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

/** 短文のテキスト入力用 */
export default function Input({ label, type, name, placeholder, required, value, onChange }: InputProps) {
  return (
    <div className="flex flex-row gap-2 w-full">
      <label className="w-1/8" htmlFor={name}>
        {label}
      </label>
      <input
        className="w-full max-w-2xs border-1 bg-white p-1"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
