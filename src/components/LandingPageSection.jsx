// ...existing code...
import React from 'react'
import landingImg from '../assets/landingImg.png'

export const LandingPageSection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden -top-16">
      <img
        src={landingImg}
        alt="Landing"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 backdrop-blur-sm" />

      <div className="abc relative z-10 mx-auto max-w-7xl px-6 py-24 flex  lg:flex-row items-center justify-center  gap-8 h-full">
        <div className="text-white max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            Track and grow your investments
          </h1>

          <p className="text-sm sm:text-base text-gray-200 mb-6">
            Monitor portfolios, review transactions and make data-driven decisions — all in one place.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-md shadow-lg transition"
            >
              Get Started
            </a>
            
          </div> */}
        </div>

        {/* Optional preview card / stats on large screens */}
        <aside className="hidden lg:flex ml-auto w-80 flex-col gap-4 bg-white/10 p-5 rounded-lg shadow-lg backdrop-blur-sm">
          <div className="text-white text-sm">Portfolio snapshot</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-white">₹1,24,560</div>
              <div className="text-xs text-white/70">Total value</div>
            </div>
            <div className="text-green-400 font-semibold">+4.3%</div>
          </div>
          <div className="h-px bg-white/10" />
          <div className="text-xs text-white/80">Recent activity shows gains across your top holdings.</div>
        </aside>
      </div>
    </section>
  )
}
// ...existing code...