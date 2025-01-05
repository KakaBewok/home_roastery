const NavbarMobile = () => {
    return (
        <div className="relative min-h-screen bg-gray-100 md:hidden">
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-sm">
                <ul className="flex items-center justify-around py-2">
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-800 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            <span className="text-xs">Delivery</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-800 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 7v10m5-5H7"
                                />
                            </svg>
                            <span className="text-xs">History</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-800 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 7v4a2 2 0 002 2h4v4a2 2 0 002 2h4m4-16H9a2 2 0 00-2 2v10a2 2 0 002 2h6a2 2 0 002-2V5a2 2 0 00-2-2z"
                                />
                            </svg>
                            <span className="text-xs">Home</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavbarMobile;
