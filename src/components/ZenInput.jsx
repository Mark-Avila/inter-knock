function ZenInput({ type, name, id, onChange, value, placeholder }) {
    return ( 
        <div className="h-10 rounded-full border-3 border-zinc-700 bg-zinc-900">
            <input
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                className="h-full w-full px-4 font-bold text-white outline-none placeholder-white/15"
            />
        </div>
     );
}

export default ZenInput;