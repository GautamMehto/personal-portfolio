import { useGSAP } from "@gsap/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Loader = ({ children }) => {
    const stairParentRef = useRef(null);
    const pageRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // Wait for DOM + assets
    useEffect(() => {
        const handleLoad = () => {
            setIsReady(true);
        };

        // If the page has already loaded, execute handleLoad immediately.
        if (document.readyState === "complete") {
            handleLoad();
        } else {
            window.addEventListener("load", handleLoad);
            
            // Fallback: If the load event doesn't fire within 3 seconds, force ready state
            // to prevent the infinite loading screen.
            const timeoutId = setTimeout(handleLoad, 3000);

            return () => {
                window.removeEventListener("load", handleLoad);
                clearTimeout(timeoutId);
            };
        }
    }, []);

    useGSAP(() => {
        if (!isReady) return;

        const tl = gsap.timeline({
            onComplete: () => {
                // Allow scroll + refresh ScrollTrigger
                document.body.style.overflow = "auto";
                ScrollTrigger.refresh();
                window.dispatchEvent(new Event("loaderFinished"));
            },
        });

        document.body.style.overflow = "hidden";

        tl.set(stairParentRef.current, {
            display: "block"
        })
            .from(".stair", {
                height: 0,
                stagger: { amount: -0.2 },
            })
            .from(pageRef.current, {
                opacity: 0,
                duration: 0.2,
            })
            .to(".stair", {
                y: "-100%",
                stagger: { amount: -0.25 },
            })
            .to(stairParentRef.current, {
                display: "none",
            })
            .to('.stair', {
                y: '0%',
            });
    }, [isReady]);

    return (
        <>
            <div
                ref={stairParentRef}
                className="h-screen w-full fixed z-5000 top-0"
            >
                <div className="h-full w-full flex">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="stair h-full w-1/6 bg-text-primary border-r border-brand"
                        />
                    ))}
                </div>
            </div>

            <div ref={pageRef}>{children}</div>
        </>
    );
};

export default Loader;