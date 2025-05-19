import { FaCircleCheck, FaRegCircleCheck } from "react-icons/fa6";

function ZenButton({ label, onClick, isLoading }) {
    return ( 
        <button
            className={`group flex h-10 w-32 items-center justify-between gap-2 rounded-full border border-zinc-800 bg-linear-to-t from-zinc-950 to-zinc-900 px-2 text-white ${isLoading ? '' : 'hover:cursor-pointer'}`}
            onClick={onClick}
            disabled={isLoading}
        >
            {
                isLoading 
                ? <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent" />
                : (
                    <>
                        <FaCircleCheck className="hidden text-green-500 group-hover:block" />
                        <FaRegCircleCheck className="block text-green-500 group-hover:hidden" />
                    </>
                )
            }
            <span className={`text-sm ${isLoading ? 'text-white/30' : 'text-white/70 group-hover:text-white'} transition ease-in-out`}>
                {label}
            </span>
            <span></span>
        </button>
     );
}

export default ZenButton;