import { CheckIcon } from '@heroicons/react/20/solid'

const features = [
  {
    name: 'AI-Powered Forecasts',
    description: 'The model is re-trained weekly with the latest data, ensuring it adapts to market changes for accurate forecasts.',
  },
  {
    name: 'User Voting Predictions',
    description: 'Engage with a community of traders and analysts.',
  },
  { name: 'Maximum & Minimum Rates', description: 'Identify the highest and lowest rates within your chosen timeframe.' },
  {
    name: 'Trends',
    description: 'Detect market direction to inform your trading decisions.',
  },
  {
    name: 'Moving Averages',
    description: 'Smooth out price fluctuations to spot underlying trends.',
  },
  { name: 'Bollinger Bands', description: 'Gauge market volatility and potential overbought or oversold conditions.' },
  { name: 'Relative Strength Index (RSI)', description: 'Measure momentum and potential reversal points.' },
  {
    name: 'Cheapest Day Analysis',
    description: 'Find the most cost-effective day of the week based on historical data.',
  },

]

export default function FeatureDetails() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-text-active">In-Depth Market Insights</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">Key Indicators Include</p>
            <p className="mt-6 text-base leading-7 text-gray-400">
            Our analytics section provides essential tools to track and understand exchange rate trends over your selected period.
            </p>
          </div>
          <dl className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-10 text-base leading-7 text-gray-500 sm:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-9">
                <dt className="font-semibold text-gray-300">
                  <CheckIcon aria-hidden="true" className="absolute left-0 top-1 h-5 w-5 text-text-active" />
                  {feature.name}
                </dt>
                <dd className="mt-2">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
