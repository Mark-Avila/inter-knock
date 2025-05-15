function NavButton({ icon, text }) {
    return ( 
        <button className="font-montserrat text-sm flex items-center gap-3 rounded-full border-3 border-zinc-700 bg-zinc-900 px-4 w-fit py-2 font-bold text-zinc-400 transition ease-in-out hover:cursor-pointer hover:border-zinc-600 hover:text-zinc-50 active:text-zinc-500">
            {icon ? icon : ''}
            {text}
        </button>
     );
}

export default NavButton;