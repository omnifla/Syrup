"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LaptopSyrup from "@/public/LaptopSyrup.png";
import Image from "next/image";
import { motion } from "motion/react";

export function Hero() {
    const [browser, setBrowser] = useState("Chrome");

    useEffect(() => {
        const userAgent = navigator.userAgent;
        if (userAgent.includes("Chrome")) {
            setBrowser("Chrome");
        } else if (userAgent.includes("Firefox")) {
            setBrowser("Firefox");
        } else if (userAgent.includes("Safari")) {
            setBrowser("Safari");
        } else {
            setBrowser("Chromium based");
        }
    }, []);

    return (
        <section className="container mx-auto px-4 py-12 md:py-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center items-center h-[400px] order-1 md:order-none">
                <Image
                    src={LaptopSyrup}
                    alt="Laptop with Syrup"
                    className="rounded-lg hidden md:block"
                />
            </div>

            <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                    We search for the internet's best coupons
                </h1>
                <p className="text-xl text-gray-600">
                    Stop wasting time and money, Syrup helps you find coupon
                    codes on 30,000+ sites.
                </p>
                <Button
                    size="lg"
                    className="bg-[#a82c04] hover:bg-[#8a2503] text-white px-8"
                >
                    Add to {browser}
                </Button>
            </div>
        </section>
    );
}
