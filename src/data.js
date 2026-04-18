import { img, vid } from "./utils/cloudinary"

import {
    FaHtml5,
    FaJs,
    FaReact,
    FaPhp,
    FaGitAlt,
    FaGithub,
    FaFigma,
    FaCss3,
} from "react-icons/fa";

import { TbBrandThreejs } from "react-icons/tb";

import {
    SiTypescript,
    SiTailwindcss,
    SiBootstrap,
    SiShadcnui,
    SiGreensock,
    SiFramer,
    SiReactrouter,
    SiLaravel,
    SiMysql,
    SiVercel,
    SiAdobe,
    SiNextdotjs,
    SiWix,
} from "react-icons/si";

import { HiOutlineLink } from "react-icons/hi";
import { DiMaterializecss } from "react-icons/di";

// navItems.js
export const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Works", link: "/works" },
    { name: "Contact", link: "/contact" },
];

// AboutMe.js
export const AboutMe = [
    {
        id: 1,
        description:
            "I am a Frontend focused developer with experience in building responsive, scalable web applications using Javascript, React.js, and Tailwind CSS. I have a strong foundation in UI/UX design with Figma and skilled at integrating REST APIs while collaborating with teams. I build reusable component-driven interfaces optimized for performance, accessibility, and cross-browser reliability.",
    },
];

// StatsData.js
export const StatsData = [

    {
        label: "Projects Built",
        description: "Developed responsive web apps, dashboards, and an e-learning platform using React.js.",
        value: "11+",
        className: "border-l border-brand"
    },
    {
        label: "Year Experience",
        description: "Hands-on experience through internship and full-time frontend development roles.",
        value: null,
        className: "border-l border-brand"
    },
    {
        label: "Technologies",
        description: "Worked with React.js, Tailwind CSS, JavaScript, REST APIs, and basic Laravel integration.",
        value: "10+",
        className: "border-l border-brand"
    },
    {
        label: "UI/UX Components",
        description: "Built reusable and responsive components from Figma designs with focus on UX.",
        value: "20+",
        className: "border-l md:border-r border-brand"
    }
];

