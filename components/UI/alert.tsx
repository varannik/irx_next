import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

export default function Alert() {
  return (
    <div className="rounded-md bg-yellow-50 mt-2 p-2 ">
      <div className="flex  h-full">
        <div className="flex justify-center items-center">
          <ExclamationTriangleIcon aria-hidden="true" className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          {/* <h3 className="text-xs font-medium text-yellow-800">Attention needed</h3> */}
          <div className=" text-xs text-yellow-700">
            <p>
            The new forecast for the next day will be updated after 10 PM Tehran time.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}