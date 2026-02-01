import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

const indianLanguages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "sa", name: "Sanskrit", native: "संस्कृतम्" },
  { code: "ks", name: "Kashmiri", native: "कॉशुर" },
  { code: "sd", name: "Sindhi", native: "سنڌي" },
  { code: "ne", name: "Nepali", native: "नेपाली" },
  { code: "kok", name: "Konkani", native: "कोंकणी" },
  { code: "mni", name: "Manipuri", native: "মৈতৈলোন্" },
  { code: "doi", name: "Dogri", native: "डोगरी" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "mai", name: "Maithili", native: "मैथिली" },
];

export function LanguageSelector() {
  return (
    <Select defaultValue="en">
      <SelectTrigger className="w-[140px] h-8 text-xs bg-background border-muted">
        <Globe className="h-3 w-3 mr-1 text-ashoka-blue" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {indianLanguages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="text-sm">
            <span className="flex items-center gap-2">
              <span className="font-medium">{lang.native}</span>
              <span className="text-muted-foreground text-xs">({lang.name})</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
