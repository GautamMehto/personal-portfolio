import React, { lazy, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BsArrowRight } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';
// import HoverButton from '../components/common/HoverButton';
// import HoverRevealText from '../components/common/HoverRevealText';

const HoverButton = lazy(() => import('../components/common/HoverButton'));
const HoverRevealText = lazy(() => import('../components/common/HoverRevealText'));

const Contact = () => {
    const containerRef = useRef(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.error("Please fill in all fields.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Sending message...");

        const formData = {
            to_name: "Gautam Mehto",
            from_name: `"${name}"`,
            from_email: email,
            message: message,
        };

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
                    setName("");
                    setEmail("");
                    setMessage("");
                    toast.success("Your Message sent successfully To Mr. Gautam Mehto!", { id: toastId });
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error("Failed to send message:", error);
                    toast.error("Failed to send message. Please try again.", { id: toastId });
                    setIsSubmitting(false);
                }
            );
    };
    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(".anim-title", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
                stagger: 0.1,
                delay: 0.2
            })
                .from(".anim-form-item", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    stagger: 0.1
                }, "-=0.5")
                .from(".anim-social", {
                    x: -30,
                    opacity: 0,
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.1
                }, "-=0.6");
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-dark-bg text-text-primary pt-40 pb-20 px-6 md:px-20 selection:bg-brand selection:text-text-primary overflow-x-hidden">
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-20">

                {/* Left Side: Headline & Socials */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <HoverRevealText
                            primaryText="Let's Build Something Extraordinary"
                            secondaryText="Let's Remove Something Terriable"
                            className="text-7xl md:text-9xl font-helvetica font-semibold leading-none text-text-primary! text-center md:text-left"
                        />

                        <p className="anim-title text-text-secondary text-lg leading-relaxed mt-5">
                            Whether it's a new enterprise platform or a cutting-edge web experience, I'm ready to bring your vision to reality. Let's make it happen together.
                        </p>
                    </div>

                    {/* Social Handles */}
                    <div className="flex flex-col items-start gap-0 mt-2.5 md:mt-0">
                        {[
                            {
                                label: 'LinkedIn',
                                link: "https://www.linkedin.com/in/gautam-mehto/"
                            }, {
                                label: 'Github',
                                link: "https://github.com/GautamMehto"
                            }].map((social, idx) => (
                                <a key={idx} target='_blank' href={social.link} className="anim-social group flex items-center gap-4 w-fit overflow-hidden">
                                    <span className="text-2xl md:text-4xl font-bold uppercase tracking-tighter text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                                        {social.label}
                                    </span>
                                    <BsArrowRight className="text-brand opacity-0 -translate-x-[150px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-4xl" />
                                </a>
                            ))}
                    </div>
                </div>

                {/* Right Side: Contact Form */}
                <div className="w-full xl:w-1/2 xl:pl-10 mt-16 xl:mt-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-14 outline-none w-full max-w-3xl">
                        <div className="anim-form-item flex flex-col group">
                            <label className="text-lg uppercase tracking-widest text-text-secondary mb-4 group-focus-within:text-brand transition-colors">
                                01 / What's your name?
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                                className="bg-transparent border-b border-border-dark py-4 text-2xl font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50"
                            />
                        </div>

                        <div className="anim-form-item flex flex-col group">
                            <label className="text-lg uppercase tracking-widest text-text-secondary mb-4 group-focus-within:text-brand transition-colors">
                                02 / What's your email?
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                                className="bg-transparent border-b border-border-dark py-4 text-2xl font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50"
                            />
                        </div>

                        <div className="anim-form-item flex flex-col group">
                            <label className="text-lg uppercase tracking-widest text-text-secondary mb-4 group-focus-within:text-brand transition-colors">
                                03 / Tell me about your project
                            </label>
                            <textarea
                                rows="4"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Hello Gautam, I need help with..."
                                required
                                className="bg-transparent border-b border-border-dark py-4 text-2xl font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50 resize-none"
                            ></textarea>
                        </div>

                        <div className="anim-form-item mt-10 w-fit">
                            <HoverButton
                                label={isSubmitting ? "Sending..." : "Send Message"}
                                icon={BsArrowRight}
                                type="submit"
                                disabled={isSubmitting}
                            />

                        </div>
                    </form>
                </div>

            </div>
        </main>
    );
};

export default Contact;
