import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function Alert() {
  return (
    <div className="rounded-md bg-yellow-50 p-4 mt-5">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div className="mt-2 text-xs text-yellow-700">
            <p>
            The new forecast for the next day will be calculated and updated after 12 PM Tehran time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}