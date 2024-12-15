import { CartProvider } from "@/context/Store";
import Nav from "./Nav";
import Footer from "./Footer";
import { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            <div className="flex flex-col justify-between min-h-screen">
                <Nav />

                <main>{children}</main>

                <Footer />
            </div>
        </CartProvider>
    );
}

export default Layout;