// worksData.js
export const WorksData = [
    {
        id: 1,
        title: "Personal Portfolio",

        about: "I developed a modern developer portfolio designed for developers and designers to showcase their work, skills, and projects professionally across the internet. The portfolio focuses on clean UI/UX, responsive design, and performance, allowing recruiters to easily explore projects, technical skills, and experience. It includes reusable components, smooth animations, and structured content to present information in a clear and engaging way.",

        challenges: "One of the main challenges I faced during this project was working with Next.js and TypeScript, as I had primarily worked with React and JavaScript before. Initially, I struggled with Understanding TypeScript syntax and type definitions Handling props and state with proper typing Adapting to Next.js concepts like file- based routing and server - side behavior This created some confusion while writing and debugging code.",

        approach: "To overcome these challenges, I took a structured learning approach: Referred to official Next.js and TypeScript documentation Watched YouTube tutorials for practical implementation Practiced writing small components in TypeScript Gradually converted logic into typed code Instead of avoiding the problem, I focused on understanding the fundamentals and applying them step by step.",

        category: {
            website: true,
            design: true
        },
        feature: true,

        tech: ["React", "Tailwind CSS", "React Router DOM", "GSAP", "Figma"],

        thumbnailImage: img("personal-portfolio-hero"),

        video: vid("personal-portfolio-video"),
        images: [
            img("personal-portfolio-hero"),
            img("personal-portfolio-2"),
            img("personal-portfolio-3"),
            img("personal-portfolio-4")
        ],

        liveLink: "https://example.com/live",
        codeLink: "https://github.com/GautamMehto",
    },

    {
        id: 2,
        title: "iPanel (File Manager App)",

        about: "iPanel is a modern file manager dashboard designed to provide a clean and intuitive user experience similar to cloud storage platforms. The project focuses on building a scalable frontend architecture with authentication, protected routes, and responsive UI. It showcases my ability to create structured layouts, manage state efficiently, and design user-friendly interfaces.",

        challenges: "One of the main challenges in this project was working with Next.js and TypeScript, as my prior experience was mainly with React and JavaScript. I initially struggled with understanding TypeScript syntax and type definitions, handling props and state with strict typing, and adapting to Next.js concepts like file-based routing and server-side behavior. These issues made debugging and structuring components more complex.",

        approach: "To overcome these challenges, I followed a structured learning approach. I studied the official documentation of Next.js and TypeScript, watched practical tutorials, and practiced by building small components with proper typing. Gradually, I integrated TypeScript into the project and improved my understanding of typed logic, routing, and component structure. I focused on solving problems step by step instead of avoiding complexity.",

        category: {
            website: true,
            design: true
        },
        feature: true,

        tech: [
            "React",
            "Tailwind CSS",
            "REST API",
            "Inertia",
            "MySQL",
            "Figma"
        ],

        thumbnailImage: img("file-manager-hero"),

        video: vid("file-manager-video"),
        images: [
            img("file-manager-hero"),
            img("file-manager-2"),
            img("file-manager-3"),
            img("file-manager-4")
        ],


        liveLink: "https://example.com/live",
        codeLink: "https://github.com/GautamMehto"
    },

    {
        id: 3,
        title: "Jd & Co Digital (Service & Blog Website Design)",

        about: "This project involved designing a complete website for JD & Co Digital, focused on service offerings and blog content. Since there was no predefined brand direction or detailed brief, the goal was to create a visually appealing and structured design that communicates services clearly while supporting content-driven sections like blogs.",

        challenges: "The biggest challenge in this project was the lack of clear requirements and understanding of the client's expectations. I had limited information about the company, which made it difficult to define the design direction. Additionally, balancing service pages with blog content and working with a unique color combination added complexity. The initial design was not approved by the client, which required revisiting and rethinking the entire approach.",

        approach: "Due to time constraints, I skipped the wireframing stage and directly started designing in Figma based on research and intuition. I explored multiple service-based and blog-focused websites to understand layout patterns and user flow. After receiving feedback from the client, I carefully analyzed their expectations, refined the design structure, improved color usage, and adjusted visual hierarchy. Through multiple iterations and feedback loops, I aligned the design with the client’s vision.",

        category: {
            website: false,
            design: true
        },
        feature: true,

        tech: [
            "Figma",
            "UI/UX Design",
            "User Research",
            "Visual Design",
            "Prototyping"
        ],

        thumbnailImage: img("jd-co-design-hero"),

        video: null,
        images: [
            img("jd-co-design-hero"),
            img("jd-co-design-2"),
            img("jd-co-design-3"),
            img("jd-co-design-4")
        ],

        liveLink: "",
        codeLink: ""
    },

    {
        id: 4,
        title: "Dev Portfolio",
        about: "I developed a modern developer portfolio designed for developers and designers to showcase their work, skills, and projects professionally across the internet.The portfolio focuses on clean UI/UX, responsive design, and performance, allowing recruiters to easily explore projects, technical skills, and experience. It includes reusable components, smooth animations, and structured content to present information in a clear and engaging way.",

        challenges: "One of the main challenges I faced during this project was working with Next.js and TypeScript, as I had primarily worked with React and JavaScript before. Initially, I struggled with Understanding TypeScript syntax and type definitions Handling props and state with proper typing Adapting to Next.js concepts like file- based routing and server - side behavior This created some confusion while writing and debugging code.",

        approach: "To overcome these challenges, I took a structured learning approach: Referred to official Next.js and TypeScript documentation Watched YouTube tutorials for practical implementation Practiced writing small components in TypeScript Gradually converted logic into typed code Instead of avoiding the problem, I focused on understanding the fundamentals and applying them step by step.",

        category: {
            website: true,
            design: false
        },
        feature: true,

        tech: ["React", "Next", "ShadCN UI", "Tailwind CSS", "Framer Motion", "Three"],

        thumbnailImage: img("dev-portfolio-hero"),

        video: vid("dev-portfolio-video"),
        images: [
            img("dev-portfolio-hero"),
            img("dev-portfolio-2"),
            img("dev-portfolio-3"),
            img("dev-portfolio-4")
        ],

        liveLink: "https://example.com/live",
        codeLink: "https://github.com/GautamMehto",
    },

    {
        id: 5,
        title: "Call Forwarding SaaS Page (UI Design)",

        about: "This project is a high-converting SaaS landing page design for a call forwarding service, created entirely in Figma. The goal was to design a modern, clean, and conversion-focused interface that clearly communicates the product’s value. I focused on visual hierarchy, strong CTA placement, and user flow to ensure the design guides users effectively from awareness to action.",

        challenges: "The main challenge was designing a conversion-focused layout from scratch without directly copying competitors. I conducted extensive research on platforms like tollfreeforwarding and similar SaaS websites, but translating that research into a unique and effective design was difficult. I also struggled with maintaining visual balance, spacing consistency, and deciding the right content structure. Multiple iterations were required to refine sections like the hero, pricing, and feature blocks.",

        approach: "I followed a research-driven and iterative design process. First, I analyzed competitor websites to understand layout patterns, content flow, and conversion strategies. Then I created wireframes to structure the page before moving into high-fidelity design in Figma. I continuously refined typography, spacing, and color usage to improve clarity and visual appeal. I went through multiple redesigns, testing different layouts and hierarchies until I achieved a polished and user-friendly final output.",

        category: {
            website: false,
            design: true
        },
        feature: false,

        tech: [
            "Figma",
            "UI/UX Design",
            "Wireframing",
            "User Research",
            "Prototyping"
        ],

        thumbnailImage: img("call-forwarding-design-hero"),

        video: vid("call-forwarding-design-video"),
        images: [
            img("call-forwarding-design-hero"),
            img("call-forwarding-design-2"),
            img("call-forwarding-design-3"),
            img("call-forwarding-design-4")
        ],

        liveLink: null,
        codeLink: null
    },

    {
        id: 6,
        title: "Quick Accounting Services",

        about: "This project involved redesigning the QuickAccountingServices.com website to improve its visual structure, usability, and overall user experience. Working as part of a team, we focused on transforming the outdated design into a modern, clean, and responsive interface while maintaining the core business objectives of the website.",

        challenges: "The primary challenge was delivering the complete redesign within a tight deadline while coordinating with a team. Ensuring design consistency across multiple pages, maintaining responsiveness, and aligning with client expectations under time constraints required efficient collaboration and clear communication. Managing time effectively while handling multiple sections simultaneously was also a key challenge.",

        approach: "We divided the work into structured tasks across the team to ensure faster execution. I focused on frontend development and UI improvements, implementing the redesigned layouts using HTML, CSS, JavaScript, and Material CSS. We prioritized critical pages first, maintained consistent styling, and ensured responsive behavior across devices. Regular communication within the team helped us stay aligned and deliver the project on time.",

        category: "website",
        feature: false,

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Material CSS",
            "Responsive Design"
        ],

        thumbnailImage: img("quick-accounting-hero"),

        video: vid("quick-accounting-video"),
        images: [
            img("quick-accounting-hero"),
            img("quick-accounting-2"),
            img("quick-accounting-3"),
            img("quick-accounting-4")
        ],

        liveLink: "",
        codeLink: ""
    },

    {
        id: 7,
        title: "Website Redesign (Client Project)",

        about: "This project involved redesigning an existing website that lacked structure, visual clarity, and user experience. The client provided the current website, which appeared outdated and unorganized. My role was to completely rethink the design and improve the frontend experience while maintaining the core purpose of the website.",

        challenges: "The main challenge was understanding the actual requirements from an unstructured existing website. The design lacked hierarchy, consistency, and usability, making it difficult to identify what needed improvement. Additionally, translating client expectations into a clean and modern design required multiple discussions and careful interpretation. Ensuring the redesign felt fresh while still aligning with the client’s vision was also a key challenge.",

        approach: "I conducted a one-to-one session with the client to understand their goals, target audience, and expectations. Based on this, I restructured the entire layout, improved content hierarchy, and created a modern and clean UI design. I then implemented the design using HTML, CSS, and JavaScript, focusing on responsiveness and performance. The goal was to transform the website into a visually appealing and user-friendly experience.",

        category: {
            website: true,
            design: false,
        },
        feature: false,

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "UI/UX Design"
        ],

        thumbnailImage: img("interserver-hero"),

        video: vid("interserver-video"),
        images: [
            img("interserver-hero"),
            img("interserver-2"),
            img("interserver-3"),
            img("interserver-4")
        ],

        liveLink: "",
        codeLink: ""
    },

    {
        id: 8,
        title: "QB Serves (Multi-page Website Development)",

        about: "QB Serves is a multi-page website developed based on a design provided by the design team. My responsibility was to convert the given UI into a fully functional website using HTML, CSS, and JavaScript, while adding smooth and minimal animations to enhance user experience.",

        challenges: "The biggest challenge in this project was the extremely tight deadline. I was required to complete the entire website, including around 13 pages with full content, within just 2 days. Managing consistency across multiple pages, ensuring responsiveness, and implementing animations without affecting performance under such time pressure was highly challenging.",

        approach: "To handle the deadline efficiently, I focused on a structured and fast development workflow. I reused components and maintained consistent styling across pages to speed up development. I prioritized essential sections first, then added animations in a minimal and performance-friendly way. By working both smartly and consistently, I was able to complete all pages and deliver the project just before the deadline.",

        category: {
            website: true,
            design: false,
        },
        feature: false,

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Responsive Design",
            "Animations"
        ],

        thumbnailImage: img("qbserves-hero"),

        video: vid("qbserves-video"),
        images: [
            img("qbserves-hero"),
            img("qbserves-2"),
            img("qbserves-3"),
            img("qbserves-4")
        ],

        liveLink: "",
        codeLink: ""
    },

    {
        id: 8,
        title: "Ihost (Website Migration to React.js)",

        about: "Ihost is a migration project where I converted an existing website built with HTML and PHP into a modern frontend using React.js. The goal was to improve maintainability, scalability, and user experience by shifting to a component-based architecture.",

        challenges: "The main challenge was understanding and restructuring the existing HTML and PHP-based codebase into reusable React components. Managing dynamic content previously handled by PHP and adapting it into a frontend-driven approach required careful planning. Ensuring that the new React version maintained the same functionality while improving performance and structure was also a key challenge.",

        approach: "I began by analyzing the existing website structure and breaking it down into reusable components. I then rebuilt the UI using React.js and styled it with Materialize CSS for consistency and responsiveness. I ensured proper component hierarchy, state management, and clean code organization. The focus was on creating a scalable frontend while preserving the original functionality.",

        category: {
            website: true,
            design: false,
        },
        feature: false,

        tech: [
            "React.js",
            "Materialize CSS",
            "JavaScript",
            "HTML",
            "PHP (Legacy)",
            "Component-Based Architecture"
        ],

        thumbnailImage: img("ihost-hero"),

        video: vid("ihost-video"),
        images: [
            img("ihost-hero"),
            img("ihost-2"),
            img("ihost-3"),
            img("ihost-4")
        ],

        liveLink: "",
        codeLink: ""
    },
];

