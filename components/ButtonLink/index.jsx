import Link from 'next/link';
import React from 'react';

export default function ButtonLink({href ,title}) {
  return (
    <Link alt="link" href={href} 
    className="
    h-10
    px-2
    text-base
    bg-optionB-main border-0 
    hover:bg-opacity-75
    rounded
    justify-center
    flex
    items-center
    text-gray-100
    hover:text-white
    hover:no-underline
    ">
      {title}
    </Link>
  )
}

