import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function Testimonials() {
    const testimonials = [
        {
            name: "Zixy",
            avatar: "",
            role: "",
            content:
                "Syrup helped me save money, actually giving me useful and working promo codes. Syrup is saving me money, while Honey is taking it away. I reccomend it to anyone that sees this! 5 stars",
        },
        {
            name: "Lord Chemeron",
            avatar: "/Testimonials/Lord Chemeron.jpg",
            role: "Student, Programmer, Linux user",
            content:
                "As a broke programming student, Syrup saves me money and time, time I can spend tweaking my Arch install (i use arch btw). Good, 10/10.",
        },
        {
            name: "Sulsta",
            avatar: "",
            role: "",
            content:
                "Syrup is like insanly good and it saves me a lot of money because it gives me working discount codes and doesn't replace my affiliate cookies",
        },
        {
            name: "ItsAdi1982",
            avatar: "",
            role: "Student, Tech Enthusiast",
            content:
                "This is an incredibly efficient tool that helps save money, prioritizes privacy, and remains fully open-source.",
        },
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        What Our Users Say
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Join over 17 million people who save with Syrup
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="transition-all duration-300 ease-in-out transform hover:scale-105"
                        >
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage
                                            src={
                                                testimonial.avatar == ""
                                                    ? `/Testimonials/placeholder.svg`
                                                    : testimonial.avatar
                                            }
                                        />
                                        <AvatarFallback>
                                            {testimonial.avatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-0.5 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="w-4 h-4 fill-[#a82c04] text-[#a82c04]"
                                        />
                                    ))}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">
                                    {testimonial.content}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
