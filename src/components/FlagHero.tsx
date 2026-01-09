import { AshokaChakra } from "./AshokaChakra";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Vote, Shield, BarChart3, Eye } from "lucide-react";

export function FlagHero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Saffron Section */}
      <div className="flex-1 bg-saffron-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-8 flex items-center justify-between h-full relative z-10">
          <div className="max-w-xl animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Election Monitoring
              <br />
              <span className="text-2xl md:text-3xl font-normal opacity-90">& Integrity System</span>
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Ensuring transparent, fair, and secure elections for every citizen.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                size="lg"
                onClick={() => navigate('/verify')}
                className="bg-white text-saffron hover:bg-white/90 shadow-lg"
              >
                <Vote className="mr-2 h-5 w-5" />
                Verify & Vote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/education')}
                className="border-white text-white hover:bg-white/20"
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white animate-fade-in-up stagger-1">
              <Shield className="h-8 w-8 mb-2" />
              <p className="font-semibold">Secure</p>
              <p className="text-sm opacity-80">Hashed Aadhaar</p>
            </div>
          </div>
        </div>
      </div>

      {/* White Section with Chakra */}
      <div className="flex-1 bg-white relative flex items-center justify-center py-8">
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="flex flex-col gap-4 animate-fade-in-up stagger-2">
            <QuickStat icon={<Vote />} label="Total Votes" value="87,500" color="saffron" />
            <QuickStat icon={<Shield />} label="Integrity" value="98.7%" color="green" />
          </div>
        </div>

        <div className="relative z-10">
          <AshokaChakra size={380} interactive />
          <p className="text-center text-ashoka-blue font-medium mt-4 animate-fade-in-up">
            Click any spoke to explore
          </p>
        </div>

        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
          <div className="flex flex-col gap-4 animate-fade-in-up stagger-3">
            <QuickStat icon={<BarChart3 />} label="Turnout" value="58.3%" color="blue" />
            <QuickStat icon={<Eye />} label="Observers" value="1,250" color="saffron" />
          </div>
        </div>
      </div>

      {/* Green Section */}
      <div className="flex-1 bg-india-green-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-10 left-20 w-40 h-40 rounded-full bg-white/30 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white/20 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-8 h-full flex items-center relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
            <RoleCard 
              title="Citizen"
              description="Verify eligibility & cast your vote securely"
              icon={<Vote className="h-8 w-8" />}
              onClick={() => navigate('/verify')}
            />
            <RoleCard 
              title="Observer"
              description="Monitor polling activities & report anomalies"
              icon={<Eye className="h-8 w-8" />}
              onClick={() => navigate('/observer')}
            />
            <RoleCard 
              title="Analyst"
              description="Analyze data & generate election reports"
              icon={<BarChart3 className="h-8 w-8" />}
              onClick={() => navigate('/dashboard')}
            />
            <RoleCard 
              title="Admin"
              description="Manage users, roles & monitor activity"
              icon={<Shield className="h-8 w-8" />}
              onClick={() => navigate('/admin')}
            />
          </div>
        </div>
      </div>

      {/* Disclaimer Footer */}
      <div className="bg-ashoka-blue text-white py-3 px-4 text-center text-sm">
        <p className="opacity-90">
          ⚠️ This system is a prototype developed for academic and monitoring purposes only and does not replace or integrate with official government election or Aadhaar systems.
        </p>
      </div>
    </div>
  );
}

function QuickStat({ 
  icon, 
  label, 
  value, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string;
  color: 'saffron' | 'green' | 'blue';
}) {
  const colorClasses = {
    saffron: 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-saffron',
    green: 'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-india-green',
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-ashoka-blue',
  };

  return (
    <div className={`${colorClasses[color]} border rounded-xl p-4 shadow-soft min-w-[140px]`}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs font-medium opacity-70">{label}</span>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function RoleCard({ 
  title, 
  description, 
  icon, 
  onClick 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in-up"
    >
      <div className="mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-sm opacity-80">{description}</p>
    </button>
  );
}
