import { motion } from 'motion/react';
import { Skill } from '../types';

interface SkillBarProps {
  skill: Skill;
  index: number;
}

export default function SkillBar({ skill, index }: SkillBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-xs font-medium uppercase tracking-wider">
        <span className="text-neutral-800 dark:text-neutral-200 font-display">{skill.name}</span>
        <span className="text-neutral-500 dark:text-white/60 font-mono">{skill.progress}%</span>
      </div>
      <div className="w-full h-1 bg-neutral-200 dark:bg-white/10 rounded-none overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.progress}%` }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeOut' }}
          className="h-full bg-black dark:bg-white rounded-none"
        />
      </div>
    </div>
  );
}
