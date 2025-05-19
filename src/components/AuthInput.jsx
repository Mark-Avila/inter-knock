function AuthInput({ label, value, onChange, type, placeholder, disabled }) {
    return (
        <div className="flex flex-col">
            <label htmlFor={label} className={`text-xs ${disabled ? 'text-white/30' : 'text-white'} mb-1`}>
                {label}
            </label>
            <div className="bg-zinc-900 rounded-full border-2 border-zinc-800">
                <input
                    id={label}
                    className={`border border-black ${disabled ? 'text-white/30' : 'text-white'} text-xs py-2 px-3 h-full w-full outline-none border-none`}
                    value={value}
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}

export default AuthInput;
