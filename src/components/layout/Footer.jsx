import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverRevealText from "../common/HoverRevealText";
import HoverButton from "../common/HoverButton";
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { useTheme } from "../../contexts/ThemeContext";
import { IoIosHeart } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";
import { navItems } from "../../data";
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
    const footerRef = useRef(null);
    const brandStripRef = useRef(null);
    const { currentImage } = useTheme();

    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter an email address.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Sending...");

        const formData = {
            to_name: "Gautam Mehto",
            from_name: '"Newsletter Vistor"',
            from_email: email,
            message: `User with email ${email} wants to start signaling each other!`,
        };

        const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

        emailjs
            .send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                formData,
                {
                    publicKey: EMAILJS_USER_ID,
                    limitRate: {
                        throttle: 10000, // 10s
                    },
                }
            )
            .then(
                () => {
                    setEmail("");
                    toast.success("Successfully sent!", { id: toastId });
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error("Failed to send:", error);
                    toast.error("Failed to send. Please try again.", { id: toastId });
                    setIsSubmitting(false);
                }
            );
    };

    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.set(brandStripRef.current, { height: "15vh" });
            // Parallax height expansion
            gsap.fromTo(
                brandStripRef.current,
                {
                    height: "5vh",
                    pin: true,
                },
                {
                    height: "fit-content",
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: brandStripRef.current,
                        start: "top bottom  ",
                        end: "top 80%", //",
                        scrub: true,
                    },
                }
            );

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const socialLinks = [
        { icon: FaGithub, href: "https://github.com/GautamMehto", label: "GitHub" },
        {
            icon: FaLinkedin,
            href: "https://www.linkedin.com/in/gautam-mehto",
            label: "LinkedIn",
        },
        { icon: SiGmail, href: "mailto:1mehetogautam@gmail.com", label: "Email" },
    ];

    return (
        <footer ref={footerRef} className="w-full bg-dark-bg text-text-primary">

            {/* ================= CTA SECTION ================= */}
            <section
                className="relative w-full h-screen flex items-center px-6 md:px-20 overflow-hidden bg-dark-bg"
                style={{
                    backgroundImage: `url('${currentImage}')`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-[var(--color-dark-bg)] via-transparent to-[var(--color-dark-bg)]"></div>

                <div className="relative z-10 w-full h-full py-10 flex flex-col md:flex-row justify-between items-center">
                    <div className="w-full md:max-w-3/6">
                        <HoverRevealText
                            primaryText="Let’s Work Together"
                            secondaryText="Replace Bad experiances"
                            className="text-text-primary font-helvetica text-7xl md:text-9xl font-semibold text-center md:text-left leading-none uppercase"
                        />
                    </div>

                    <div className="w-full md:w-2/6 flex flex-col gap-5 items-center md:items-end">

                        <p className="text-xl md:text-4xl text-center md:text-right text-text-primary">
                            Have a project in mind? Let’s create something great together.
                        </p>

                        <HoverButton
                            label="GET IN TOUCH"
                            icon={ArrowUpRight}
                            path={"/contact"}
                        />
                    </div>
                </div>
            </section>

            {/* ================= INFO SECTION ================= */}
            <section className="w-full px-6 md:px-20 py-24 flex flex-col md:flex-row justify-between gap-16 border-t border-border-dark">

                {/* Links */}
                <div>
                    <p className="text-2xl md:text-4xl font-semibold text-text-primary mb-4 uppercase">Navigation</p>
                    <ul className="space-y-0">
                        {navItems.map((item, idx) => (
                            <a key={idx} href={item.link} className="anim-social group flex items-center gap-4 w-fit overflow-hidden">
                                <span className="text-xl md:text-2xl font-semibold uppercase tracking-tighter text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                                    {item.name}
                                </span>
                                <BsArrowRight className="text-brand opacity-0 -translate-x-[80px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-2xl" />
                            </a>
                        ))}
                    </ul>
                </div>

                {/* Social */}
                <div className='flex flex-col justify-between'>
                    <div>
                        <p className="text-2xl md:text-4xl font-semibold text-text-primary mb-4 uppercase">Stalk Me On</p>
                        <ul className="flex justify-start gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="size-10 md:size-12 rounded-full border border-text-secondary flex items-center justify-center text-text-primary hover:scale-150 hover:bg-brand hover:border-brand transition-all duration-300 group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="group-hover:scale-150 group-hover:fill-text-primary transition-transform " />
                                </a>
                            ))}
                        </ul>
                    </div>
                    <h3 className="text-brand text-2xl font-semibold mt-4">
                        1mehetogautam@gmail.com
                    </h3>
                </div>

                {/* CTA */}
                <form onSubmit={handleSubscribe} className="block w-full md:w-auto">
                    <p className="text-2xl md:text-4xl font-semibold text-text-primary mb-4 capitalize">
                        Start Signaling Each Other
                    </p>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        required
                        disabled={isSubmitting}
                        className="text-lg md:text-xl w-full bg-transparent border-b border-border-dark py-3 outline-none focus:border-brand transition-colors disabled:opacity-50"
                    />

                    <HoverButton
                        label={isSubmitting ? "SENDING..." : "SEND"}
                        icon={ArrowUpRight}
                        type="submit"
                        disabled={isSubmitting}
                        className={"mt-5 w-full"}
                    />
                </form>
            </section>

            {/* ================= BRAND STRIP SECTION ================= */}
            <section
                ref={brandStripRef}
                className="w-full bg-brand text-dark-bg flex flex-col md:flex-row flex-wrap items-center md:items-base justify-between px-6 md:px-20 overflow-hidden"
            >
                <h1 className="text-[17vw] font-bold leading-none" style={{ fontFamily: 'var(--font-helvetica)' }}>
                    GAUTAM<sup className="text-[0.2em] ml-2">®</sup>
                </h1>

                <div className="max-w-md text-3xl md:text-6xl text-center md:text-right font-semibold ">
                    <HoverRevealText
                        primaryText="Making Good Shits, Built with Passion."
                        secondaryText="Hiding Bad Shits, Remove with Passion."
                        className="text-dark-bg! leading-none tracking-tight"
                    />
                </div>
                <div className="w-full flex items-center justify-between border-t border-border-dark pt-6 pb-3">
                    <p className="text-text-primary">
                        © {new Date().getFullYear()} Gautam Mehto. All Rights Reserved.
                        <Link to="https://gautammehto.github.io/dev.portfolio/" target="_blank" className="underline ml-2 text-text-secondary hover:text-text-primary transition-colors duration-300">Old Portfolio</Link>
                    </p>
                    <p className="text-text-primary flex items-center gap-1">
                        Built with <IoIosHeart className="text-text-primary" /> & React
                    </p>
                </div>
            </section>

        </footer>
    );
}