// TechIcons.js
export const TechIcons = {
    HTML: FaHtml5,
    CSS: FaCss3,
    JavaScript: FaJs,
    TypeScript: SiTypescript,
    React: FaReact,
    "Next": SiNextdotjs,
    "Three": TbBrandThreejs,

    "Tailwind CSS": SiTailwindcss,
    Bootstrap: SiBootstrap,
    "Materialize CSS": DiMaterializecss,
    "ShadCN UI": SiShadcnui,

    GSAP: SiGreensock,
    "Framer Motion": SiFramer,
    "React Router DOM": SiReactrouter,

    PHP: FaPhp,
    Laravel: SiLaravel,
    MySQL: SiMysql,
    "REST API": HiOutlineLink,

    Git: FaGitAlt,
    GitHub: FaGithub,
    Vercel: SiVercel,

    Figma: FaFigma,
    "Adobe XD": SiAdobe,
    "Wix Studio": SiWix,
};

// TechStackInfo.js
export const TechStackInfo = [
    {
        title: "Languages & Frameworks",
        items: ["HTML", "JavaScript", "TypeScript", "React",],
    },
    {
        title: "Styling",
        items: ["Tailwind CSS", "Bootstrap", "Materialize CSS", "ShadCN UI"],
    },
    {
        title: "Animation & Libraries",
        items: ["GSAP", "Framer Motion", "React Router DOM"],
    },
    {
        title: "Backend",
        items: ["PHP", "Laravel", "MySQL", "REST API"],
    },
    {
        title: "UI / UX",
        items: ["Figma", "Adobe XD", "Wix Studio"],
    },
    {
        title: "Other Tools",
        items: ["Git", "GitHub", "Vercel"],
    },
];

