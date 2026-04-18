import React, { useState, useEffect } from 'react';
import { BsBugFill, BsX } from 'react-icons/bs';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

export default function BugReportModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            toast.error("Please fill in all fields to report a bug.");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Submitting bug report...");

        const formData = {
            to_name: "Gautam Mehto",
            from_name: `"${name}"`,
            from_email: email,
            message: `[BUG REPORT] ${message}`,
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
                    toast.success("Bug report submitted successfully! Thank you.", { id: toastId });
                    setIsSubmitting(false);
                    setIsOpen(false);
                },
                (error) => {
                    console.error("Failed to submit bug report:", error);
                    toast.error("Failed to submit bug report. Please try again.", { id: toastId });
                    setIsSubmitting(false);
                }
            );
    };

    return (
        <>
            {/* Fixed Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className=" cursor-pointer fixed bottom-24 right-6 z-50 p-3 bg-brand text-dark-bg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                title="Report a Bug"
            >
                <BsBugFill size={22} className="relative z-10" />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    data-lenis-prevent="true"
                >
                    {/* Modal Container */}
                    <div className="relative w-full max-w-md bg-dark-bg border border-border-dark p-6 md:p-8 rounded-2xl shadow-2xl flex flex-col gap-6" data-lenis-prevent="true">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="cursor-pointer absolute top-4 right-4 text-text-secondary hover:text-brand transition-colors"
                            title="Close"
                        >
                            <BsX className="text-3xl" />
                        </button>

                        <div className="flex items-center gap-3">
                            <BsBugFill className="text-3xl text-brand" />
                            <h2 className="text-2xl font-semibold text-text-primary">Report a Bug</h2>
                        </div>

                        <p className="text-text-secondary text-sm">
                            Found something wrong? Let me know so I can fix it. Please provide as much detail as possible.
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="flex flex-col group">
                                <label className="text-xs uppercase tracking-widest text-text-secondary mb-2 group-focus-within:text-brand transition-colors">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    className="bg-transparent border-b border-border-dark py-2 text-lg font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50"
                                />
                            </div>

                            <div className="flex flex-col group">
                                <label className="text-xs uppercase tracking-widest text-text-secondary mb-2 group-focus-within:text-brand transition-colors">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                    className="bg-transparent border-b border-border-dark py-2 text-lg font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50"
                                />
                            </div>

                            <div className="flex flex-col group">
                                <label className="text-xs uppercase tracking-widest text-text-secondary mb-2 group-focus-within:text-brand transition-colors">
                                    Bug Details
                                </label>
                                <textarea
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="What went wrong? Steps to reproduce?"
                                    required
                                    className="bg-transparent border-b border-border-dark py-2 text-lg font-light text-text-primary focus:outline-none focus:border-brand transition-colors placeholder:text-border-dark/50 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-4 w-full py-3 bg-brand text-dark-bg font-semibold rounded-full hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
                                "
                            >
                                {isSubmitting ? "Submitting..." : "Submit Report"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
