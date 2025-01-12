const Loading = () => {
    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30">
            <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-orange-700 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
            >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;
