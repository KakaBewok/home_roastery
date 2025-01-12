import { cn } from "@/lib/utils";

export function NavItem({ className }: React.HTMLAttributes<HTMLElement>) {
    const routes = [
        {
            href: `#1`,
            label: "History",
        },
        {
            href: `#2`,
            label: "Delivery",
        },
    ];

    return (
        <div className={cn("md:space-x-5", className)}>
            {routes.map((route) => (
                <a
                    key={route.href}
                    href={route.href}
                    className={
                        "text-sm font-medium hover:transition-opacity hover:duration-200 hover:opacity-70"
                    }
                >
                    {route.label}
                </a>
            ))}
        </div>
    );
}
