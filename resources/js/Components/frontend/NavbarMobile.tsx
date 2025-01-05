"use client";

const NavbarMobile = () => {
    return (
        // <div className="lg:hidden">
        //     <div className="drawer drawer-end">
        //         <input
        //             id="my-drawer-4"
        //             type="checkbox"
        //             className="drawer-toggle"
        //         />
        //         <div className="drawer-content">
        //             <label
        //                 htmlFor="my-drawer-4"
        //                 className="drawer-button btn btn-ghost"
        //             >
        //                 <AlignJustify
        //                     size={20}
        //                     className="dark:text-slate-300 text-slate-700"
        //                 />
        //             </label>
        //         </div>
        //         <div className="drawer-side">
        //             <label
        //                 htmlFor="my-drawer-4"
        //                 aria-label="close sidebar"
        //                 className="drawer-overlay"
        //             ></label>
        //             <ul className="min-h-full p-4 bg-white menu w-80 dark:bg-slate-900">
        //                 <div className="flex justify-between py-3 pl-8 pr-4 mt-5">
        //                     <a
        //                         href="cv_noprizal.pdf"
        //                         target="_blank"
        //                         rel="noopener noreferrer"
        //                         download
        //                         className="px-3 py-2 text-sm font-medium transition border rounded-md border-slate-200 text-slate-600 hover:bg-slate-50 duration-400 dark:bg-slate-100 dark:text-state-300 dark:hover:bg-slate-200"
        //                     >
        //                         Resume
        //                     </a>
        //                 </div>
        //                 <hr className="my-8 mx-7 mb-11" />
        //                 <MainNav className="flex flex-col pl-5 space-y-10" />
        //                 <div className="flex justify-center mt-auto mb-5 space-x-6">
        //                     <a
        //                         href="https://www.instagram.com/_kkbwk"
        //                         target="_blank"
        //                         className="cursor-pointer hover:transition-opacity hover:duration-300 hover:opacity-50"
        //                     >
        //                         {/* <Image
        //                             src="/icons/Instagram.png"
        //                             alt="Github"
        //                             width={24}
        //                             height={24}
        //                             className="object-cover rounded-md"
        //                         /> */}
        //                     </a>
        //                     <a
        //                         href="https://github.com/KakaBewok"
        //                         target="_blank"
        //                         className="cursor-pointer hover:transition-opacity hover:duration-300 hover:opacity-50"
        //                     >
        //                         {/* <Image
        //                             src="/icons/Github.png"
        //                             alt="Github"
        //                             width={24}
        //                             height={24}
        //                             className="object-cover rounded-md"
        //                         /> */}
        //                     </a>
        //                     <a
        //                         href="https://www.aedin.com/in/noprizal/"
        //                         target="_blank"
        //                         className="cursor-pointer hover:transition-opacity hover:duration-300 hover:opacity-50"
        //                     >
        //                         {/* <Image
        //                             src="/icons/aedin.png"
        //                             alt="aedin"
        //                             width={24}
        //                             height={24}
        //                             className="object-cover rounded-md"
        //                         /> */}
        //                     </a>
        //                     <a
        //                         href="https://twitter.com/@KkBwk"
        //                         target="_blank"
        //                         className="cursor-pointer hover:transition-opacity hover:duration-300 hover:opacity-50"
        //                     >
        //                         {/* <Image
        //                             src="/icons/Twitter.png"
        //                             alt="Twitter"
        //                             width={24}
        //                             height={24}
        //                             className="object-cover rounded-md"
        //                         /> */}
        //                     </a>
        //                 </div>
        //             </ul>
        //         </div>
        //     </div>
        // </div>
        <div className="relative min-h-screen bg-gray-100 md:hidden">
            {/* Navbar Bawah */}
            <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg">
                <ul className="flex items-center justify-around py-2">
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
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
                            <span className="text-xs">Profile</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
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
                            <span className="text-xs">Add</span>
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex flex-col items-center text-gray-600 hover:text-blue-500"
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
