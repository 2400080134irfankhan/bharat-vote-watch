import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const safeGetStoredLanguage = () => {
  if (typeof window === "undefined") return undefined;
  const raw = window.localStorage.getItem("lang") || undefined;
  return raw ? raw.split("-")[0] : undefined;
};

const resources = {
  en: {
    translation: {
      language: {
        label: "Language",
      },
      nav: {
        home: "Home",
        vote: "Vote",
        dashboard: "Dashboard",
        education: "Education",
        observer: "Observer",
        admin: "Admin",
      },
      verify: {
        back_home: "Back to Home",
        title: "Verify & Vote",
        subtitle: "Use your Aadhaar to verify eligibility and cast your vote",
        eligible_to_vote: "Eligible to Vote",
        already_voted: "Already Voted",
        not_eligible: "Not Eligible",
        cast_vote: "Cast My Vote",
        start_over: "Start Over",
        aadhaar_label: "Enter Aadhaar Number",
        aadhaar_hint: "Enter your 12-digit Aadhaar number",
        verify_proceed: "Verify & Proceed",
        cancel: "Cancel",
        verifying_title: "Verifying Aadhaar...",
        verifying_subtitle: "Please wait while we check your eligibility",
        select_party_title: "Select Your Party",
        select_party_subtitle: "Choose one party to cast your vote",
        confirm_vote: "Confirm Vote",
        back: "Back",
        recording_title: "Recording Your Vote...",
        recording_subtitle: "Please do not close this window",
        success_title: "Vote Recorded!",
        success_subtitle:
          "Thank you for participating in the democratic process. Your vote has been securely recorded using a hashed identifier.",
        return_home: "Return Home",
        view_dashboard: "View Dashboard",
        demo_title: "Demo Aadhaar Numbers (for testing)",
        demo_hint: "Click to auto-fill. These are mock eligible Aadhaar numbers for demonstration.",
      },
      toast: {
        consent_required_title: "Consent Required",
        consent_required_desc: "Please accept the consent checkbox to proceed.",
        invalid_format_title: "Invalid Format",
        invalid_format_desc: "Please enter a valid 12-digit Aadhaar number.",
        selection_required_title: "Selection Required",
        selection_required_desc: "Please select a party to cast your vote.",
        vote_recorded_title: "Vote Recorded Successfully!",
        vote_recorded_desc: "Your vote for {{party}} has been recorded.",
        vote_failed_title: "Vote Failed",
        vote_failed_desc: "Unable to record your vote. Please try again.",
      },
    },
  },
  hi: {
    translation: {
      language: {
        label: "भाषा",
      },
      nav: {
        home: "मुखपृष्ठ",
        vote: "मतदान",
        dashboard: "डैशबोर्ड",
        education: "शिक्षा",
        observer: "पर्यवेक्षक",
        admin: "प्रशासन",
      },
      verify: {
        back_home: "मुखपृष्ठ पर वापस",
        title: "सत्यापन और मतदान",
        subtitle: "पात्रता सत्यापित करने और वोट डालने के लिए आधार का उपयोग करें",
        eligible_to_vote: "मतदान के लिए पात्र",
        already_voted: "पहले ही मतदान किया",
        not_eligible: "पात्र नहीं",
        cast_vote: "मेरा वोट डालें",
        start_over: "फिर से शुरू करें",
        aadhaar_label: "आधार नंबर दर्ज करें",
        aadhaar_hint: "अपना 12-अंकों का आधार नंबर दर्ज करें",
        verify_proceed: "सत्यापित करें और आगे बढ़ें",
        cancel: "रद्द करें",
        verifying_title: "आधार सत्यापित किया जा रहा है...",
        verifying_subtitle: "कृपया प्रतीक्षा करें, हम आपकी पात्रता जाँच रहे हैं",
        select_party_title: "अपनी पार्टी चुनें",
        select_party_subtitle: "वोट डालने के लिए एक पार्टी चुनें",
        confirm_vote: "वोट पुष्टि करें",
        back: "वापस",
        recording_title: "आपका वोट दर्ज हो रहा है...",
        recording_subtitle: "कृपया इस विंडो को बंद न करें",
        success_title: "वोट दर्ज हो गया!",
        success_subtitle:
          "लोकतांत्रिक प्रक्रिया में भाग लेने के लिए धन्यवाद। आपका वोट हैश्ड पहचानकर्ता के साथ सुरक्षित रूप से दर्ज किया गया है।",
        return_home: "मुखपृष्ठ जाएँ",
        view_dashboard: "डैशबोर्ड देखें",
        demo_title: "डेमो आधार नंबर (परीक्षण हेतु)",
        demo_hint: "ऑटो-फिल के लिए क्लिक करें। ये डेमो के लिए मॉक पात्र आधार नंबर हैं।",
      },
      toast: {
        consent_required_title: "सहमति आवश्यक",
        consent_required_desc: "आगे बढ़ने के लिए कृपया सहमति बॉक्स चुनें।",
        invalid_format_title: "अमान्य प्रारूप",
        invalid_format_desc: "कृपया एक मान्य 12-अंकों का आधार नंबर दर्ज करें।",
        selection_required_title: "चयन आवश्यक",
        selection_required_desc: "कृपया वोट डालने के लिए एक पार्टी चुनें।",
        vote_recorded_title: "वोट सफलतापूर्वक दर्ज हुआ!",
        vote_recorded_desc: "{{party}} के लिए आपका वोट दर्ज कर लिया गया है।",
        vote_failed_title: "वोट विफल",
        vote_failed_desc: "वोट दर्ज नहीं हो पाया। कृपया पुनः प्रयास करें।",
      },
    },
  },
  te: {
    translation: {
      language: {
        label: "భాష",
      },
      nav: {
        home: "హోమ్",
        vote: "ఓటు",
        dashboard: "డ్యాష్‌బోర్డ్",
        education: "విద్య",
        observer: "పరిశీలకుడు",
        admin: "అడ్మిన్",
      },
      verify: {
        back_home: "హోమ్‌కు తిరిగి",
        title: "ధృవీకరణ & ఓటు",
        subtitle: "అర్హతను ధృవీకరించడానికి మరియు ఓటు వేయడానికి మీ ఆధార్‌ను ఉపయోగించండి",
        eligible_to_vote: "ఓటు వేయడానికి అర్హులు",
        already_voted: "ఇప్పటికే ఓటు వేశారు",
        not_eligible: "అర్హులు కాదు",
        cast_vote: "నా ఓటు వేయండి",
        start_over: "మళ్లీ ప్రారంభించండి",
        aadhaar_label: "ఆధార్ నంబర్ నమోదు చేయండి",
        aadhaar_hint: "మీ 12 అంకెల ఆధార్ నంబర్ నమోదు చేయండి",
        verify_proceed: "ధృవీకరించి కొనసాగండి",
        cancel: "రద్దు",
        verifying_title: "ఆధార్ ధృవీకరిస్తున్నాం...",
        verifying_subtitle: "దయచేసి వేచి ఉండండి, మీ అర్హతను పరిశీలిస్తున్నాం",
        select_party_title: "మీ పార్టీని ఎంపిక చేయండి",
        select_party_subtitle: "ఓటు వేయడానికి ఒక పార్టీయే ఎంపిక చేయండి",
        confirm_vote: "ఓటును నిర్ధారించండి",
        back: "వెనుకకు",
        recording_title: "మీ ఓటును నమోదు చేస్తున్నాం...",
        recording_subtitle: "దయచేసి ఈ విండోను మూసివేయకండి",
        success_title: "ఓటు నమోదు అయింది!",
        success_subtitle:
          "ప్రజాస్వామ్య ప్రక్రియలో పాల్గొన్నందుకు ధన్యవాదాలు. మీ ఓటు హాష్ చేసిన గుర్తింపుతో సురక్షితంగా నమోదు చేయబడింది.",
        return_home: "హోమ్‌కు వెళ్లండి",
        view_dashboard: "డ్యాష్‌బోర్డ్ చూడండి",
        demo_title: "డెమో ఆధార్ నంబర్లు (పరీక్ష కోసం)",
        demo_hint: "ఆటో-ఫిల్ కోసం క్లిక్ చేయండి. ఇవి డెమో కోసం మాక్ అర్హత గల ఆధార్ నంబర్లు.",
      },
      toast: {
        consent_required_title: "అంగీకారం అవసరం",
        consent_required_desc: "కొనసాగడానికి దయచేసి అంగీకార చెక్‌బాక్స్‌ని ఎంచుకోండి.",
        invalid_format_title: "చెల్లని ఫార్మాట్",
        invalid_format_desc: "దయచేసి చెల్లుబాటు అయ్యే 12 అంకెల ఆధార్ నంబర్‌ను నమోదు చేయండి.",
        selection_required_title: "ఎంపిక అవసరం",
        selection_required_desc: "దయచేసి ఓటు వేయడానికి ఒక పార్టీని ఎంపిక చేయండి.",
        vote_recorded_title: "ఓటు విజయవంతంగా నమోదు అయింది!",
        vote_recorded_desc: "{{party}} కోసం మీ ఓటు నమోదు చేయబడింది.",
        vote_failed_title: "ఓటు విఫలమైంది",
        vote_failed_desc: "మీ ఓటును నమోదు చేయలేకపోయాం. దయచేసి మళ్లీ ప్రయత్నించండి.",
      },
    },
  },
  bn: {
    translation: {
      language: { label: "ভাষা" },
      nav: {
        home: "হোম",
        vote: "ভোট",
        dashboard: "ড্যাশবোর্ড",
        education: "শিক্ষা",
        observer: "পর্যবেক্ষক",
        admin: "অ্যাডমিন",
      },
    },
  },
  mr: {
    translation: {
      language: { label: "भाषा" },
      nav: {
        home: "मुख्यपृष्ठ",
        vote: "मतदान",
        dashboard: "डॅशबोर्ड",
        education: "शिक्षण",
        observer: "निरीक्षक",
        admin: "प्रशासन",
      },
    },
  },
  ta: {
    translation: {
      language: { label: "மொழி" },
      nav: {
        home: "முகப்பு",
        vote: "வாக்கு",
        dashboard: "டாஷ்போர்டு",
        education: "கல்வி",
        observer: "பார்வையாளர்",
        admin: "நிர்வாகம்",
      },
    },
  },
  gu: {
    translation: {
      language: { label: "ભાષા" },
      nav: {
        home: "મુખ્ય",
        vote: "મતદાન",
        dashboard: "ડેશબોર્ડ",
        education: "શિક્ષણ",
        observer: "નિરીક્ષક",
        admin: "એડમિન",
      },
    },
  },
  kn: {
    translation: {
      language: { label: "ಭಾಷೆ" },
      nav: {
        home: "ಮುಖಪುಟ",
        vote: "ಮತ",
        dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        education: "ಶಿಕ್ಷಣ",
        observer: "ವೀಕ್ಷಕ",
        admin: "ಆಡ್ಮಿನ್",
      },
    },
  },
  ml: {
    translation: {
      language: { label: "ഭാഷ" },
      nav: {
        home: "ഹോം",
        vote: "വോട്ട്",
        dashboard: "ഡാഷ്ബോർഡ്",
        education: "വിദ്യാഭ്യാസം",
        observer: "നിരീക്ഷകൻ",
        admin: "അഡ്മിൻ",
      },
    },
  },
  or: {
    translation: {
      language: { label: "ଭାଷା" },
      nav: {
        home: "ହୋମ୍",
        vote: "ଭୋଟ୍",
        dashboard: "ଡ୍ୟାସ୍‌ବୋର୍ଡ୍",
        education: "ଶିକ୍ଷା",
        observer: "ପର୍ଯ୍ୟବେକ୍ଷକ",
        admin: "ଆଡମିନ୍",
      },
    },
  },
  pa: {
    translation: {
      language: { label: "ਭਾਸ਼ਾ" },
      nav: {
        home: "ਹੋਮ",
        vote: "ਵੋਟ",
        dashboard: "ਡੈਸ਼ਬੋਰਡ",
        education: "ਸਿੱਖਿਆ",
        observer: "ਨਿਗਰਾਨ",
        admin: "ਐਡਮਿਨ",
      },
    },
  },
  as: {
    translation: {
      language: { label: "ভাষা" },
      nav: {
        home: "হোম",
        vote: "ভোট",
        dashboard: "ড্যাশবোর্ড",
        education: "শিক্ষা",
        observer: "পৰ্যবেক্ষক",
        admin: "এডমিন",
      },
    },
  },
  ur: {
    translation: {
      language: { label: "زبان" },
      nav: {
        home: "ہوم",
        vote: "ووٹ",
        dashboard: "ڈیش بورڈ",
        education: "تعلیم",
        observer: "مبصر",
        admin: "ایڈمن",
      },
    },
  },
  sa: {
    translation: {
      language: { label: "भाषा" },
      nav: {
        home: "गृहम्",
        vote: "मतदानम्",
        dashboard: "पटलम्",
        education: "शिक्षा",
        observer: "पर्यवेक्षकः",
        admin: "प्रशासकः",
      },
    },
  },
  ne: {
    translation: {
      language: { label: "भाषा" },
      nav: {
        home: "गृह",
        vote: "मत",
        dashboard: "ड्यासबोर्ड",
        education: "शिक्षा",
        observer: "पर्यवेक्षक",
        admin: "प्रशासन",
      },
    },
  },
  sd: {
    translation: {
      language: { label: "ٻولي" },
      nav: {
        home: "هوم",
        vote: "ووٽ",
        dashboard: "ڊيش بورڊ",
        education: "تعليم",
        observer: "نگران",
        admin: "ايڊمن",
      },
    },
  },
  kok: {
    translation: {
      language: { label: "भास" },
      nav: {
        home: "होम",
        vote: "मत",
        dashboard: "डॅशबोर्ड",
        education: "शिक्षण",
        observer: "निरीक्षक",
        admin: "प्रशासन",
      },
    },
  },
  doi: {
    translation: {
      language: { label: "भाषा" },
      nav: {
        home: "घर",
        vote: "मत",
        dashboard: "डैशबोर्ड",
        education: "शिक्षा",
        observer: "निरीक्षक",
        admin: "प्रशासन",
      },
    },
  },
  mai: {
    translation: {
      language: { label: "भाषा" },
      nav: {
        home: "गृह",
        vote: "मत",
        dashboard: "डैशबोर्ड",
        education: "शिक्षा",
        observer: "पर्यवेक्षक",
        admin: "प्रशासन",
      },
    },
  },
  mni: {
    translation: {
      language: { label: "Language" },
      nav: {
        home: "Home",
        vote: "Vote",
        dashboard: "Dashboard",
        education: "Education",
        observer: "Observer",
        admin: "Admin",
      },
    },
  },
  sat: {
    translation: {
      language: { label: "Language" },
      nav: {
        home: "Home",
        vote: "Vote",
        dashboard: "Dashboard",
        education: "Education",
        observer: "Observer",
        admin: "Admin",
      },
    },
  },
  ks: {
    translation: {
      language: { label: "زبان" },
      nav: {
        home: "ہوم",
        vote: "ووٹ",
        dashboard: "ڈیش بورڈ",
        education: "تعلیم",
        observer: "مبصر",
        admin: "ایڈمن",
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: safeGetStoredLanguage() || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
