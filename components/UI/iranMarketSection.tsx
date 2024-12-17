import useHeaderDrawerStore from '@/stores/useHeaderDrawerStore'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { Button } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

const benefits = [
    'Competitive salaries',
    'Flexible work hours',
    '30 days of paid vacation',
    'Annual team retreats',
    'Benefits for you and your family',
    'A great work environment',
]

export default function IranMarketSection() {
    const { openHeader, setHeaderOpen } = useHeaderDrawerStore()


    return (
        <div className="bg-black py-24 sm:py-32">
            <div className="relative isolate">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mx-auto flex max-w-2xl flex-col gap-16 bg-white/5 px-6 py-16 ring-1 ring-white/10 sm:rounded-3xl sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
                        <Image
                            width={1920}
                            height={1080}
                            alt=""
                            src="/images/Tehran.webp"
                            className="h-96 w-full flex-none rounded-2xl object-cover shadow-xl lg:aspect-square lg:h-auto lg:max-w-sm"
                        />
                        <div className="w-full flex-auto">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Stay Ahead of Tehran's Volatile Market</h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                                Given the region's geopolitical complexities, this market experiences sharp fluctuations influenced by regional events and global tensions. As a largely isolated economy, forecasting trends and analyzing movements can be exceptionally challenging. Our platform helps you track these shifts instantly, offering the tools and insights you need to navigate and make confident decisions in this ever-evolving financial landscape.
                            </p>

                            <div className="mt-10 flex">
                                <Link href="/forecast">
                                    <Button onClick={() => setHeaderOpen(true)} color="primary" variant="bordered">
                                        Explore the Forecast
                                    </Button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-16 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                        }}
                        className="aspect-[1318/752] w-[82.375rem] flex-none bg-gradient-to-r from-[#80caff] to-sky-900 opacity-25"
                    />
                </div>
            </div>
        </div>
    )
}
