import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, Users, TrendingUp, HeartHandshake } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

const metrics = [
  { id: 1, end: 50, suffix: '+', label: "Projects Delivered", icon: <Briefcase className="w-8 h-8" /> },
  { id: 2, end: 1000, suffix: '+', label: "Total Leads Generated", icon: <Users className="w-8 h-8" /> },
  { id: 3, end: 30, suffix: '%', label: "Average Conversion Lift", icon: <TrendingUp className="w-8 h-8" /> },
  { id: 4, end: 40, suffix: '+', label: "Happy Clients", icon: <HeartHandshake className="w-8 h-8" /> }
];

export function Metrics() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-gray-950 border-t border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((metric, index) => (
            <motion.div 
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                {metric.icon}
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading text-gray-900 dark:text-white mb-3 tracking-tight">
                <AnimatedCounter end={metric.end} suffix={metric.suffix} />
              </h3>
              <p className="text-sm md:text-base font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest max-w-[160px]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