// ExperienceData.js
export const ExperienceData = [
    {
        id: 1,
        company: "iDevlive",
        role: "Frontend Developer & UI Designer",
        description:
            "Designing and maintaining scalable SaaS and web platforms. Converting Figma designs into reusable React components, integrating REST APIs with Laravel backends, and optimizing performance across devices.",
        date: "Mar 2025 — Mar 2026",
    },
    {
        id: 2,
        company: "iDevlive",
        role: "Frontend Developer Intern",
        description:
            "Developed responsive interfaces using React and Tailwind CSS. Implemented dynamic routing, improved UI consistency, and collaborated with senior developers to ship production-ready features.",
        date: "May 2024 — Mar 2025",
    },
    {
        id: 3,
        company: "Suvidha Foundation",
        role: "Web Developer Intern",
        description:
            "Built and enhanced website UI, ensured mobile responsiveness, and supported API-driven features while working in a collaborative development environment.",
        date: "Mar 2024 — Apr 2024",
    },
];

// ApproachData.js
export const ApproachData = [
    {
        title: "Discovery First",
        description: "I begin by <strong>defining clear goals </strong>, understanding your audience, and aligning with your brand voice to set a strong foundation.",
        type: "scroll-carousel",
        images: [
            "src/assets/images/iDevliveBlogPage.png",
            "src/assets/images/quickaccountingservices.com.png",
            "/src/assets/images/callForwading.png",
            "/src/assets/images/jd&co.png",
        ],
        span: "col-span-1 md:col-span-3",
    },
    {
        title: "Research",
        description: "Based on our discovery insights, we conduct thorough market and competitor analysis, exploring strengths and weaknesses we can take advantage of. This research informs our tailored design strategy for your project. ",
        type: "research",
        image: "src/assets/images/research.png",
        span: "col-span-1 md:col-span-2",
    },
    {
        title: "Mobile-First Design",
        description: "Every layout is designed for <strong>seamless mobile-first experiences </strong>, ensuring performance across all devices.",
        type: "floating-mobiles",
        images: [
            "src/assets/images/smallDevice1.png",
            "src/assets/images/smallDevice2.png",
        ],
        span: "col-span-1 md:col-span-2",
    },
    {
        title: "Pixel-Perfect Development",
        description: "Designed and developed with <strong> pixel-perfect precision </strong>, delivering high performance and easy updates.",
        type: "figma-cursors",
        image: "src/assets/images/laptopDevice.png",
        span: "col-span-1 md:col-span-3",
    },
    {
        title: "Future-Ready",
        description: "Websites designed to be <strong> scalable and future-ready </strong>, adapting as your business grows.",
        type: "clock",
        image: "/images/approach-future.png",
        span: "col-span-1 md:col-span-2",
    },
];