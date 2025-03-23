import { cn } from "@/lib/utils";
import { Brain, Zap, Shield, DivideIcon as LucideIcon } from "lucide-react";
import type { LucideProps } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  Brain,
  Zap,
  Shield
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
  gradient?: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  gradient = "from-blue-500/20 via-blue-500/10 to-transparent",
  className
}: FeatureCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className={cn(
      "relative rounded-[20px] bg-[#1C1C1C] p-8 transition-all duration-300 hover:bg-[#242424] overflow-hidden group",
      className
    )}>
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative">
        <div className="mb-6 inline-flex items-center justify-center rounded-[12px] bg-[#2A2A2A] p-3 bg-gradient-to-br from-[#2A2A2A] to-[#1C1C1C]">
          {Icon && <Icon className="h-6 w-6" />}
        </div>
        <h3 className="mb-3 text-xl font-semibold text-white">
          {title}
        </h3>
        <p className="text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}