'use client';

import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

export const LandingFooter = () => {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-4">
              CITADEL<span className="text-cyan-500">_SYS</span>
            </div>
            <p className="text-gray-600 text-xs max-w-xs">
              ADVANCED IDENTITY INFRASTRUCTURE FOR MODERN WEB APPLICATIONS.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-sm text-gray-500">
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold mb-2">MODULES</span>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                API Reference
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Status
              </a>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white font-bold mb-2">LEGAL</span>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-cyan-500 transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center text-xs text-gray-700">
          <div>© 2025 CITADEL SECURITY INC.</div>
          <div className="flex gap-4">
            <FaGithub className="text-lg hover:text-white transition-colors cursor-pointer" />
            <FaTwitter className="text-lg hover:text-white transition-colors cursor-pointer" />
            <FaDiscord className="text-lg hover:text-white transition-colors cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
};
