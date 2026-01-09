import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  checkEligibility, 
  recordVote, 
  isValidAadhaarFormat 
} from "@/lib/mockData";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Vote,
  Shield,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

type VerificationStep = "input" | "verifying" | "result" | "voting" | "success";

interface VerificationResult {
  isEligible: boolean;
  hasVoted: boolean;
  message: string;
}

export function AadhaarVerification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aadhaar, setAadhaar] = useState("");
  const [step, setStep] = useState<VerificationStep>("input");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [consent, setConsent] = useState(false);

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(value);
  };

  const handleVerify = async () => {
    if (!consent) {
      toast({
        title: "Consent Required",
        description: "Please accept the consent checkbox to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidAadhaarFormat(aadhaar)) {
      toast({
        title: "Invalid Format",
        description: "Please enter a valid 12-digit Aadhaar number.",
        variant: "destructive",
      });
      return;
    }

    setStep("verifying");
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const verificationResult = checkEligibility(aadhaar);
    setResult(verificationResult);
    setStep("result");
  };

  const handleVote = async () => {
    setStep("voting");
    
    // Simulate voting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const voteRecorded = recordVote(aadhaar);
    
    if (voteRecorded) {
      setStep("success");
      toast({
        title: "Vote Recorded Successfully!",
        description: "Thank you for participating in the democratic process.",
      });
    } else {
      toast({
        title: "Vote Failed",
        description: "Unable to record your vote. Please try again.",
        variant: "destructive",
      });
      setStep("result");
    }
  };

  const handleCancel = () => {
    setAadhaar("");
    setStep("input");
    setResult(null);
    setConsent(false);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto max-w-2xl">
        <Button 
          variant="ghost" 
          onClick={handleGoHome}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <Card className="shadow-medium border-2 animate-scale-in">
          <CardHeader className="text-center border-b bg-gradient-to-r from-saffron/10 via-white to-india-green/10">
            <div className="mx-auto w-16 h-16 rounded-full bg-ashoka-blue flex items-center justify-center mb-4">
              <Vote className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-ashoka-blue">Verify & Vote</CardTitle>
            <CardDescription>
              Use your Aadhaar to verify eligibility and cast your vote
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {step === "input" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Enter Aadhaar Number
                  </label>
                  <Input
                    type="text"
                    placeholder="XXXX XXXX XXXX"
                    value={aadhaar.replace(/(\d{4})(?=\d)/g, "$1 ")}
                    onChange={handleAadhaarChange}
                    className="text-center text-xl tracking-widest font-mono h-14"
                    maxLength={14}
                  />
                  <p className="text-xs text-muted-foreground text-center">
                    Enter your 12-digit Aadhaar number
                  </p>
                </div>

                <Alert className="bg-blue-50 border-blue-200">
                  <Shield className="h-4 w-4 text-ashoka-blue" />
                  <AlertTitle className="text-ashoka-blue">Privacy Notice</AlertTitle>
                  <AlertDescription className="text-sm">
                    Aadhaar is used only to verify eligibility and prevent duplicate voting. 
                    No personal data is stored. Only hashed identifiers are saved.
                  </AlertDescription>
                </Alert>

                <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-ashoka-blue"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    I consent to the use of my Aadhaar number solely for eligibility 
                    verification and duplicate prevention. I understand that no personal 
                    data will be stored.
                  </label>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleVerify}
                    disabled={aadhaar.length !== 12 || !consent}
                    className="flex-1 bg-ashoka-blue hover:bg-ashoka-blue-light h-12"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Verify & Proceed
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-12"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {step === "verifying" && (
              <div className="py-12 text-center animate-fade-in-up">
                <Loader2 className="h-16 w-16 animate-spin text-ashoka-blue mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Verifying Aadhaar...</p>
                <p className="text-sm text-muted-foreground">Please wait while we check your eligibility</p>
              </div>
            )}

            {step === "result" && result && (
              <div className="space-y-6 animate-fade-in-up">
                <Alert
                  className={
                    result.isEligible && !result.hasVoted
                      ? "bg-green-50 border-green-300"
                      : result.hasVoted
                      ? "bg-orange-50 border-orange-300"
                      : "bg-red-50 border-red-300"
                  }
                >
                  {result.isEligible && !result.hasVoted ? (
                    <CheckCircle className="h-5 w-5 text-india-green" />
                  ) : result.hasVoted ? (
                    <AlertTriangle className="h-5 w-5 text-saffron" />
                  ) : (
                    <XCircle className="h-5 w-5 text-destructive" />
                  )}
                  <AlertTitle className={
                    result.isEligible && !result.hasVoted
                      ? "text-india-green"
                      : result.hasVoted
                      ? "text-saffron-dark"
                      : "text-destructive"
                  }>
                    {result.isEligible && !result.hasVoted
                      ? "Eligible to Vote"
                      : result.hasVoted
                      ? "Already Voted"
                      : "Not Eligible"}
                  </AlertTitle>
                  <AlertDescription className="text-sm mt-1">
                    {result.message}
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  {result.isEligible && !result.hasVoted && (
                    <Button
                      onClick={handleVote}
                      className="flex-1 bg-india-green hover:bg-india-green-light h-12"
                    >
                      <Vote className="mr-2 h-5 w-5" />
                      Cast My Vote
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Start Over
                  </Button>
                </div>
              </div>
            )}

            {step === "voting" && (
              <div className="py-12 text-center animate-fade-in-up">
                <Loader2 className="h-16 w-16 animate-spin text-india-green mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">Recording Your Vote...</p>
                <p className="text-sm text-muted-foreground">Please do not close this window</p>
              </div>
            )}

            {step === "success" && (
              <div className="py-8 text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-india-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-india-green" />
                </div>
                <h3 className="text-2xl font-bold text-india-green mb-2">Vote Recorded!</h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for participating in the democratic process. Your vote has been 
                  securely recorded using a hashed identifier.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleGoHome} className="bg-ashoka-blue hover:bg-ashoka-blue-light">
                    Return Home
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    View Dashboard
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demo Aadhaar Numbers */}
        <Card className="mt-6 bg-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Demo Aadhaar Numbers (for testing)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["123456789012", "234567890123", "345678901234"].map((num) => (
                <Button
                  key={num}
                  variant="secondary"
                  size="sm"
                  onClick={() => setAadhaar(num)}
                  className="font-mono text-xs"
                >
                  {num}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Click to auto-fill. These are mock eligible Aadhaar numbers for demonstration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
