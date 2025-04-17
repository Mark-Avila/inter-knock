function ChatProfile() {
    return ( 
        <div className="flex gap-2 border border-white w-fit p-2 pr-8 rounded-full">
            <div className="w-12 h-12 bg-white rounded-full"></div>
            <div className="flex flex-col justify-evenly h-full">
                <p className="text-white">big_muncher</p>
                <p className="text-white text-sm">#123AB</p>
            </div>
        </div>
     );
}

export default ChatProfile;