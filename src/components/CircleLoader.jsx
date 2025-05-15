function CircleLoader() {
    return ( 
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <div className="h-4 w-4 animate-spin rounded-full border-4 border-white border-t-transparent" />
            <p className="animate-pulse font-bold text-white">
                Loading
            </p>
        </div>
     );
}

export default CircleLoader;