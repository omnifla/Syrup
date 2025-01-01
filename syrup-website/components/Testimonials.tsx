"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
    {
        name: "Zixy",
        avatar: "",
        role: "",
        testimonial:
            "Syrup helped me save money, actually giving me useful and working promo codes. Syrup is saving me money, while Honey is taking it away. I reccomend it to anyone that sees this! 5 stars",
    },
    {
        name: "Lord Chemeron",
        avatar: "/Testimonials/Lord Chemeron.jpg",
        role: "Student, Programmer, Linux user",
        testimonial:
            "As a broke programming student, Syrup saves me money and time—time I can spend tweaking my Arch install (i use arch btw). Good, 10/10.",
    },
    {
        name: "Sulsta",
        avatar: "",
        role: "",
        testimonial:
            "Syrup is like insanly good and it saves me a lot of money because it gives me working discount codes and doesn't replace my affiliate cookies",
    },
    {
        name: "ItsAdi1982",
        avatar: "",
        role: "Student, Tech Enthusiast",
        testimonial:
            "This is an incredibly efficient tool that helps save money, prioritizes privacy, and remains fully open-source.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Don't just take our word for it
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className=" shadow-lg transition-all hover:shadow-xl hover:scale-105"
                        >
                            <CardHeader>
                                <div className="flex items-center">
                                    <Image
                                        src={
                                            testimonial.avatar == ""
                                                ? "/Testimonials/DefaultUser.svg"
                                                : testimonial.avatar
                                        }
                                        alt={`${testimonial.name} avatar`}
                                        width={48}
                                        height={48}
                                        loading="lazy"
                                        className="rounded-full mr-4"
                                    />
                                    <div>
                                        <CardTitle>
                                            {testimonial.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {testimonial.role}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 text-sm">
                                    {testimonial.testimonial}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
