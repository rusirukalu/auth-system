'use client';

import { FaCode } from 'react-icons/fa';
import { SiMongodb, SiNextdotjs, SiTypescript } from 'react-icons/si';

export const ArchitectureSection = () => {
  return (
    <section className="py-32 bg-[#050505] border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-black mb-8 uppercase">
              Core<span className="text-cyan-500">_Architecture</span>
            </h2>
            <div className="space-y-6 font-mono text-sm">
              <div className="flex items-center gap-4 p-4 border border-white/10 bg-black">
                <SiNextdotjs className="text-2xl" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>NEXT.JS</span>
                    <span className="text-green-500">STABLE</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800">
                    <div className="w-full h-full bg-white" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-white/10 bg-black">
                <SiMongodb className="text-2xl text-green-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>MongoDB</span>
                    <span className="text-green-500">CONNECTED</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800">
                    <div className="w-full h-full bg-green-500" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 border border-white/10 bg-black">
                <SiTypescript className="text-2xl text-blue-500" />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span>TYPESCRIPT</span>
                    <span className="text-green-500">STRICT_MODE</span>
                  </div>
                  <div className="w-full h-1 bg-gray-800">
                    <div className="w-full h-full bg-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Abstract Schematic */}
            <div className="absolute inset-0 bg-cyan-500/5 blur-3xl" />
            <div className="relative border border-white/10 bg-black/50 p-8">
              <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                <span className="text-xs text-gray-500">FLOW_DIAGRAM</span>
                <FaCode className="text-gray-500" />
              </div>
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="px-4 py-2 border border-white/20 bg-white/5 text-xs">
                    CLIENT_REQUEST
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-px bg-white/20" />
                </div>
                <div className="flex justify-center">
                  <div className="px-4 py-2 border border-cyan-500/50 bg-cyan-500/10 text-cyan-500 text-xs">
                    MIDDLEWARE_AUTH
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="h-8 w-px bg-white/20" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="px-4 py-2 border border-white/20 bg-white/5 text-xs text-center">
                    API_ROUTE
                  </div>
                  <div className="px-4 py-2 border border-white/20 bg-white/5 text-xs text-center">
                    DB_QUERY
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
