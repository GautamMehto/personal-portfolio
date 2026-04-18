import { lazy, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { WorkCard } from "./WorkCard";
import { WorksData } from "../../data";
import { BsFillGridFill, BsList } from "react-icons/bs";
// import FlowingMenu from "./FlowingMenu";

const FlowingMenu = lazy(() => import("./FlowingMenu"));

const Tabs = [
  { label: "All", value: "all" },
  { label: "Website", value: "website" },
  { label: "Design", value: "design" },
];

export default function WorksSection({ workgridRef }) {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // grid | list

  const containerRef = useRef(null);

  // Filter logic
  const filtered = useMemo(() => {
    if (activeTab === "all") return WorksData;

    return WorksData.filter((w) => w.category?.[activeTab]);
  }, [activeTab]);

  // Animate cards when filtered
  useEffect(() => {
    const cards = gsap.utils.toArray(".work-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      },
    );
  }, [filtered, viewMode]);

  // Animate layout switch
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
  }, [viewMode]);

  return (
    <div
      ref={workgridRef}
      className="relative mt-10 z-10 bg-transparent text-text-primary"
    >
      {/* Tabs + View Toggle */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-3 mb-14">
        {/* Tabs */}
        <div className="flex gap-3">
          {Tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-5 py-2 rounded-full text-sm transition-all
              ${activeTab === tab.value
                  ? "bg-text-primary text-dark-bg"
                  : "bg-dark-surface text-text-secondary hover:bg-text-primary hover:text-dark-bg font-semibold"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-3">
          <button
            onClick={() => setViewMode("list")}
            className={`border p-3 transition cursor-pointer rounded-full ${viewMode === "list"
              ? "bg-text-primary text-dark-bg border-text-primary"
              : "border-text-primary text-text-primary"
              }`}
          >
            <BsList size={20} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`border p-3 transition cursor-pointer rounded-full ${viewMode === "grid"
              ? "bg-text-primary text-dark-bg border-text-primary"
              : "border-text-primary text-text-primary"
              }`}
          >
            <BsFillGridFill size={20} />
          </button>
        </div>
      </div>

      {/* Dynamic Layout */}
      <div ref={containerRef} className="relative w-full">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((work) => (
              <WorkCard key={work.title} work={work} />
            ))}
          </div>
        ) : (
          <div className="w-full relative">
            <FlowingMenu
              items={filtered.map((work) => ({
                link: `/work/${work.title}`,
                title: work.title,
                image: work.thumbnailImage,
              }))}
              speed={14}
              textColor="text-text-primary"
              bgColor="bg-transparent"
              marqueeBgColor="bg-text-primary"
              marqueeTextColor="text-dark-bg"
              borderColor="border-text-primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}
