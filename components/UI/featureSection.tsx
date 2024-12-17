
import Image from 'next/image'
import { AnalyticsIcon } from './icons/AnalyticsIcon'
import { ForecastIcon } from './icons/ForecastIcon'
import { FutureIcon } from './icons/FutureIcon'

import ScrollingBanner from './base/scrolling-banner'


const logos = [
    {
        key: "logo-3",
        src: 't3',
    },
    {
        key: "logo-1",
        src: 't1',
    },
    {
        key: "logo-2",
        src: 't2',
    },

];


const features = [
    {
        name: 'Comprehensive Analytics',
        description:
            ' Analyze key indicators to understand market trends and dynamics.',
        icon: AnalyticsIcon,
    },
    {
        name: 'AI-Powered Forecasts',
        description: "Cutting-edge AI models deliver tomorrow's rate predictions.",
        icon: FutureIcon,
    },
    {
        name: 'Community Voting',
        description: 'Compete with fellow users to forecast exchange rates and see how your predictions stack up against AI.',
        icon: ForecastIcon,
    },
]

export default function FeatureSection() {
    return (
        <div className=" bg-black py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                    <div className="lg:ml-auto lg:pl-4 lg:pt-4">
                        <div className="lg:max-w-lg">
                            <h2 className="text-base font-semibold leading-7 text-text-active">Stay Ahead with</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-400 sm:text-4xl">Accurate, Real-Time Exchange Rate Insights</p>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Your ultimate tool for real-time exchange rate analysis and forecasting in the Iranian market.
                                Whether you're an investor, trader, or analyst, our platform provides up-to-the-minute data, essential indicators, and powerful predictions to help you make informed decisions.
                            </p>
                            <div className="mt-10 max-w-xl space-y-8 text-base  text-gray-600 ">
                                {features.map((feature) => (
                                    <div key={feature.name} className="flex justify-center items-start ">
                                        <div className='w-10 mr-2'>
                                            <div aria-hidden="true" className='w-10 h-10' >
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <div className="  font-semibold text-text-active">
                                            {feature.name} <span className=" text-gray-400"> {feature.description}</span>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <section className="mx-auto  max-w-6xl w-full lg:px-8  lg:pt-2 lg:order-first">
                        <ScrollingBanner  isVertical shouldPauseOnHover gap="20px" duration={20}>
                            {logos.map(({ key, src }) => (
                                <div key={key} className="flex items-center justify-center text-foreground ">
                                    <Image 
                                    alt={key} 
                                    src={`/images/${src}.webp`} 
                                    width={1080}
                                    height={1920}
                                    className="rounded-xl shadow-xl ring-1 ring-gray-400/10 "
                                    />
                                </div>
                            ))}
                        </ScrollingBanner>
                    </section>
                </div>
            </div>
        </div>
    )
}
