import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Eye, 
  Camera, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Upload,
  FileText,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Observation {
  id: string;
  type: 'normal' | 'concern' | 'critical';
  location: string;
  time: string;
  description: string;
  hasEvidence: boolean;
}

const mockObservations: Observation[] = [
  {
    id: "1",
    type: "normal",
    location: "Polling Station #127, Delhi",
    time: "10:30 AM",
    description: "Voting proceeding smoothly. Queue management is efficient.",
    hasEvidence: false
  },
  {
    id: "2",
    type: "concern",
    location: "Polling Station #089, Mumbai",
    time: "11:45 AM",
    description: "Long queues observed. Voters waiting for over 2 hours.",
    hasEvidence: true
  },
  {
    id: "3",
    type: "critical",
    location: "Polling Station #234, Chennai",
    time: "09:15 AM",
    description: "EVM malfunction reported. Technical team dispatched.",
    hasEvidence: true
  }
];

export function ObserverPanel() {
  const { toast } = useToast();
  const [observations, setObservations] = useState<Observation[]>(mockObservations);
  const [newObservation, setNewObservation] = useState({
    type: 'normal' as 'normal' | 'concern' | 'critical',
    location: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const observation: Observation = {
      id: Date.now().toString(),
      type: newObservation.type,
      location: newObservation.location,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      description: newObservation.description,
      hasEvidence: false
    };

    setObservations([observation, ...observations]);
    setNewObservation({ type: 'normal', location: '', description: '' });
    
    toast({
      title: "Observation Submitted",
      description: "Your observation has been recorded successfully.",
    });
  };

  const getTypeBadge = (type: Observation['type']) => {
    switch (type) {
      case 'normal':
        return <Badge className="bg-india-green/10 text-india-green border-india-green/20">Normal</Badge>;
      case 'concern':
        return <Badge className="bg-saffron/10 text-saffron border-saffron/20">Concern</Badge>;
      case 'critical':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
    }
  };

  const getTypeIcon = (type: Observation['type']) => {
    switch (type) {
      case 'normal':
        return <CheckCircle className="h-5 w-5 text-india-green" />;
      case 'concern':
        return <AlertTriangle className="h-5 w-5 text-saffron" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-xl bg-ashoka-blue text-white">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-ashoka-blue">Observer Panel</h1>
            <p className="text-muted-foreground">Monitor and report polling activities</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submit Observation Form */}
          <Card className="lg:col-span-1 shadow-soft h-fit">
            <CardHeader className="border-b bg-muted/50">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Submit Observation
              </CardTitle>
              <CardDescription>Report your findings from the polling station</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Observation Type</label>
                  <div className="flex gap-2">
                    {(['normal', 'concern', 'critical'] as const).map((type) => (
                      <Button
                        key={type}
                        type="button"
                        size="sm"
                        variant={newObservation.type === type ? 'default' : 'outline'}
                        className={newObservation.type === type ? 
                          type === 'normal' ? 'bg-india-green hover:bg-india-green-light' :
                          type === 'concern' ? 'bg-saffron hover:bg-saffron-light' :
                          'bg-destructive hover:bg-destructive/90' : ''
                        }
                        onClick={() => setNewObservation({...newObservation, type})}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Polling Station ID & Location"
                      className="pl-10"
                      value={newObservation.location}
                      onChange={(e) => setNewObservation({...newObservation, location: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe your observation in detail..."
                    rows={4}
                    value={newObservation.description}
                    onChange={(e) => setNewObservation({...newObservation, description: e.target.value})}
                    required
                  />
                </div>

                <Button type="button" variant="outline" className="w-full gap-2">
                  <Camera className="h-4 w-4" />
                  Attach Evidence (Photo/Video)
                </Button>

                <Button type="submit" className="w-full bg-ashoka-blue hover:bg-ashoka-blue-light gap-2">
                  <Send className="h-4 w-4" />
                  Submit Observation
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Observations List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent Observations</h2>
              <Badge variant="secondary">{observations.length} reports</Badge>
            </div>

            {observations.map((obs) => (
              <Card key={obs.id} className="shadow-soft animate-fade-in-up">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getTypeIcon(obs.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTypeBadge(obs.type)}
                        {obs.hasEvidence && (
                          <Badge variant="outline" className="gap-1">
                            <Upload className="h-3 w-3" />
                            Evidence
                          </Badge>
                        )}
                      </div>
                      <p className="text-foreground mb-2">{obs.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {obs.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {obs.time}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {observations.length === 0 && (
              <Alert>
                <Eye className="h-4 w-4" />
                <AlertDescription>
                  No observations submitted yet. Start monitoring and submit your first report.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
