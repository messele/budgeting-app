import React from 'react'

export default function PageTitle({title}:{title:string}) {
  return (
    <header className="flex flex-col items-center gap-9">
          <div className="max-w-[100vw] p-4 text-4xl">
            {title}
          </div>
        </header>
  )
}
