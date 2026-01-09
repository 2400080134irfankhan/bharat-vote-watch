import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Scale, 
  ListChecks, 
  AlertTriangle,
  Users,
  Vote,
  Shield,
  BookOpen,
  CheckCircle
} from "lucide-react";

const educationTopics = [
  {
    id: "rights",
    title: "Your Voter Rights",
    icon: Scale,
    color: "saffron",
    content: [
      "Right to vote without any discrimination based on religion, race, caste, sex, or place of birth",
      "Right to a secret ballot - no one can see who you voted for",
      "Right to assistance if you have a disability",
      "Right to complain about electoral malpractices",
      "Right to information about candidates and their criminal records"
    ]
  },
  {
    id: "process",
    title: "Voting Process",
    icon: ListChecks,
    color: "blue",
    content: [
      "Carry your Voter ID or any approved identity document",
      "Go to your assigned polling station",
      "Get your finger marked with indelible ink",
      "Collect your ballot slip after verification",
      "Cast your vote using the Electronic Voting Machine (EVM)",
      "Deposit your slip in the VVPAT verification unit"
    ]
  },
  {
    id: "dos-donts",
    title: "Do's and Don'ts",
    icon: AlertTriangle,
    color: "green",
    content: [
      "DO arrive early to avoid long queues",
      "DO keep your ID documents ready",
      "DON'T carry mobile phones inside the voting booth",
      "DON'T share who you voted for inside the polling station",
      "DON'T try to influence other voters",
      "DO report any irregularities immediately"
    ]
  },
  {
    id: "first-time",
    title: "First-Time Voter Guide",
    icon: GraduationCap,
    color: "saffron",
    content: [
      "Register on the electoral roll when you turn 18",
      "Check your name in the voter list before election day",
      "Understand the candidates and their manifestos",
      "Your vote is your voice - use it wisely",
      "Participate in a healthy democracy",
      "Encourage others to vote as well"
    ]
  }
];

const faqs = [
  {
    question: "What documents are required for voting?",
    answer: "You need your Voter ID Card (EPIC) or any of the 11 alternative photo IDs approved by the Election Commission, such as Passport, Driving License, Aadhaar Card, PAN Card, etc."
  },
  {
    question: "What if my name is not on the voter list?",
    answer: "You can apply for inclusion in the electoral roll by submitting Form 6 online at the National Voter Service Portal or at your nearest Electoral Registration Office."
  },
  {
    question: "Can I vote if I'm out of my constituency?",
    answer: "Currently, you can only vote at your assigned polling station. However, postal ballot facilities are available for certain categories like service voters, election duty personnel, and senior citizens above 80 years."
  },
  {
    question: "What is NOTA?",
    answer: "NOTA stands for 'None of the Above'. It's an option on the EVM that allows you to record your dissent if you don't want to vote for any of the candidates."
  },
  {
    question: "How is my vote kept secret?",
    answer: "The EVM records only the total votes for each candidate, not who voted for whom. There's no way to link your identity to your vote once it's cast."
  }
];

export function VoterEducation() {
  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ashoka-blue/10 mb-4">
            <BookOpen className="h-8 w-8 text-ashoka-blue" />
          </div>
          <h1 className="text-3xl font-bold text-ashoka-blue mb-2">Voter Education Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Empowering citizens with knowledge about their voting rights and the electoral process
          </p>
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {educationTopics.map((topic) => {
            const Icon = topic.icon;
            const colorClasses = {
              saffron: 'border-t-saffron bg-gradient-to-br from-orange-50 to-white',
              green: 'border-t-india-green bg-gradient-to-br from-green-50 to-white',
              blue: 'border-t-ashoka-blue bg-gradient-to-br from-blue-50 to-white',
            };
            
            return (
              <Card 
                key={topic.id} 
                className={`shadow-soft border-t-4 ${colorClasses[topic.color as keyof typeof colorClasses]} animate-fade-in-up`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      topic.color === 'saffron' ? 'bg-saffron/10 text-saffron' :
                      topic.color === 'green' ? 'bg-india-green/10 text-india-green' :
                      'bg-ashoka-blue/10 text-ashoka-blue'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {topic.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {topic.content.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-1 text-india-green flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatCard icon={<Users />} value="950M+" label="Registered Voters" />
          <StatCard icon={<Vote />} value="1M+" label="Polling Stations" />
          <StatCard icon={<Shield />} value="100%" label="Secure Voting" />
          <StatCard icon={<Scale />} value="73" label="Years of Democracy" />
        </div>

        {/* FAQs */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-saffron" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>Common questions about the voting process</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:text-ashoka-blue">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-muted rounded-lg text-center">
          <Badge variant="outline" className="mb-2">Educational Content</Badge>
          <p className="text-sm text-muted-foreground">
            This information is provided for educational purposes. For official guidelines, 
            please visit the Election Commission of India website.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <Card className="shadow-soft text-center">
      <CardContent className="pt-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-ashoka-blue/10 text-ashoka-blue mb-2">
          {icon}
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
