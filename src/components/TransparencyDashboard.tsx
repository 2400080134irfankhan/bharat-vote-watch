import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { electionData, regionData } from "@/lib/mockData";
import { 
  Vote, 
  Shield, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MapPin,
  BarChart3,
  CheckCircle,
  XCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const COLORS = ['#FF9933', '#138808', '#000080', '#4A90D9'];

const hourlyData = [
  { hour: '6AM', votes: 2500 },
  { hour: '8AM', votes: 8500 },
  { hour: '10AM', votes: 15000 },
  { hour: '12PM', votes: 22000 },
  { hour: '2PM', votes: 18500 },
  { hour: '4PM', votes: 14000 },
  { hour: '6PM', votes: 7000 },
];

const issueTypes = [
  { name: 'Machine Error', value: 15 },
  { name: 'Queue Issues', value: 12 },
  { name: 'Accessibility', value: 8 },
  { name: 'Other', value: 10 },
];

export function TransparencyDashboard() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ashoka-blue mb-2">Transparency Dashboard</h1>
          <p className="text-muted-foreground">Real-time election monitoring and integrity metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Total Votes Cast"
            value={electionData.totalVotesCast.toLocaleString()}
            subtitle={`of ${electionData.totalEligibleVoters.toLocaleString()} eligible`}
            icon={<Vote className="h-6 w-6" />}
            color="saffron"
          />
          <MetricCard
            title="Blocked Duplicates"
            value={electionData.blockedDuplicates.toString()}
            subtitle="Prevented from voting twice"
            icon={<Shield className="h-6 w-6" />}
            color="blue"
          />
          <MetricCard
            title="Issues Reported"
            value={electionData.issuesReported.toString()}
            subtitle="Under investigation"
            icon={<AlertTriangle className="h-6 w-6" />}
            color="orange"
          />
          <MetricCard
            title="Integrity Score"
            value={`${electionData.integrityScore}%`}
            subtitle="Election transparency index"
            icon={<CheckCircle className="h-6 w-6" />}
            color="green"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Voter Turnout Chart */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-ashoka-blue" />
                Hourly Voter Turnout
              </CardTitle>
              <CardDescription>Number of votes cast throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="hour" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }} 
                  />
                  <Bar dataKey="votes" fill="#000080" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Issue Distribution */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-saffron" />
                Issue Distribution
              </CardTitle>
              <CardDescription>Types of issues reported</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={issueTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {issueTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Regional Data */}
        <Card className="shadow-soft mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-india-green" />
              Region-wise Statistics
            </CardTitle>
            <CardDescription>Voting statistics by region</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Region</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Votes Cast</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Issues</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Turnout</th>
                  </tr>
                </thead>
                <tbody>
                  {regionData.map((region, index) => (
                    <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          {region.name}
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-medium">
                        {region.votes.toLocaleString()}
                      </td>
                      <td className="text-right py-4 px-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          region.issues > 10 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {region.issues > 10 ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                          {region.issues}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Progress value={region.turnout} className="flex-1 h-2" />
                          <span className="text-sm font-medium w-12">{region.turnout}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Observer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-soft card-saffron">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Active Observers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-saffron-dark">1,250</p>
              <p className="text-sm text-muted-foreground mt-1">Monitoring across all regions</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft card-green">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Reports Submitted
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-india-green-dark">3,847</p>
              <p className="text-sm text-muted-foreground mt-1">Verified observations</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft card-blue">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Credibility Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-ashoka-blue-light">96.2%</p>
              <p className="text-sm text-muted-foreground mt-1">Observer verification rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color 
}: { 
  title: string; 
  value: string; 
  subtitle: string; 
  icon: React.ReactNode;
  color: 'saffron' | 'green' | 'blue' | 'orange';
}) {
  const colorClasses = {
    saffron: 'from-orange-500 to-orange-600',
    green: 'from-green-600 to-green-700',
    blue: 'from-blue-800 to-blue-900',
    orange: 'from-amber-500 to-amber-600',
  };

  return (
    <Card className="shadow-soft overflow-hidden">
      <div className={`h-1.5 bg-gradient-to-r ${colorClasses[color]}`} />
      <CardContent className="pt-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} text-white`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
