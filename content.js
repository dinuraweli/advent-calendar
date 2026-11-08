/* =====================================================================
   ADVENT CALENDAR — CONTENT
   ---------------------------------------------------------------------
   HOW TO EDIT (for Sunday school volunteers):
   - Each day below has text for three languages: en (English),
     si (Sinhala), ta (Tamil).
   - Replace the "[...]" placeholder text with the real content.
     Keep the quotation marks.
   - "title"      = a short theme for the day, shown on the calendar
                    card (e.g. "The Promise"). Keep it short.
   - "verse"      = the scripture text
   - "reference"  = e.g. "Isaiah 9:6"
   - "reflection" = a short thought (2–4 sentences)
   - "activity"   = a small thing to do that day
   - Do NOT change the "day" or "date" numbers.
   - After editing, save the file. If the app is installed/offline,
     bump CACHE_VERSION in sw.js so phones pick up the new text.
   ===================================================================== */

// Day themes (titles) for all 25 days, in all three languages.
// These follow the progressive Nativity story arc. Sinhala/Tamil are a
// best-effort translation — have a native speaker review if possible.
const TITLES = [
  { en: "The prophecy foretold",            si: "අනාවැකිය පැවසෙයි",                         ta: "தீர்க்கதரிசனம் உரைக்கப்படுகிறது" },
  { en: "The little town of Bethlehem",     si: "බෙත්ලෙහෙම් කුඩා නගරය",                     ta: "பெத்லகேம் எனும் சிறு நகரம்" },
  { en: "The angel appears to Mary",        si: "දේවදූතයා මරියට පෙනී සිටී",                 ta: "தூதன் மரியாளுக்குத் தோன்றுகிறார்" },
  { en: "Joseph's dream",                   si: "යෝසෙප්ගේ සිහිනය",                           ta: "யோசேப்பின் கனவு" },
  { en: "The journey to Bethlehem",         si: "බෙත්ලෙහෙමට ගමන",                           ta: "பெத்லகேமுக்குப் பயணம்" },
  { en: "No room at the inn",               si: "නවාතැනේ ඉඩක් නැත",                         ta: "விடுதியில் இடம் இல்லை" },
  { en: "The Holy Family",                  si: "ශුද්ධ පවුල",                               ta: "பரிசுத்த குடும்பம்" },
  { en: "The shepherds in the fields",      si: "කෙත්වල එඬේරුන්",                           ta: "வயல்களில் மேய்ப்பர்கள்" },
  { en: "The angel appears to the shepherds", si: "දේවදූතයා එඬේරුන්ට පෙනී සිටී",           ta: "தூதன் மேய்ப்பர்களுக்குத் தோன்றுகிறார்" },
  { en: "The heavenly host",                si: "ස්වර්ගීය දූත සමූහය",                       ta: "பரலோக சேனை" },
  { en: "The shepherds hurry to Bethlehem", si: "එඬේරුන් බෙත්ලෙහෙමට යති",                 ta: "மேய்ப்பர்கள் பெத்லகேமுக்கு விரைகிறார்கள்" },
  { en: "The shepherds adore the Christ child", si: "එඬේරුන් ක්‍රිස්තු බිළිඳාට නමස්කාර කරති", ta: "மேய்ப்பர்கள் குழந்தையை ஆராதிக்கிறார்கள்" },
  { en: "The shepherds return, glorifying God", si: "එඬේරුන් දෙවිට ප්‍රශංසා කරමින් නැවත යති", ta: "மேய்ப்பர்கள் தேவனை மகிமைப்படுத்தித் திரும்புகிறார்கள்" },
  { en: "Mary treasures these things",      si: "මරිය මේ සියල්ල සිතේ රැක ගනී",             ta: "மரியாள் இவற்றை இதயத்தில் போற்றுகிறாள்" },
  { en: "The Star of Bethlehem",            si: "බෙත්ලෙහෙම් තරුව",                         ta: "பெத்லகேம் நட்சத்திரம்" },
  { en: "The wise men see the star",        si: "ඥානවන්තයෝ තරුව දකිති",                     ta: "ஞானிகள் நட்சத்திரத்தைக் காண்கிறார்கள்" },
  { en: "The wise men journey",             si: "ඥානවන්තයන්ගේ ගමන",                         ta: "ஞானிகளின் பயணம்" },
  { en: "The wise men arrive",              si: "ඥානවන්තයෝ පැමිණෙති",                       ta: "ஞானிகள் வந்து சேருகிறார்கள்" },
  { en: "The wise men find the child",      si: "ඥානවන්තයෝ බිළිඳා සොයා ගනිති",             ta: "ஞானிகள் குழந்தையைக் காண்கிறார்கள்" },
  { en: "The wise men present their gifts", si: "ඥානවන්තයෝ තෑගි පිළිගන්වති",               ta: "ஞானிகள் காணிக்கைகளை அளிக்கிறார்கள்" },
  { en: "The wise men worship",             si: "ඥානවන්තයෝ නමස්කාර කරති",                   ta: "ஞானிகள் ஆராதிக்கிறார்கள்" },
  { en: "The Word made flesh",              si: "වචනය මනුෂ්‍ය විය",                         ta: "வார்த்தை மாம்சமானது" },
  { en: "The whole gathering",              si: "සියලු දෙනා එක්රැස් වෙති",                 ta: "அனைவரும் ஒன்றுகூடுதல்" },
  { en: "The Christ child in glory",        si: "මහිමයෙන් බැබළෙන ක්‍රිස්තු බිළිඳා",        ta: "மகிமையில் கிறிஸ்து குழந்தை" },
  { en: "Christmas Day — Emmanuel",         si: "නත්තල් දිනය — එම්මානුවෙල්",               ta: "கிறிஸ்மஸ் நாள் — இம்மானுவேல்" }
];

