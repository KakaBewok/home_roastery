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
                                viewBox="0 0 24 24"
                                id="estate"
                                className="w-7 h-7"
                            >
                                <path
                                    fill="#FCA87D"
                                    d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"
                                ></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-800 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="history"
                                className="w-7 h-7"
                            >
                                <path
                                    fill="#FCA87D"
                                    d="M12,2A10,10,0,0,0,5.12,4.77V3a1,1,0,0,0-2,0V7.5a1,1,0,0,0,1,1H8.62a1,1,0,0,0,0-2H6.22A8,8,0,1,1,4,12a1,1,0,0,0-2,0A10,10,0,1,0,12,2Zm0,6a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1h2a1,1,0,0,0,0-2H13V9A1,1,0,0,0,12,8Z"
                                ></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-800 hover:text-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                id="truck"
                                className="w-7 h-7"
                            >
                                <path
                                    fill="#FCA87D"
                                    d="M1,12.5v5a1,1,0,0,0,1,1H3a3,3,0,0,0,6,0h6a3,3,0,0,0,6,0h1a1,1,0,0,0,1-1V5.5a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v2H6A3,3,0,0,0,3.6,8.7L1.2,11.9a.61.61,0,0,0-.07.14l-.06.11A1,1,0,0,0,1,12.5Zm16,6a1,1,0,1,1,1,1A1,1,0,0,1,17,18.5Zm-7-13a1,1,0,0,1,1-1h9a1,1,0,0,1,1,1v11h-.78a3,3,0,0,0-4.44,0H10Zm-2,6H4L5.2,9.9A1,1,0,0,1,6,9.5H8Zm-3,7a1,1,0,1,1,1,1A1,1,0,0,1,5,18.5Zm-2-5H8v2.78a3,3,0,0,0-4.22.22H3Z"
                                ></path>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavbarMobile;
