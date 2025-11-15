export const Inputfield = ({
  label,
  required,
  id,
  type,
  message,
  placeholder,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          htmlFor={id}
          className="text-sm text-slate-700 font-medium mb-1"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...register(id, {
          required: {
            value: required,
            message: message || `${label} is required`,
          },
        })}
      />
      {error?.[id] && (
        <p className="text-red-500 text-xs mt-1">{error[id]?.message}</p>
      )}
    </div>
  );
};

