// Mock eligible voter database (Aadhaar numbers that are eligible to vote)
export const eligibleVoters: string[] = [
  "123456789012",
  "234567890123",
  "345678901234",
  "456789012345",
  "567890123456",
  "678901234567",
  "789012345678",
  "890123456789",
  "901234567890",
  "112233445566",
  "223344556677",
  "334455667788",
  "445566778899",
  "556677889900",
  "667788990011",
];

// Track which Aadhaar numbers have already voted (hashed in real scenario)
export const votedAadhaar: Set<string> = new Set();

// Mock election data
export const electionData = {
  totalEligibleVoters: 150000,
  totalVotesCast: 87500,
  blockedDuplicates: 234,
  issuesReported: 45,
  integrityScore: 98.7,
  turnoutPercentage: 58.3,
};

// Mock region-wise data
export const regionData = [
  { name: "Northern Region", votes: 25000, issues: 12, turnout: 62.5 },
  { name: "Southern Region", votes: 22000, issues: 8, turnout: 55.0 },
  { name: "Eastern Region", votes: 18000, issues: 15, turnout: 52.0 },
  { name: "Western Region", votes: 22500, issues: 10, turnout: 63.0 },
];

// 24 Ashoka Chakra options (civic election features) - all paths point to existing routes
export const chakraOptions = [
  { id: 1, title: "Vote Eligibility", description: "Check your voting eligibility status", icon: "CheckCircle", path: "/verify" },
  { id: 2, title: "Election Timeline", description: "View complete election schedule", icon: "Calendar", path: "/education#timeline" },
  { id: 3, title: "Voter Rights", description: "Know your rights as a voter", icon: "Scale", path: "/education#rights" },
  { id: 4, title: "Code of Conduct", description: "Election code and guidelines", icon: "BookOpen", path: "/education#conduct" },
  { id: 5, title: "Polling Stations", description: "Find your nearest polling station", icon: "MapPin", path: "/education#stations" },
  { id: 6, title: "Observer Reports", description: "View election observer findings", icon: "Eye", path: "/observer" },
  { id: 7, title: "Fraud Awareness", description: "Report and identify election fraud", icon: "AlertTriangle", path: "/observer#report" },
  { id: 8, title: "Transparency Index", description: "Real-time transparency metrics", icon: "BarChart3", path: "/dashboard" },
  { id: 9, title: "Turnout Statistics", description: "Live voter turnout data", icon: "TrendingUp", path: "/dashboard#turnout" },
  { id: 10, title: "Youth Guide", description: "First-time voter information", icon: "GraduationCap", path: "/education#youth" },
  { id: 11, title: "Candidate Info", description: "Learn about candidates", icon: "Users", path: "/education#candidates" },
  { id: 12, title: "Voting Process", description: "Step-by-step voting guide", icon: "ListChecks", path: "/education#process" },
  { id: 13, title: "Results Dashboard", description: "Live election results", icon: "PieChart", path: "/dashboard#results" },
  { id: 14, title: "Issue Tracker", description: "Track reported issues", icon: "FileSearch", path: "/dashboard#issues" },
  { id: 15, title: "Accessibility", description: "Accessible voting options", icon: "Accessibility", path: "/education#accessibility" },
  { id: 16, title: "Live Updates", description: "Real-time election news", icon: "Radio", path: "/dashboard#updates" },
  { id: 17, title: "FAQ", description: "Frequently asked questions", icon: "HelpCircle", path: "/education#faq" },
  { id: 18, title: "Contact EC", description: "Reach Election Commission", icon: "Phone", path: "/education#contact" },
  { id: 19, title: "Volunteer", description: "Become an election volunteer", icon: "Heart", path: "/education#volunteer" },
  { id: 20, title: "Languages", description: "Multi-language support", icon: "Globe", path: "/education#languages" },
  { id: 21, title: "Security Info", description: "Election security measures", icon: "Shield", path: "/admin" },
  { id: 22, title: "Audit Logs", description: "View public audit records", icon: "FileText", path: "/admin#audit" },
  { id: 23, title: "Feedback", description: "Submit your feedback", icon: "MessageSquare", path: "/observer#feedback" },
  { id: 24, title: "Constitution", description: "Democratic principles", icon: "Scroll", path: "/education#constitution" },
];

// User roles
export type UserRole = "admin" | "citizen" | "observer" | "analyst";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

// Mock current user (for demo purposes)
export const mockUsers: User[] = [
  { id: "1", name: "Admin User", role: "admin", email: "admin@election.gov.in" },
  { id: "2", name: "Citizen User", role: "citizen", email: "citizen@example.com" },
  { id: "3", name: "Observer User", role: "observer", email: "observer@ec.gov.in" },
  { id: "4", name: "Data Analyst", role: "analyst", email: "analyst@ec.gov.in" },
];

// Simple hash function for Aadhaar (for demo - use proper hashing in production)
export function hashAadhaar(aadhaar: string): string {
  let hash = 0;
  for (let i = 0; i < aadhaar.length; i++) {
    const char = aadhaar.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

// Validate Aadhaar format
export function isValidAadhaarFormat(aadhaar: string): boolean {
  return /^\d{12}$/.test(aadhaar);
}

// Check eligibility
export function checkEligibility(aadhaar: string): {
  isEligible: boolean;
  hasVoted: boolean;
  message: string;
} {
  if (!isValidAadhaarFormat(aadhaar)) {
    return {
      isEligible: false,
      hasVoted: false,
      message: "Invalid Aadhaar format. Please enter a 12-digit number.",
    };
  }

  const hashedAadhaar = hashAadhaar(aadhaar);

  if (votedAadhaar.has(hashedAadhaar)) {
    return {
      isEligible: true,
      hasVoted: true,
      message: "This Aadhaar number has already been used to vote.",
    };
  }

  if (!eligibleVoters.includes(aadhaar)) {
    return {
      isEligible: false,
      hasVoted: false,
      message: "Aadhaar not found in voter database.",
    };
  }

  return {
    isEligible: true,
    hasVoted: false,
    message: "You are eligible to vote. Please proceed.",
  };
}

// Record vote
export function recordVote(aadhaar: string): boolean {
  const hashedAadhaar = hashAadhaar(aadhaar);
  if (votedAadhaar.has(hashedAadhaar)) {
    return false;
  }
  votedAadhaar.add(hashedAadhaar);
  return true;
}
