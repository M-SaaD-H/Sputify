import React, { useId } from 'react';

const Input = React.forwardRef(({
  type = 'text',
  label,
  className = '',
  ...props
}, ref) => {
  const id = useId();

  return (
    <div className='w-full flex flex-col gap-1'>
      {
        label && <label className='inline-block ml-4' htmlFor={id}>{label}</label>
      }
      <input
        type={type}
        className={`py-4 px-4 bg-zinc-800 focus:bg-zinc-900 outline-none rounded-md ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  )
})

export default Input
