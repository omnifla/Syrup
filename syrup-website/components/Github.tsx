import * as React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

export function GithubButton() {
    return (
        <Link
            href="https://github.com/Abdallah-Alwarawreh/syrup"
            target="_blank"
        >
            <Icon icon="mdi:github" width="24" height="24" />
        </Link>
    );
}
