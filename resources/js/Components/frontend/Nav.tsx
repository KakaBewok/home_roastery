import { useState, useEffect } from "react";
import { useCartContext } from "@/context/Store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Nav() {
    const cart = useCartContext()[0];
    const [cartItems, setCartItems] = useState(0);

    useEffect(() => {
        let numItems = 0;
        cart.forEach((item) => {
            numItems += item.variantQuantity;
        });
        setCartItems(numItems);
    }, [cart]);

    return (
        <header className="sticky top-0 z-20 bg-white border-b border-palette-lighter">
            <div className="flex items-center justify-between max-w-6xl px-6 pt-4 pb-2 mx-auto md:pt-6">
                <Link href="/" passHref>
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
                </Link>
                <div>
                    <Link href="/cart" passHref>
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
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Nav;
