import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  Users, 
  Vote,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Settings,
  Activity,
  Lock
} from "lucide-react";
import { mockUsers, electionData, votedAadhaar, voteRecords } from "@/lib/mockData";
import { Database, PieChart } from "lucide-react";

interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
}

const mockAuditLogs: AuditLog[] = [
  { id: "1", action: "Duplicate vote attempt blocked", user: "System", timestamp: "2024-01-15 14:32:15", type: "warning" },
  { id: "2", action: "Election phase changed to LIVE", user: "Admin User", timestamp: "2024-01-15 08:00:00", type: "info" },
  { id: "3", action: "New observer account created", user: "Admin User", timestamp: "2024-01-14 16:45:22", type: "success" },
  { id: "4", action: "Invalid Aadhaar format detected", user: "System", timestamp: "2024-01-15 11:23:45", type: "error" },
  { id: "5", action: "Voter eligibility verified", user: "System", timestamp: "2024-01-15 12:15:30", type: "success" },
  { id: "6", action: "Report #127 marked as resolved", user: "Observer User", timestamp: "2024-01-15 13:20:00", type: "info" },
];

const duplicateAttempts = [
  { aadhaarHash: "a1b2c3d4...e5f6", attempts: 3, lastAttempt: "2024-01-15 14:32:15", blocked: true },
  { aadhaarHash: "g7h8i9j0...k1l2", attempts: 2, lastAttempt: "2024-01-15 11:45:30", blocked: true },
  { aadhaarHash: "m3n4o5p6...q7r8", attempts: 1, lastAttempt: "2024-01-15 09:20:00", blocked: true },
];

