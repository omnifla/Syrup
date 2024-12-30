import React from "react";
import NavigationHeader from "@/components/NavigationHeader";
import Syrup from "@/public/Syrup.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import StarUsButton from "@/components/StarUs";

export default function Home() {
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <main>
            <NavigationHeader logoSrc={Syrup} title="Syrup" links={navLinks} />
            {/* Hero */}
            <div className="container mx-auto flex flex-col items-center text-center py-20 px-6">
                <h1 className="text-5xl font-bold text-primary">
                    Ethical Savings, Simplified
                </h1>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
                    <span className="text-primary">Syrup</span> helps you
                    discover and apply the best coupons effortlessly, with full
                    transparency and no shady practices.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Button asChild variant="default">
                        <Link href="#">Get Started</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="About">About</Link>
                    </Button>
                </div>
            </div>

            <div className="h-96"></div>

            <StarUsButton />
        </main>
    );
}
