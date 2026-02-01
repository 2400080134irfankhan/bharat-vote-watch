import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
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
import { useTranslation } from "react-i18next";

type VerificationStep = "input" | "verifying" | "result" | "selecting" | "voting" | "success";

interface VerificationResult {
  isEligible: boolean;
  hasVoted: boolean;
  message: string;
}

const PARTIES = [
  { id: "party1", name: "Bharatiya Janata Party", symbol: "🪷", abbreviation: "BJP" },
  { id: "party2", name: "Indian National Congress", symbol: "✋", abbreviation: "INC" },
  { id: "party3", name: "Aam Aadmi Party", symbol: "🧹", abbreviation: "AAP" },
  { id: "party4", name: "Bahujan Samaj Party", symbol: "🐘", abbreviation: "BSP" },
  { id: "party5", name: "Communist Party of India", symbol: "🌾", abbreviation: "CPI" },
  { id: "party6", name: "Nationalist Congress Party", symbol: "⏰", abbreviation: "NCP" },
  { id: "party7", name: "Trinamool Congress", symbol: "🌸", abbreviation: "TMC" },
  { id: "party8", name: "Shiv Sena", symbol: "🏹", abbreviation: "SS" },
  { id: "party9", name: "Samajwadi Party", symbol: "🚲", abbreviation: "SP" },
  { id: "party10", name: "Independent Candidate", symbol: "⭐", abbreviation: "IND" },
];

export function AadhaarVerification() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [aadhaar, setAadhaar] = useState("");
  const [step, setStep] = useState<VerificationStep>("input");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [consent, setConsent] = useState(false);
  const [selectedParty, setSelectedParty] = useState<string>("");

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 12);
    setAadhaar(value);
  };

  const handleVerify = async () => {
    if (!consent) {
      toast({
        title: t("toast.consent_required_title"),
        description: t("toast.consent_required_desc"),
        variant: "destructive",
      });
      return;
    }

    if (!isValidAadhaarFormat(aadhaar)) {
      toast({
        title: t("toast.invalid_format_title"),
        description: t("toast.invalid_format_desc"),
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

  const handleProceedToVote = () => {
    setStep("selecting");
  };

  const handleConfirmVote = async () => {
    if (!selectedParty) {
      toast({
        title: t("toast.selection_required_title"),
        description: t("toast.selection_required_desc"),
        variant: "destructive",
      });
      return;
    }

    setStep("voting");
    
    // Simulate voting process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const party = PARTIES.find(p => p.id === selectedParty);
    const partyAbbrev = party?.abbreviation.toLowerCase() || selectedParty;
    const voteRecorded = recordVote(aadhaar, partyAbbrev);
    
    if (voteRecorded) {
      setStep("success");
      toast({
        title: t("toast.vote_recorded_title"),
        description: t("toast.vote_recorded_desc", { party: party?.name || "" }),
      });
    } else {
      toast({
        title: t("toast.vote_failed_title"),
        description: t("toast.vote_failed_desc"),
        variant: "destructive",
      });
      setStep("selecting");
    }
  };

  const handleCancel = () => {
    setAadhaar("");
    setStep("input");
    setResult(null);
    setConsent(false);
    setSelectedParty("");
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
          {t("verify.back_home")}
        </Button>

        <Card className="shadow-medium border-2 animate-scale-in">
          <CardHeader className="text-center border-b bg-gradient-to-r from-saffron/10 via-white to-india-green/10">
            <div className="mx-auto w-16 h-16 rounded-full bg-ashoka-blue flex items-center justify-center mb-4">
              <Vote className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-ashoka-blue">{t("verify.title")}</CardTitle>
            <CardDescription>
              {t("verify.subtitle")}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {step === "input" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {t("verify.aadhaar_label")}
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
                    {t("verify.aadhaar_hint")}
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
                    {t("verify.verify_proceed")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="h-12"
                  >
                    {t("verify.cancel")}
                  </Button>
                </div>
              </div>
            )}

            {step === "verifying" && (
              <div className="py-12 text-center animate-fade-in-up">
                <Loader2 className="h-16 w-16 animate-spin text-ashoka-blue mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">{t("verify.verifying_title")}</p>
                <p className="text-sm text-muted-foreground">{t("verify.verifying_subtitle")}</p>
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
                      ? t("verify.eligible_to_vote")
                      : result.hasVoted
                      ? t("verify.already_voted")
                      : t("verify.not_eligible")}
                  </AlertTitle>
                  <AlertDescription className="text-sm mt-1">
                    {result.message}
                  </AlertDescription>
                </Alert>

                <div className="flex gap-3">
                  {result.isEligible && !result.hasVoted && (
                    <Button
                      onClick={handleProceedToVote}
                      className="flex-1 bg-india-green hover:bg-india-green-light h-12"
                    >
                      <Vote className="mr-2 h-5 w-5" />
                      {t("verify.cast_vote")}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-12"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("verify.start_over")}
                  </Button>
                </div>
              </div>
            )}

            {step === "selecting" && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="text-center pb-4 border-b">
                  <h3 className="text-lg font-semibold text-foreground">{t("verify.select_party_title")}</h3>
                  <p className="text-sm text-muted-foreground">{t("verify.select_party_subtitle")}</p>
                </div>

                <RadioGroup value={selectedParty} onValueChange={setSelectedParty} className="space-y-3">
                  {PARTIES.map((party) => (
                    <div
                      key={party.id}
                      className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedParty === party.id
                          ? "border-ashoka-blue bg-ashoka-blue/5"
                          : "border-muted hover:border-ashoka-blue/50 hover:bg-muted/50"
                      }`}
                      onClick={() => setSelectedParty(party.id)}
                    >
                      <RadioGroupItem value={party.id} id={party.id} />
                      <Label htmlFor={party.id} className="flex-1 cursor-pointer flex items-center gap-3">
                        <span className="text-2xl">{party.symbol}</span>
                        <div>
                          <p className="font-medium text-foreground">{party.name}</p>
                          <p className="text-xs text-muted-foreground">{party.abbreviation}</p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleConfirmVote}
                    disabled={!selectedParty}
                    className="flex-1 bg-india-green hover:bg-india-green-light h-12"
                  >
                    <CheckCircle className="mr-2 h-5 w-5" />
                    {t("verify.confirm_vote")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setStep("result")}
                    className="h-12"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t("verify.back")}
                  </Button>
                </div>
              </div>
            )}

            {step === "voting" && (
              <div className="py-12 text-center animate-fade-in-up">
                <Loader2 className="h-16 w-16 animate-spin text-india-green mx-auto mb-4" />
                <p className="text-lg font-medium text-foreground">{t("verify.recording_title")}</p>
                <p className="text-sm text-muted-foreground">{t("verify.recording_subtitle")}</p>
              </div>
            )}

            {step === "success" && (
              <div className="py-8 text-center animate-fade-in-up">
                <div className="w-20 h-20 rounded-full bg-india-green/10 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-india-green" />
                </div>
                <h3 className="text-2xl font-bold text-india-green mb-2">{t("verify.success_title")}</h3>
                <p className="text-muted-foreground mb-6">
                  {t("verify.success_subtitle")}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button onClick={handleGoHome} className="bg-ashoka-blue hover:bg-ashoka-blue-light">
                    {t("verify.return_home")}
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/dashboard')}>
                    {t("verify.view_dashboard")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Demo Aadhaar Numbers */}
        <Card className="mt-6 bg-muted/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">{t("verify.demo_title")}</CardTitle>
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
              {t("verify.demo_hint")}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}