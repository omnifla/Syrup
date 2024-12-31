import React from "react";
import PropTypes from "prop-types";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/react";
import { GithubButton } from "./Github";
import { Pacifico } from "next/font/google";
import { cn } from "@/lib/utils";

const pacifico = Pacifico({
    weight: "400",
    subsets: ["latin"],
});

const NavigationHeader = ({
    title,
    links,
}: {
    title: string;
    links: { href: string; label: string }[];
}) => {
    return (
        <header className="flex z-10 h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 absolute text-primary-foreground">
            <div className="flex items-center space-x-4">
                <h1 className={cn(pacifico.className, "text-2xl")}>{title}</h1>
            </div>

            <NavigationMenu>
                <NavigationMenuList className="hidden md:flex space-x-4">
                    <GithubButton />
                    {links.map((link) => (
                        <NavigationMenuLink asChild key={link.href}>
                            <Link href={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
            <Sheet>
                <SheetTrigger asChild>
                    <Icon
                        icon="mdi:menu"
                        width="24"
                        height="24"
                        className="md:hidden"
                    />
                </SheetTrigger>
                <SheetContent>
                    <nav className="flex flex-col space-y-4">
                        {links.map((link) => (
                            <Link href={link.href} key={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    );
};

NavigationHeader.propTypes = {
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NavigationHeader;