export function AdminPanel() {
  const [electionPhase, setElectionPhase] = useState<'pre' | 'live' | 'post'>('live');

  const getLogTypeIcon = (type: AuditLog['type']) => {
    switch (type) {
      case 'info': return <Activity className="h-4 w-4 text-ashoka-blue" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-saffron" />;
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-india-green" />;
    }
  };

  const getLogTypeBadge = (type: AuditLog['type']) => {
    const styles = {
      info: 'bg-blue-100 text-blue-700',
      warning: 'bg-orange-100 text-orange-700',
      error: 'bg-red-100 text-red-700',
      success: 'bg-green-100 text-green-700',
    };
    return <Badge className={styles[type]}>{type.toUpperCase()}</Badge>;
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-ashoka-blue text-white">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ashoka-blue">Admin Panel</h1>
            <p className="text-muted-foreground">Election management and monitoring</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">{mockUsers.length}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Votes</p>
                  <p className="text-2xl font-bold">{electionData.totalVotesCast.toLocaleString()}</p>
                </div>
                <Vote className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Blocked Duplicates</p>
                  <p className="text-2xl font-bold text-destructive">{electionData.blockedDuplicates}</p>
                </div>
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Election Phase</p>
                  <Badge className={
                    electionPhase === 'pre' ? 'bg-saffron text-white' :
                    electionPhase === 'live' ? 'bg-india-green text-white' :
                    'bg-ashoka-blue text-white'
                  }>
                    {electionPhase.toUpperCase()}
                  </Badge>
                </div>
                <Settings className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="votes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="votes">Votes Database</TabsTrigger>
            <TabsTrigger value="users">Users & Roles</TabsTrigger>
            <TabsTrigger value="duplicates">Duplicate Attempts</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Votes Database Tab */}
          <TabsContent value="votes">
            <div className="grid gap-6">
              {/* Vote Counts by Party */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-india-green" />
                    Vote Counts by Party
                  </CardTitle>
                  <CardDescription>Real-time vote distribution across parties</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {(() => {
                      const partyCounts: Record<string, number> = {};
                      voteRecords.forEach(record => {
                        partyCounts[record.party] = (partyCounts[record.party] || 0) + 1;
                      });
                      const parties = [
                        { id: "bjp", name: "BJP", color: "bg-orange-500" },
                        { id: "inc", name: "INC", color: "bg-blue-500" },
                        { id: "aap", name: "AAP", color: "bg-cyan-500" },
                        { id: "tmc", name: "TMC", color: "bg-green-600" },
                        { id: "sp", name: "SP", color: "bg-red-500" },
                        { id: "bsp", name: "BSP", color: "bg-blue-700" },
                        { id: "ncp", name: "NCP", color: "bg-indigo-500" },
                        { id: "cpim", name: "CPI(M)", color: "bg-red-700" },
                        { id: "dmk", name: "DMK", color: "bg-yellow-600" },
                        { id: "nota", name: "NOTA", color: "bg-gray-500" },
                      ];
                      return parties.map(party => (
                        <div key={party.id} className="p-4 rounded-lg bg-muted/50 text-center">
                          <div className={`w-8 h-8 rounded-full ${party.color} mx-auto mb-2`}></div>
                          <p className="font-semibold">{party.name}</p>
                          <p className="text-2xl font-bold">{partyCounts[party.id] || 0}</p>
                        </div>
                      ));
                    })()}
                  </div>
                  <div className="mt-4 p-4 bg-india-green/10 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Total Votes Cast</p>
                    <p className="text-3xl font-bold text-india-green">{voteRecords.length}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Voted Aadhaar Records */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-ashoka-blue" />
                    Voted Aadhaar Records
                  </CardTitle>
                  <CardDescription>Complete list of Aadhaar numbers that have cast votes (hashed for display)</CardDescription>
                </CardHeader>
                <CardContent>
                  {voteRecords.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Vote className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No votes cast yet</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4 font-semibold">#</th>
                            <th className="text-left py-3 px-4 font-semibold">Aadhaar Number</th>
                            <th className="text-left py-3 px-4 font-semibold">Hashed ID</th>
                            <th className="text-left py-3 px-4 font-semibold">Party Voted</th>
                            <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {voteRecords.map((record, index) => (
                            <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                              <td className="py-4 px-4 font-medium">{index + 1}</td>
                              <td className="py-4 px-4 font-mono text-sm">
                                {record.aadhaar.slice(0, 4)}****{record.aadhaar.slice(-4)}
                              </td>
                              <td className="py-4 px-4 font-mono text-sm text-muted-foreground">
                                {record.hashedAadhaar.slice(0, 8)}...
                              </td>
                              <td className="py-4 px-4">
                                <Badge className="bg-india-green/10 text-india-green uppercase">
                                  {record.party}
                                </Badge>
                              </td>
                              <td className="py-4 px-4 text-sm text-muted-foreground">
                                {record.timestamp}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Manage Users
                </CardTitle>
                <CardDescription>View and manage user accounts and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Name</th>
                        <th className="text-left py-3 px-4 font-semibold">Email</th>
                        <th className="text-left py-3 px-4 font-semibold">Role</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-right py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-4 px-4 font-medium">{user.name}</td>
                          <td className="py-4 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className="capitalize">{user.role}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Badge className="bg-india-green/10 text-india-green">Active</Badge>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <Button size="sm" variant="ghost">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Duplicates Tab */}
          <TabsContent value="duplicates">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-saffron" />
                  Blocked Duplicate Attempts
                </CardTitle>
                <CardDescription>Review attempted duplicate votes (hashed Aadhaar identifiers)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Hashed Aadhaar</th>
                        <th className="text-center py-3 px-4 font-semibold">Attempts</th>
                        <th className="text-left py-3 px-4 font-semibold">Last Attempt</th>
                        <th className="text-center py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {duplicateAttempts.map((attempt, index) => (
                        <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                          <td className="py-4 px-4 font-mono text-sm">{attempt.aadhaarHash}</td>
                          <td className="py-4 px-4 text-center">
                            <Badge variant="destructive">{attempt.attempts}</Badge>
                          </td>
                          <td className="py-4 px-4 text-muted-foreground text-sm">{attempt.lastAttempt}</td>
                          <td className="py-4 px-4 text-center">
                            <Badge className="bg-destructive/10 text-destructive gap-1">
                              <Lock className="h-3 w-3" />
                              Blocked
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Immutable Audit Logs
                </CardTitle>
                <CardDescription>Complete record of all system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAuditLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                    >
                      {getLogTypeIcon(log.type)}
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{log.action}</p>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {log.user}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {log.timestamp}
                          </span>
                        </div>
                      </div>
                      {getLogTypeBadge(log.type)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Election Settings
                </CardTitle>
                <CardDescription>Control election phases and system settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Election Phase Control</h3>
                  <div className="flex gap-3">
                    {(['pre', 'live', 'post'] as const).map((phase) => (
                      <Button
                        key={phase}
                        variant={electionPhase === phase ? 'default' : 'outline'}
                        onClick={() => setElectionPhase(phase)}
                        className={electionPhase === phase ? 
                          phase === 'pre' ? 'bg-saffron hover:bg-saffron-dark' :
                          phase === 'live' ? 'bg-india-green hover:bg-india-green-dark' :
                          'bg-ashoka-blue hover:bg-ashoka-blue-dark' : ''
                        }
                      >
                        {phase === 'pre' ? 'Pre-Election' : phase === 'live' ? 'Live Voting' : 'Post-Election'}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-6 space-y-4">
                  <h3 className="font-semibold">System Controls</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Enable Voter Registration</p>
                        <p className="text-sm text-muted-foreground">Allow new voter registrations</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Allow Observer Reports</p>
                        <p className="text-sm text-muted-foreground">Enable observer report submissions</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Show Real-time Results</p>
                        <p className="text-sm text-muted-foreground">Display live voting statistics</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
