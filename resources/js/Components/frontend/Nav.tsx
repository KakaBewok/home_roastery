import { useState, useEffect, useContext } from "react";
import { useCartContext } from "@/context/Store";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { NavItem } from "./NavItem";
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
            <nav className="flex items-center justify-between w-full h-20 px-3">
                <h1 className="hidden text-xl font-semibold md:block text-slate-800">
                    <a href="">Home Roastery</a>
                </h1>
                <NavItem className="hidden md:flex md:items-center" />
                <div className="flex items-center justify-between w-full gap-4 md:w-auto md:gap-3">
                    <h1 className="w-full text-xl font-semibold md:hidden text-slate-800">
                        <a href="">Home Roastery</a>
                    </h1>
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
                                <span className="z-10 text-white bg-red-500 border-none badge badge-sm indicator-item">
                                    118
                                </span>
                            </div>
                        </div>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-white z-[1] mt-3 w-52 shadow"
                        >
                            <div className="card-body">
                                <span className="text-sm text-slate-900">
                                    8 Items
                                </span>
                                <span className="text-sm text-slate-900">
                                    Subtotal: $999
                                </span>
                                <div className="card-actions">
                                    <button className="text-white bg-orange-500 border-none btn btn-block hover:bg-orange-400">
                                        View cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dropdown dropdown-end">
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
                            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-40 p-2 shadow"
                        >
                            <li>
                                <a>Profile</a>
                            </li>
                            <li>
                                <a>Settings</a>
                            </li>
                            <li>
                                <a>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <NavbarMobile />
            </nav>
        </header>
    );
}

export default Nav;

{
    /* <div className="flex items-center justify-between max-w-6xl px-6 pt-4 pb-2 mx-auto md:pt-6">
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
            </div> */
}
