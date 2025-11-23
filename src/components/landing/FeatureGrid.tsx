'use client';

import { motion } from 'framer-motion';
import {
  FaShieldAlt,
  FaLock,
  FaFingerprint,
  FaNetworkWired,
} from 'react-icons/fa';

export const FeatureGrid = () => {
  const features = [
    {
      id: '01',
      title: 'ZERO_KNOWLEDGE',
      desc: 'Client-side encryption ensures your data remains yours. No backdoors.',
      icon: <FaShieldAlt />,
    },
    {
      id: '02',
      title: 'SESSION_GUARD',
      desc: 'Auto-rotating tokens with device fingerprinting and IP locking.',
      icon: <FaLock />,
    },
    {
      id: '03',
      title: 'BIOMETRIC_CORE',
      desc: 'WebAuthn support for hardware key and face ID authentication.',
      icon: <FaFingerprint />,
    },
    {
      id: '04',
      title: 'EDGE_NETWORK',
      desc: 'Global distribution for sub-millisecond latency verification.',
      icon: <FaNetworkWired />,
    },
  ];

  return (
    <section className="py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4">
          <h2 className="text-4xl md:text-6xl font-black uppercase">
            System<span className="text-cyan-500">_Modules</span>
          </h2>
          <span className="hidden md:block text-gray-500 font-mono">
            [INDEX: 01-04]
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`group relative p-8 border border-white/10 bg-[#111] hover:bg-[#161616] transition-colors ${
                index === 0 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <div className="absolute top-4 right-4 text-xs font-mono text-gray-600 group-hover:text-cyan-500 transition-colors">
                {feature.id}
              </div>
              <div className="text-4xl text-gray-400 mb-6 group-hover:text-white transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400">
                {feature.desc}
              </p>
              {/* Corner Accents */}
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-cyan-500 transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-cyan-500 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
