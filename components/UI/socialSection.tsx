import { LinkedinIcon } from "./icons/Linkedin"

const navigation = [
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/company/quanticallimited',
      icon: LinkedinIcon
    },

  ]
  
  export default function SocialSection() {
    return (
      <footer className="bg-black">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <div aria-hidden="true" className="h-6 w-6 stroke-gray-400 bg-slate-500" >{item.icon}</div>
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2022 QUANTICAL LIMITED, Inc. All rights reserved. <a className="italic text-gray-400" href="https://find-and-update.company-information.service.gov.uk/company/14036644">Certification</a>
            </p>
          </div>
        </div>
      </footer>
    )
  }
  