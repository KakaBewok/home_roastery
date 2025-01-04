import { useState, useEffect } from "react";
import { useCartContext } from "@/context/Store";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Input } from "../../Components/ui/input";
import { SearchInput } from "./SearchInput";
import { MainNav } from "./MainNav";
import NavbarMobile from "./NavbarMobile";

function Nav() {
    // const cart = useCartContext()[0];
    const [cartItems, setCartItems] = useState(0);

    // useEffect(() => {
    //     let numItems = 0;
    //     cart.forEach((item) => {
    //         numItems += item.variantQuantity;
    //     });
    //     setCartItems(numItems);
    // }, [cart]);

    return (
        <header className="sticky top-0 z-20 bg-white">
            {/* <div className="flex items-center justify-between max-w-6xl px-6 pt-4 pb-2 mx-auto md:pt-6">
                <a href="/">
                    <a className="cursor-pointer ">
                        <h1 className="flex no-underline">
                            <img
                                height="32"
                                width="32"
                                alt="logo"
                                className="object-contain w-8 h-8 mr-1"
                                src="/icon.svg"
                            />
                            <span className="pt-1 text-xl font-bold tracking-tight font-primary">
                                {process.env.siteTitle}
                            </span>
                        </h1>
                    </a>
                </a>
                <div>
                    <a href="/cart">
                        <a className="relative " aria-label="cart">
                            <FontAwesomeIcon
                                className="w-6 m-auto text-palette-primary"
                                icon={faShoppingCart}
                            />
                            {cartItems === 0 ? null : (
                                <div className="absolute top-0 right-0 px-2 py-1 text-xs font-semibold text-gray-900 transform translate-x-10 -translate-y-3 bg-yellow-300 rounded-full">
                                    {cartItems}
                                </div>
                            )}
                        </a>
                    </a>
                </div>
            </div> */}
            <div className="flex items-center justify-between w-full h-20 border border-red-500 md:px-0">
                <h1 className="hidden text-xl font-semibold md:block text-slate-800 dark:text-white">
                    <a href="#navbar">Home</a>
                </h1>
                <MainNav className="hidden lg:flex lg:items-center" />
                <div className="flex items-center justify-between gap-4 mx-auto border border-blue-500 md:gap-3 md:mx-0">
                    <label className="flex items-center gap-1 px-3 bg-white input input-bordered">
                        <input
                            type="text"
                            className="w-full border-none outline-none md:w-full focus:outline-none focus:ring-0"
                            placeholder="Search"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="w-4 h-4 opacity-70"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </label>
                    <div className="hidden dropdown dropdown-end md:block">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle"
                        >
                            <div className="indicator">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item -z-10">
                                    8
                                </span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
                        >
                            <div className="card-body">
                                <span className="text-lg font-bold">
                                    8 Items
                                </span>
                                <span className="text-info">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="btn btn-primary btn-block">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <NavbarMobile />
            </div>
        </header>
    );
}

export default Nav;
