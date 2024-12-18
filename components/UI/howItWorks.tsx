

const stats = [
    { id: 1, value: '1. Sign Up', name: 'Create a free account to access real-time data and forecasting tools.' },
    { id: 2, value: '2. View Forecasts', name: "Check AI-driven and community-based predictions for tomorrow's exchange rates." },
    { id: 3, value: '3. Compete', name: 'Submit your prediction and see how you rank against AI and other users.' },
]

export default function HowItWorks() {
    return (
        <div className="flex justify-center items-center    flex-col bg-black py-24 sm:py-32 ">
            <div className="mb-20">
                <h1 className="text-4xl font-bold tracking-tight text-[#eaeaea] sm:text-6xl">
                    How It Works
                </h1>
            </div>
            <div className=" mx-auto max-w-7xl px-6 lg:px-8">

                <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">

                    {stats.map((stat) => (
                        <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                            <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                            <dd className="order-first text-2xl font-semibold tracking-tight text-white sm:text-3xl">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    )
}
