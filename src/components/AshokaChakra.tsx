import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { chakraOptions } from "@/lib/mockData";
import {
  CheckCircle, Calendar, Scale, BookOpen, MapPin, Eye, AlertTriangle,
  BarChart3, TrendingUp, GraduationCap, Users, ListChecks, PieChart,
  FileSearch, Accessibility, Radio, HelpCircle, Phone, Heart, Globe,
  Shield, FileText, MessageSquare, Scroll
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  CheckCircle, Calendar, Scale, BookOpen, MapPin, Eye, AlertTriangle,
  BarChart3, TrendingUp, GraduationCap, Users, ListChecks, PieChart,
  FileSearch, Accessibility, Radio, HelpCircle, Phone, Heart, Globe,
  Shield, FileText, MessageSquare, Scroll
};

interface AshokaChakraProps {
  size?: number;
  interactive?: boolean;
}

export function AshokaChakra({ size = 400, interactive = true }: AshokaChakraProps) {
  const navigate = useNavigate();
  const [hoveredSpoke, setHoveredSpoke] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(true);

  const center = size / 2;
  const outerRadius = size * 0.45;
  const innerRadius = size * 0.15;
  const hubRadius = size * 0.12;
  const spokeWidth = 3;

  const handleSpokeClick = (option: typeof chakraOptions[0]) => {
    if (interactive) {
      setIsSpinning(false);
      navigate(option.path);
    }
  };

  const handleMouseEnter = () => {
    if (interactive) setIsSpinning(false);
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setIsSpinning(true);
      setHoveredSpoke(null);
    }
  };

  return (
    <div 
      className="relative"
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className={`transition-transform duration-1000 ${isSpinning ? 'animate-spin-slow' : ''}`}
      >
        {/* Outer Circle */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="hsl(240, 100%, 25%)"
          strokeWidth="4"
        />

        {/* Inner Circle */}
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="hsl(240, 100%, 25%)"
          strokeWidth="3"
        />

        {/* 24 Spokes */}
        {chakraOptions.map((option, index) => {
          const angle = (index * 15 - 90) * (Math.PI / 180);
          const x1 = center + innerRadius * Math.cos(angle);
          const y1 = center + innerRadius * Math.sin(angle);
          const x2 = center + outerRadius * Math.cos(angle);
          const y2 = center + outerRadius * Math.sin(angle);

          const isHovered = hoveredSpoke === index;

          return (
            <g key={option.id}>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isHovered ? "hsl(220, 80%, 50%)" : "hsl(240, 100%, 25%)"}
                strokeWidth={isHovered ? spokeWidth * 2 : spokeWidth}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setHoveredSpoke(index)}
                onClick={() => handleSpokeClick(option)}
              />
              {/* Curved parts at inner end */}
              <path
                d={`M ${x1} ${y1} Q ${center + innerRadius * 0.7 * Math.cos(angle + 0.15)} ${center + innerRadius * 0.7 * Math.sin(angle + 0.15)} ${center + innerRadius * 0.5 * Math.cos(angle + 0.3)} ${center + innerRadius * 0.5 * Math.sin(angle + 0.3)}`}
                fill="none"
                stroke={isHovered ? "hsl(220, 80%, 50%)" : "hsl(240, 100%, 25%)"}
                strokeWidth={isHovered ? 2 : 1.5}
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* Hub */}
        <circle
          cx={center}
          cy={center}
          r={hubRadius}
          fill="hsl(240, 100%, 25%)"
          className="animate-pulse-glow"
        />
        <circle
          cx={center}
          cy={center}
          r={hubRadius * 0.6}
          fill="white"
        />
      </svg>

      {/* Interactive Icons around the chakra */}
      {interactive && chakraOptions.map((option, index) => {
        const angle = (index * 15 - 90) * (Math.PI / 180);
        const iconRadius = outerRadius + 35;
        const x = center + iconRadius * Math.cos(angle);
        const y = center + iconRadius * Math.sin(angle);
        const IconComponent = iconMap[option.icon];
        const isHovered = hoveredSpoke === index;

        return (
          <Tooltip key={option.id}>
            <TooltipTrigger asChild>
              <button
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full transition-all duration-300 ${
                  isHovered 
                    ? 'bg-ashoka-blue text-white scale-125 shadow-lg' 
                    : 'bg-white/90 text-ashoka-blue hover:bg-ashoka-blue hover:text-white shadow-md'
                }`}
                style={{ left: x, top: y }}
                onMouseEnter={() => setHoveredSpoke(index)}
                onMouseLeave={() => setHoveredSpoke(null)}
                onClick={() => handleSpokeClick(option)}
              >
                {IconComponent && <IconComponent className="w-4 h-4" />}
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="bg-ashoka-blue text-white border-none px-3 py-2"
            >
              <p className="font-semibold">{option.title}</p>
              <p className="text-xs opacity-90">{option.description}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
