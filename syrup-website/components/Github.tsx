import * as React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export function GithubButton() {
    return (
        <Button asChild variant="ghost">
            <Link href="https://github.com/Abdallah-Alwarawreh/syrup">
                <Icon icon="mdi:github" />
            </Link>
        </Button>
    );
}
