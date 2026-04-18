import React, { lazy } from 'react'
// import AnimatedButton from '../components/common/AnimatedButton'
import { ArrowRight } from 'lucide-react'

const AnimatedButton = lazy(() => import('../components/common/AnimatedButton'))
const NotFound = () => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-text-primary bg-dark-bg">
            <h1 className="font-semibold md:text-9xl leading-none capitalize">404</h1>
            <h2 className="font-semibold md:text-5xl leading-none capitalize mb-4">Not Found</h2>
            <p className="text-xl md:text-4xl text-center md:text-right text-text-primary mb-4">
                The page you are looking for does not exist.
            </p>
            <div className="group flex justify-between items-center mb-10 text-text-primary">
                <AnimatedButton
                    label="Back To Home"
                    icon={ArrowRight}
                    path={"/"}
                />
            </div>
        </div>
    )
}

export default NotFound