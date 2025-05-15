function AuthInput({ label, value, onChange, type, placeholder }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className="text-xs text-white mb-1">
                {label}
            </label>
            <div className="bg-zinc-900 rounded-full border-2 border-zinc-800">
                <input
                    id={label}
                    className="border border-black text-white text-xs py-2 px-3 h-full w-full outline-none border-none"
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                />
            </div>
        </div>
    );
}

export default AuthInput;
