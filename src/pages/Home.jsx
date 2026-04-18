import React, { lazy } from 'react';
// import Hero from '../components/sections/Hero';
// import AboutMeSection from '../components/sections/AboutMe';
// import SelectedWorks from '../components/sections/SelectedWorks';
// import ExperienceTable from '../components/sections/Experience-Table';
// import Approach from '../components/sections/Approach';
// import TechStack from '../components/sections/TechStack';
// import CharacterTraitsMarquee from '../components/sections/CharacterTraitsMarquee';

const Hero = lazy(() => import('../components/sections/Hero'));
const AboutMeSection = lazy(() => import('../components/sections/AboutMe'));
const SelectedWorks = lazy(() => import('../components/sections/SelectedWorks'));
const ExperienceTable = lazy(() => import('../components/sections/Experience-Table'));
const Approach = lazy(() => import('../components/sections/Approach'));
const TechStack = lazy(() => import('../components/sections/TechStack'));
const CharacterTraitsMarquee = lazy(() => import('../components/sections/CharacterTraitsMarquee'));

const Home = () => {
    return (
        <main className="bg-dark-bg">
            <Hero />
            <AboutMeSection />
            <SelectedWorks />
            <ExperienceTable />
            <TechStack otherClass={"mt-20!"} />
            <CharacterTraitsMarquee />
            <Approach />
        </main>
    );
};

export default Home;
