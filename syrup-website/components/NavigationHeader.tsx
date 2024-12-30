import React from "react";
import PropTypes from "prop-types";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image, { StaticImageData } from "next/image";
import { Icon } from "@iconify/react";
import { ModeToggle } from "./theme-toggle";
import { GithubButton } from "./Github";

const NavigationHeader = ({
    logoSrc,
    title,
    links,
}: {
    logoSrc: StaticImageData;
    title: string;
    links: { href: string; label: string }[];
}) => {
    return (
        <header className="flex h-20 w-full shrink-0 items-center justify-between px-4 md:px-6 bg-background shadow-md border-border border-b-2">
            <div className="flex items-center space-x-4">
                <Image
                    src={logoSrc}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                    unoptimized={true}
                    priority
                    quality={100}
                />
                <h1 className="text-xl font-semibold">{title}</h1>
            </div>

            <NavigationMenu>
                <NavigationMenuList className="hidden md:flex space-x-4">
                    <ModeToggle />
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
                    <Button variant="outline" className="md:hidden">
                        <Icon icon="mdi:menu" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <nav className="flex flex-col space-y-4">
                        {links.map((link) => (
                            <Link href={link.href} key={link.href}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="absolute bottom-4 right-4">
                        <ModeToggle />
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    );
};

NavigationHeader.propTypes = {
    logoSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default NavigationHeader;
