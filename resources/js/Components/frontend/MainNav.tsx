import { cn } from "@/lib/utils";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
    const routes = [
        {
            href: `#portofolios`,
            label: "Whats's new",
        },
        {
            href: `#learning_path`,
            label: "Delivery",
        },
    ];

    return (
        <nav className={cn("lg:space-x-5", className)}>
            {routes.map((route) => (
                <a
                    key={route.href}
                    href={route.href}
                    className={
                        "ml-4 text-sm font-medium hover:transition-opacity hover:duration-300 hover:opacity-60"
                    }
                >
                    {route.label}
                </a>
            ))}
        </nav>
    );
}
