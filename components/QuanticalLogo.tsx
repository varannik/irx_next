import clsx from 'clsx'


export function Logo({
  className,
  invert = true,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  const defClassName = "stroke-miterlimit-10 stroke-2"
  return (
    <svg
      viewBox="0 0 130 32"
      aria-hidden="true"
      className={clsx(className)} 
      {...props}
    >
      <circle className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} cx="12.78" cy="14.68" r="6.42" />


      <path className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} d="M22.72,16c-.07,6.65,10.04,6.91,10.08.04" />


      <path className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} d="M22.72,8.32c0-.61,0,2.73,0,7.74" />

      <path className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} d="M32.8,8.36c0-.6,0,2.71,0,7.7" />

      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="41.54" y1="8.18" x2="36.49" y2="21.09" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="46.61" y1="21.08" x2="41.57" y2="8.17" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="107.59" y1="8.18" x2="102.54" y2="21.09" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,

        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="112.66" y1="21.12" x2="107.62" y2="8.21" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        'transition-all duration-300',
        filled ? 'opacity-0' :'opacity-100' ,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="48.99" y1="14.5" x2="55.35" y2="8.3" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        'transition-all duration-300',
        filled ? 'opacity-0' :'opacity-100' ,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="55.39" y1="8.29" x2="57.93" y2="21.06" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        'transition-all duration-300',
        filled ? 'opacity-0' :'opacity-100' ,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="57.95" y1="21.1" x2="64.26" y2="14.6" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="66.79" y1="8.25" x2="76.86" y2="8.25" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="71.81" y1="21.07" x2="71.81" y2="8.26" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,

        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="82.34" y1="8.29" x2="82.34" y2="21.11" strokeLinecap="round"/>


      <path className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} d="M99.04,10.58c-1.17-1.41-2.92-2.32-4.89-2.32-3.51,0-6.35,2.86-6.35,6.39s2.85,6.4,6.35,6.4c1.98,0,3.74-.91,4.91-2.33" />


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="115.79" y1="8.25" x2="115.79" y2="21.03" strokeLinecap="round"/>


      <line className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="123.64" y1="21.08" x2="115.83" y2="21.07" strokeLinecap="round"/>


      {/* <ellipse className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} cx="49.03" cy="14.47" rx=".66" ry=".71" /> */}


      <ellipse className={clsx(
        defClassName,
        'transition-all duration-300',
        filled ? 'opacity-100' :'opacity-0' ,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} cx="49.03" cy="14.47" rx="1.12" ry="1.21" />


      <ellipse className={clsx(
        defClassName,
        'transition-all duration-300',
        filled ? 'opacity-100' :'opacity-0' ,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} cx="64.24" cy="14.54" rx="1.12" ry="1.21" />


      {/* <ellipse className={clsx(
        defClassName,
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} cx="64.42" cy="14.54" rx=".66" ry=".71" /> */}


      <line className={clsx(
        defClassName,
        'fill-none',
        invert ? 'stroke-white' : 'stroke-neutral-950',
      )} x1="12.78" y1="18.54" x2="12.78" y2="23.95" strokeLinecap="round"/>

    <path className={clsx(
            defClassName,
            'fill-none',
            'transition-all duration-300',
            filled ? 'opacity-100' :'opacity-0' ,
            invert ? 'stroke-white' : 'stroke-neutral-950',
          )} d="M48.5,15.21c12.27-24.8,4.55,22.96,15.62,0" />



    </svg>

  )
}



