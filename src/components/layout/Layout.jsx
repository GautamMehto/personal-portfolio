import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import BugReportModal from '../common/BugReportModel'


const Layout = () => {
    return (
        <>
            <Navbar />
            <Toaster />
            <ScrollToTop />
            <BugReportModal />
            <Outlet />
            <Footer />
        </>
    )
}

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Reset window scroll on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};
export default Layout