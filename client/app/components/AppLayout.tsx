import React from 'react'
import PageTitle from './PageTitle'

export default function AppLayout({title, children}: { title: string, children: React.ReactNode}) {
  return (
    <main className="h-full w-full flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 w-full h-full">
        <PageTitle title={title}/>
        <div className="h-full w-full flex-1 space-y-6 px-4">
          <div className="space-y-4">
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