// Generates 25 days: titles are filled in above; verse/reflection/activity
// stay as clearly-marked placeholders for the Sunday school to complete.
function buildDays() {
  const days = [];
  for (let d = 1; d <= 25; d++) {
    const date = "12-" + String(d).padStart(2, "0");
    const special = d === 25;
    const title = TITLES[d - 1];
    days.push({
      day: d,
      date: date,
      en: {
        title: title.en,
        verse: special
          ? "[Christmas Day verse — English]"
          : "[Day " + d + " verse — English]",
        reference: "[Reference]",
        reflection: "[Day " + d + " reflection — English. Write 2–4 warm sentences here.]",
        activity: "[Day " + d + " activity — English. A small thing to do today.]"
      },
      si: {
        title: title.si,
        verse: special
          ? "[නත්තල් දින පදය — සිංහල]"
          : "[දින " + d + " පදය — සිංහල]",
        reference: "[යොමුව]",
        reflection: "[දින " + d + " මෙනෙහි කිරීම — සිංහල. මෙහි වාක්‍ය 2–4ක් ලියන්න.]",
        activity: "[දින " + d + " ක්‍රියාකාරකම — සිංහල. අද කළ හැකි කුඩා දෙයක්.]"
      },
      ta: {
        title: title.ta,
        verse: special
          ? "[கிறிஸ்மஸ் நாள் வசனம் — தமிழ்]"
          : "[நாள் " + d + " வசனம் — தமிழ்]",
        reference: "[குறிப்பு]",
        reflection: "[நாள் " + d + " சிந்தனை — தமிழ். இங்கே 2–4 வாக்கியங்கள் எழுதவும்.]",
        activity: "[நாள் " + d + " செயல்பாடு — தமிழ். இன்று செய்யக்கூடிய ஒரு சிறிய காரியம்.]"
      }
    });
  }
  return days;
}

window.ADVENT_CONTENT = {
  days: buildDays()
};
