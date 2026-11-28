/* =====================================================================
   ADVENT CALENDAR — CONTENT  (Advent 2026: Sun 29 Nov → Fri 25 Dec)
   ---------------------------------------------------------------------
   Only text provided by the Sunday school goes here.

   HOW TO ADD A DAY: copy one of the entries below, paste it after the
   last one, and change the text. Keep the quotation marks and commas.
   - date       = "MM-DD" — the day unlocks on this date.
   - feast      = optional saint's day / feast.
   - title      = the reflection's theme.
   - readings   = optional: the day's readings.
   - reflection = the reflection (a blank line "\n\n" starts a new paragraph).
   - actTitle   = the name of Today's Act.
   - activity   = Today's Act. Lines starting with "- " become a list.
   - img        = optional picture file in assets/days/, e.g. "day-01.jpg".
   Days from 29 Nov to 25 Dec that have no entry yet still appear on the
   calendar, but cannot be opened until their text is added here.
   After editing, bump CACHE_VERSION in sw.js so phones get the update.
   ===================================================================== */

const ENGLISH = [
  // ---------------- First Week of Advent ----------------
  {
    date: "11-29",
    img: "day-01.jpg",
    title: "Stay Awake and Be Ready",
    reflection: "Jesus invites us to stay awake and be ready for His coming. This does not mean living in fear, but living each day with faith and love. Sometimes we become busy with our daily activities and forget God. Advent reminds us to make time for God and prepare our hearts for Jesus. Let us not wait until Christmas to change. Let us begin today.",
    actTitle: "Make Time for God",
    activity: "Spend at least 15 minutes in prayer privately today. Think of one habit that takes you away from God and try to change it."
  },
  {
    date: "11-30",
    img: "day-02.jpg",
    feast: "Feast of St. Andrew, Apostle",
    title: "Come, Follow Me",
    readings: "Romans 10:9–18 | Matthew 4:18–22",
    reflection: "When Jesus called Andrew, he left everything and followed Him. Andrew teaches us to say ‘Yes’ to Jesus without delay. Sometimes we doubt or get so busy with our own plans that we forget to listen to God. Following Jesus means putting Him first and living by His teachings. Like Andrew, we are also called to bring others closer to Jesus.",
    actTitle: "Bring Someone Closer to Christ",
    activity: "Send an encouraging message prepared by you to someone today. Invite someone to pray with you or share a kind word about Jesus with someone."
  },
  {
    date: "12-01",
    img: "day-03.jpg",
    title: "See the World Through God’s Eyes",
    readings: "Isaiah 11:1–10 | Luke 10:21–24",
    reflection: "Isaiah speaks about a world filled with peace and justice. In the Gospel, Jesus reminds us that God reveals Himself to those who are humble. God looks at the heart. Have you ever thought about how God looks at you? He surely respects us no matter who we are. Advent invites us to be humble, respect everyone, and see the goodness in others.",
    actTitle: "Practice Humility",
    activity: "Listen patiently to someone, and do not judge, but treat the person with kindness and respect."
  },
  {
    date: "12-02",
    img: "day-04.jpg",
    title: "Jesus = Compassion",
    readings: "Isaiah 25:6–10a | Matthew 15:29–37",
    reflection: "In the Gospel, Jesus sees the hungry crowd and feels compassion for them. He multiplies the food and feeds them. The miracle here is not the multiplication of bread but the compassion of Jesus. Compassion makes everything great. We do not need to have a lot to help others. Even a small act of compassion can make a difference.",
    actTitle: "Share What You Have",
    activity: "Be sensitive to the needs of someone today. It could be food, your time, your knowledge, or a helping hand."
  },
  {
    date: "12-03",
    img: "day-05.jpg",
    feast: "Memorial of St. Francis Xavier",
    title: "Build Your Life on a Strong Foundation",
    readings: "Isaiah 26:1–6 | Matthew 7:21, 24–27",
    reflection: "Jesus teaches us that it is not enough to listen to His Word; we must put it into practice. Just as a house needs a strong foundation to stand firm, our lives need a strong foundation of faith. Our faith should be seen in the way we speak, behave, and treat others. Everyday life gives us opportunities to live what Jesus teaches us.",
    actTitle: "Practise What Jesus Teaches",
    activity: "Today, make a special effort to:\n- Speak kindly instead of getting angry.\n- Forgive someone instead of holding a grudge.\n- Help at home without waiting to be asked.\n- Be honest, even when it is difficult.\n\nChoose at least one of these actions and put it into practice today."
  },
  {
    date: "12-04",
    img: "day-06.jpg",
    title: "Lord, Open My Eyes",
    readings: "Isaiah 29:17–24 | Matthew 9:27–31",
    reflection: "In today’s Gospel, Jesus gives sight to two blind men who come to Him with faith. Sometimes we fail to notice the people around us who need our help, love, and attention. We may be too busy with our own lives to see their struggles. Advent invites us to open our eyes and become more caring and thoughtful towards others. Let us learn to notice the needs of those around us and respond with love.",
    actTitle: "Look Beyond Yourself",
    activity: "Notice someone who is often ignored or left out. Spend some time with that person and offer a kind word or a helping hand."
  },
  {
    date: "12-05",
    img: "day-07.jpg",
    title: "Freely You Have Received, Freely Give",
    readings: "Isaiah 30:19–21, 23–26 | Matthew 9:35–10:1, 5a, 6–8",
    reflection: "Jesus looks at the people with love and compassion and sends His disciples to help them. He reminds them to give freely what they have freely received. Everything we have is a gift from God. Our talents, time and blessings are meant to be shared with others. We are called to spread God’s love through our actions.",
    actTitle: "Become a Blessing to Someone",
    activity: "Do something good for someone today without expecting anything in return. Help someone, encourage a friend, or pray for someone in need."
  }
];

// Sinhala (සිංහල) — same fields as above, from "ආගමන සමයේ පළමු සතිය".
const SINHALA = [
  // ---------------- ආගමන සමයේ පළමු සතිය ----------------
  {
    date: "11-29",
    title: "අවදිව සිටින්න. සූදානමින් සිටින්න.",
    reflection: "ජේසුස් වහන්සේගේ පැමිණීම අපේක්ෂාවෙන් අවදිව හා සූදානමින් සිටින ලෙස උන්වහන්සේ අපට ආරාධනා කරන සේක. මෙයින් අදහස් කරන්නේ බියෙන් ජීවත් වීම නොව, සෑම දිනකම විශ්වාසයෙන් හා ප්‍රේමයෙන් ජීවත් වීමයි. ඇතැම් විට අපගේ දෛනික කටයුතුවල කාර්යබහුලත්වය නිසා දෙවියන් වහන්සේට මුල් තැන දීමට අපට අමතක වේ. ආගමන සමය අපට දෙවියන් වහන්සේ වෙනුවෙන් කාලය වෙන් කරමින්, ජේසුස් වහන්සේ පිළිගැනීමට අපගේ හදවත් සූදානම් කරගන්නා ලෙස ආරාධනා කරයි. අපගේ ජීවිත වෙනස් කරගැනීමට නත්තල එනතුරු බලා නොසිටිමු. ඒ වෙනස අදම ආරම්භ කරමු.",
    actTitle: "දෙවියන් වහන්සේ වෙනුවෙන් කාලය වෙන් කරන්න",
    activity: "අද පෞද්ගලික යාච්ඤාව සඳහා අවම වශයෙන් විනාඩි 15ක් වෙන් කරන්න. ඔබව දෙවියන් වහන්සේගෙන් ඈත් කරන එක් පුරුද්දක් ගැන සිතා බලා, එය වෙනස් කරගැනීමට උත්සාහ කරන්න."
  },
  {
    date: "11-30",
    feast: "ශුද්ධ වූ අන්ද්‍රෙව් අපෝස්තුළුවරයාගේ මංගල්‍යය",
    title: "එන්න, මා අනුගමනය කරන්න.",
    readings: "රෝම 10:9–18 | මතෙව් 4:18–22",
    reflection: "ජේසුස් වහන්සේ අන්ද්‍රෙව්තුමාව කැඳවූ විට, ඔහු ප්‍රමාද නොවී සියල්ල අත්හැර උන්වහන්සේ අනුගමනය කළේය. ජේසුස් වහන්සේගේ කැඳවීමට කිසිදු පැකිළීමකින් තොරව පිළිතුරු දීමට අන්ද්‍රෙව්තුමා අපට ආදර්ශයක් සපයයි. ඇතැම් විට අපගේම සැලසුම් හා කටයුතුවල කාර්යබහුල වීම නිසා දෙවියන් වහන්සේගේ හඬට සවන් දීමට අපට අමතක වේ. ජේසුස් වහන්සේ අනුගමනය කිරීම යනු උන්වහන්සේට මුල් තැන දෙමින්, උන්වහන්සේගේ ඉගැන්වීම් අනුව ජීවත් වීමයි. අන්ද්‍රෙව්තුමා මෙන් අප ද අන් අය ජේසුස් වහන්සේ වෙත ළං කිරීමට කැඳවනු ලැබ සිටිමු.",
    actTitle: "කෙනෙකු ජේසුස් වහන්සේ වෙත ළං කරන්න",
    activity: "අද ඔබ විසින්ම සකස් කරගත් දිරිගන්වනසුලු පණිවිඩයක් කෙනෙකුට යවන්න. කෙනෙකුට ඔබ සමඟ යාච්ඤා කිරීමට ආරාධනා කරන්න. නැතහොත් ජේසුස් වහන්සේ පිළිබඳ යහපත් පණිවිඩයක් තවත් කෙනෙකු සමඟ බෙදාගන්න."
  },
  {
    date: "12-01",
    title: "දෙවියන් වහන්සේගේ දෑසින් ලෝකය දෙස බලන්න.",
    readings: "යෙසායා 11:1–10 | ලූක් 10:21–24",
    reflection: "යෙසායා දිවැසිවරයා සාමයෙන් හා යුක්තියෙන් පිරුණු ලෝකයක් පිළිබඳව අනාවැකි පළ කරයි. නිහතමානී සිත් ඇත්තන්ට දෙවියන් වහන්සේ තමන් වහන්සේව හෙළි කරන බව ජේසුස් වහන්සේ අද ශුභාරංචිය තුළින් අපට පෙන්වා දෙන සේක. දෙවියන් වහන්සේ බලන්නේ අපගේ බාහිර පෙනුම හෝ තරාතිරම නොව, අපගේ හදවත දෙසය. දෙවියන් වහන්සේ ඔබ දෙස බලන්නේ කෙසේදැයි ඔබ කවදා හෝ සිතා තිබේද? අප කවුරුන් වුවත්, උන්වහන්සේ අප එකිනෙකාට ප්‍රේම කරන සේක. නිහතමානී වීමටත්, සෑම කෙනෙකුටම ගෞරව කිරීමටත්, අන් අය තුළ ඇති යහපත්කම හඳුනා ගැනීමටත් ආගමන සමය අපට ආරාධනා කරයි.",
    actTitle: "නිහතමානීකම පුරුදු කරන්න",
    activity: "කෙනෙකුට ඉවසිලිවන්තව සවන් දෙන්න. ඔහුගේ හෝ ඇයගේ අදහස් විනිශ්චය නොකර, කරුණාවෙන් හා ගෞරවයෙන් සලකන්න."
  },
  {
    date: "12-02",
    title: "ජේසුස් වහන්සේගේ හදවත කරුණාවෙන් පිරී ඇත.",
    readings: "යෙසායා 25:6–10අ | මතෙව් 15:29–37",
    reflection: "අද ශුභාරංචියේදී කුසගින්නෙන් සිටි ජන සමූහය දුටු ජේසුස් වහන්සේ ඔවුන් කෙරෙහි මහත් අනුකම්පාවක් දැක්වූ සේක. උන්වහන්සේ රොටි වැඩි කර ඔවුන්ට ආහාර ලබා දුන් සේක. මෙම සිදුවීම තුළින් අපට දැකගත හැක්කේ ජේසුස් වහන්සේගේ අසීමිත දයාව හා කරුණාවයි. අන් අයගේ දුක හා අවශ්‍යතා හඳුනාගෙන ඔවුන් වෙනුවෙන් ක්‍රියා කිරීමට අපව පොළඹවන්නේ සැබෑ කරුණාවයි. අන් අයට උපකාර කිරීමට අප සතුව බොහෝ දේ තිබීම අවශ්‍ය නැත. අපගේ කුඩා කරුණාවන්ත ක්‍රියාවකට පවා කෙනෙකුගේ ජීවිතයේ විශාල වෙනසක් ඇති කළ හැකිය.",
    actTitle: "ඔබ සතු දේ අන් අය සමඟ බෙදාගන්න",
    activity: "අද ඔබ අවට සිටින අයගේ අවශ්‍යතා පිළිබඳව සැලකිලිමත් වන්න. ඔබට හැකි පරිදි ආහාරයක්, ඔබගේ කාලය, දැනුම හෝ උපකාරයක් අවශ්‍ය කෙනෙකු සමඟ බෙදාගන්න."
  },
  {
    date: "12-03",
    feast: "ශුද්ධ වූ ෆ්‍රැන්සිස් සේවියර් මුනිතුමාගේ අනුස්මරණය",
    title: "ශක්තිමත් අත්තිවාරමක් මත ඔබේ ජීවිතය ගොඩනඟන්න.",
    readings: "යෙසායා 26:1–6 | මතෙව් 7:21, 24–27",
    reflection: "ජේසුස් වහන්සේගේ වචනයට සවන් දීම පමණක් ප්‍රමාණවත් නොවන බවත්, එය අපගේ ජීවිත තුළ ක්‍රියාවට නැංවිය යුතු බවත් උන්වහන්සේ අපට උගන්වන සේක. නිවසක් ස්ථිරව පවතින්නට ශක්තිමත් අත්තිවාරමක් අවශ්‍ය වන්නා සේම, අපගේ ජීවිතයට ද ශක්තිමත් ඇදහිල්ලක් අවශ්‍ය වේ. අපගේ ඇදහිල්ල අප කතා කරන ආකාරයෙන්, හැසිරෙන ආකාරයෙන් සහ අන් අයට සලකන ආකාරයෙන් පිළිබිඹු විය යුතුය. ජේසුස් වහන්සේගේ ඉගැන්වීම් දිනපතා ජීවිතයට එක් කරගැනීමට අපට බොහෝ අවස්ථාවන් ලැබේ.",
    actTitle: "ජේසුස් වහන්සේගේ ඉගැන්වීම් අනුව ජීවත් වන්න",
    activity: "අද විශේෂයෙන් පහත සඳහන් ක්‍රියාවන්ගෙන් එකක් හෝ කිහිපයක් කිරීමට උත්සාහ කරන්න.\n- කෝපයෙන් ප්‍රතිචාර නොදක්වා, කාරුණිකව කතා කරන්න.\n- අමනාපය සිතේ තබා නොගෙන, කෙනෙකුට සමාව දෙන්න.\n- ඉල්ලා සිටින තුරු බලා නොසිට, නිවසේ වැඩකටයුතුවලට උපකාර කරන්න.\n- අපහසු අවස්ථාවක වුවද සත්‍යය පවසන්න.\n\nමෙම ක්‍රියාවන් අතරින් අවම වශයෙන් එකක් තෝරාගෙන අද එය ක්‍රියාවට නංවන්න."
  },
  {
    date: "12-04",
    title: "ස්වාමීනි, මාගේ දෑස් විවර කළ මැනව!",
    readings: "යෙසායා 29:17–24 | මතෙව් 9:27–31",
    reflection: "අද ශුභාරංචියේදී විශ්වාසයෙන් යුතුව තමන් වහන්සේ වෙත පැමිණි අන්ධ මිනිසුන් දෙදෙනාට ජේසුස් වහන්සේ පෙනීම ලබා දෙන සේක. ඇතැම් විට අප අවට සිටින උපකාරය, ආදරය සහ අවධානය අවශ්‍ය කරන පුද්ගලයන්ව හඳුනා ගැනීමට අපට නොහැකි වේ. අපගේම කටයුතුවල කාර්යබහුලත්වය නිසා අන් අය මුහුණ දෙන දුෂ්කරතා පිළිබඳව අපට අවධානය යොමු කිරීමට නොහැකි විය හැකිය. අන් අයගේ අවශ්‍යතා හඳුනාගෙන ඔවුන් කෙරෙහි වඩාත් සැලකිලිමත් හා කාරුණික වීමට ආගමන සමය අපට ආරාධනා කරයි. අපගේ දෑස් පමණක් නොව, අපගේ හදවත් ද අන් අයගේ දුක හා අවශ්‍යතා කෙරෙහි විවෘත කරගනිමු.",
    actTitle: "ඔබෙන් ඔබ්බට බලා අන් අය ගැන සිතන්න",
    activity: "බොහෝ විට අන් අයගේ අවධානයට ලක් නොවන හෝ තනිව සිටින කෙනෙකු හඳුනාගන්න. අද ඔහු හෝ ඇය සමඟ යම් කාලයක් ගත කරමින්, කාරුණික වචනයක් හෝ උපකාරයක් ලබා දෙන්න."
  },
  {
    date: "12-05",
    title: "ඔබට නොමිලේ ලැබුණු දේ නොමිලේම දෙන්න.",
    readings: "යෙසායා 30:19–21, 23–26 | මතෙව් 9:35–10:1, 5අ, 6–8",
    reflection: "ජේසුස් වහන්සේ ජනතාව දෙස ප්‍රේමයෙන් හා අනුකම්පාවෙන් බලා, ඔවුන්ට උපකාර කිරීම සඳහා තම ශ්‍රාවකයන් යැවූ සේක. තමන්ට නොමිලේ ලැබුණු දේ නොමිලේම ලබා දෙන ලෙස උන්වහන්සේ ඔවුන්ට උපදෙස් දුන් සේක. අප සතු සියල්ල දෙවියන් වහන්සේගෙන් ලැබුණු තිළිණයන්ය. අපගේ දක්ෂතා, කාලය සහ අපට ලැබී ඇති ආශීර්වාද අන් අය සමඟ බෙදාගැනීමට අපි කැඳවනු ලැබ සිටිමු. අපගේ වචනවලින් පමණක් නොව, අපගේ ක්‍රියාවන් තුළින් ද දෙවියන් වහන්සේගේ ප්‍රේමය අන් අය වෙත ගෙන යමු.",
    actTitle: "කෙනෙකුට ආශීර්වාදයක් වන්න",
    activity: "කිසිදු ප්‍රතිලාභයක් බලාපොරොත්තු නොවී අද කෙනෙකු වෙනුවෙන් යහපත් දෙයක් කරන්න. අවශ්‍ය කෙනෙකුට උපකාර කරන්න, මිතුරෙකු දිරිමත් කරන්න, නැතහොත් යම් අවශ්‍යතාවක සිටින කෙනෙකු වෙනුවෙන් යාච්ඤා කරන්න."
  }
];

// Tamil (தமிழ்) — same fields, from "திருவருகைக் காலத்தின் முதல் வாரம்".
const TAMIL = [
  // ---------------- திருவருகைக் காலத்தின் முதல் வாரம் ----------------
  {
    date: "11-29",
    title: "விழிப்பாயிருந்து தயாராக இருங்கள்",
    reflection: "இயேசுவின் வருகைக்காக நாம் விழிப்பாயிருந்து தயாராக இருக்க வேண்டும் என்று இயேசு நமக்கு அழைப்பு விடுக்கிறார். இது பயத்துடன் வாழ வேண்டும் என்பதைக் குறிக்கவில்லை. மாறாக, ஒவ்வொரு நாளும் விசுவாசத்துடனும் அன்புடனும் வாழ வேண்டும் என்பதையே குறிக்கிறது.\n\nசில நேரங்களில் நமது அன்றாட வேலைகளிலும் பொறுப்புகளிலும் மூழ்கி, இறைவனை மறந்து விடுகிறோம். திருவருகைக் காலம் இறைவனுக்காக நேரத்தை ஒதுக்கவும், இயேசுவை வரவேற்க நமது இதயங்களைத் தயார்படுத்தவும் நமக்கு நினைவூட்டுகிறது.\n\nகிறிஸ்துமஸ் வரும் வரை நமது வாழ்க்கையில் மாற்றத்தை ஏற்படுத்தக் காத்திருக்க வேண்டாம். அந்த மாற்றத்தை இன்றே ஆரம்பிப்போம்.",
    actTitle: "இறைவனுக்காக நேரத்தை ஒதுக்குவோம்",
    activity: "இன்று குறைந்தது 15 நிமிடங்களாவது தனிமையில் இறைவனுடன் செபத்தில் செலவிடுங்கள். உங்களை இறைவனிடமிருந்து விலகச் செய்யும் ஒரு பழக்கத்தைச் சிந்தித்து, அதனை மாற்ற முயற்சி செய்யுங்கள்."
  },
  {
    date: "11-30",
    feast: "திருத்தூதர் புனித அந்திரேயாவின் திருநாள்",
    title: "வாரும், என்னைப் பின்தொடருங்கள்",
    readings: "உரோமையர் 10:9–18 | மத்தேயு 4:18–22",
    reflection: "இயேசு அந்திரேயாவை அழைத்தபோது, அவர் அனைத்தையும் விட்டுவிட்டு இயேசுவைப் பின்தொடர்ந்தார். இயேசுவுக்கு எவ்விதத் தாமதமுமின்றி 'ஆம்' என்று பதிலளிக்க வேண்டும் என்பதைப் புனித அந்திரேயா நமக்குக் கற்றுத் தருகிறார்.\n\nசில நேரங்களில் நாம் சந்தேகப்படுகிறோம் அல்லது நமது சொந்தத் திட்டங்களிலும் வேலைகளிலும் மூழ்கி இறைவனின் குரலைக் கேட்க மறந்து விடுகிறோம். இயேசுவைப் பின்பற்றுவது என்பது அவருக்கு முதலிடம் கொடுத்து, அவரது போதனைகளின்படி வாழ்வதாகும்.\n\nபுனித அந்திரேயாவைப் போல நாமும் மற்றவர்களை இயேசுவின் அருகில் அழைத்துச் செல்ல அழைக்கப்பட்டுள்ளோம்.",
    actTitle: "ஒருவரை கிறிஸ்துவின் அருகில் அழைத்துச் செல்வோம்",
    activity: "இன்று நீங்களாகவே தயாரித்த ஓர் ஊக்கமளிக்கும் செய்தியை ஒருவருக்கு அனுப்புங்கள். உங்களுடன் இணைந்து செபிக்க ஒருவரை அழையுங்கள் அல்லது இயேசுவைப் பற்றிய ஓர் அன்பான வார்த்தையை ஒருவருடன் பகிர்ந்து கொள்ளுங்கள்."
  },
  {
    date: "12-01",
    title: "இறைவனின் பார்வையில் உலகைப் பார்ப்போம்",
    readings: "எசாயா 11:1–10 | லூக்கா 10:21–24",
    reflection: "அமைதியும் நீதியும் நிறைந்த ஓர் உலகத்தைப் பற்றி இறைவாக்கினர் எசாயா எடுத்துரைக்கிறார். தாழ்மையான உள்ளம் கொண்டவர்களுக்கே இறைவன் தம்மை வெளிப்படுத்துகிறார் என்பதை இயேசு நற்செய்தியில் நமக்கு நினைவூட்டுகிறார்.\n\nஇறைவன் நமது வெளித்தோற்றத்தை விட இதயத்தையே பார்க்கிறார். இறைவன் உங்களை எவ்வாறு பார்க்கிறார் என்று நீங்கள் எப்போதாவது சிந்தித்ததுண்டா? நாம் யாராக இருந்தாலும், நம்மை அவர் அன்புடனும் மதிப்புடனும் பார்க்கிறார்.\n\nதிருவருகைக் காலம் தாழ்மையுடன் வாழவும், ஒவ்வொருவரையும் மதிக்கவும், மற்றவர்களிடம் காணப்படும் நன்மைகளை உணரவும் நமக்கு அழைப்பு விடுக்கிறது.",
    actTitle: "தாழ்மையைப் பழகுவோம்",
    activity: "இன்று ஒருவரின் கருத்தைக் பொறுமையுடன் செவிமடுங்கள். அவரைத் தீர்ப்பிடாமல், அன்புடனும் மரியாதையுடனும் நடத்துங்கள்."
  },
  {
    date: "12-02",
    title: "இயேசு = இரக்கம்",
    readings: "எசாயா 25:6–10அ | மத்தேயு 15:29–37",
    reflection: "நற்செய்தியில், பசியுடன் இருந்த மக்களைக் கண்ட இயேசு அவர்கள் மீது ஆழ்ந்த இரக்கம் கொள்கிறார். அவர் அப்பங்களைப் பெருகச் செய்து மக்களுக்கு உணவளிக்கிறார்.\n\nஇங்கு நாம் உணர வேண்டிய மிகப்பெரிய அதிசயம் அப்பங்கள் பெருகியதல்ல; மாறாக, இயேசுவின் ஆழ்ந்த இரக்கமே ஆகும்.\n\nஇரக்கமுள்ள இதயம் நம்மால் செய்யப்படும் ஒவ்வொரு செயலையும் சிறப்பானதாக மாற்றுகிறது. மற்றவர்களுக்கு உதவுவதற்கு நம்மிடம் அதிகமான செல்வமோ பொருட்களோ இருக்க வேண்டிய அவசியமில்லை. நம்மால் செய்யப்படும் ஒரு சிறிய இரக்கச் செயலும் ஒருவரின் வாழ்க்கையில் பெரிய மாற்றத்தை ஏற்படுத்தலாம்.",
    actTitle: "உங்களிடம் இருப்பதைப் பகிர்ந்து கொள்வோம்",
    activity: "இன்று ஒருவருடைய தேவைகளைக் கவனியுங்கள். அது உணவாகவோ, உங்கள் நேரமாகவோ, அறிவாகவோ அல்லது உதவும் கரமாகவோ இருக்கலாம். உங்களால் முடிந்ததை மற்றவர்களுடன் பகிர்ந்து கொள்ளுங்கள்."
  },
  {
    date: "12-03",
    feast: "புனித பிரான்சிஸ் சவேரியாரின் நினைவுத் திருநாள்",
    title: "உறுதியான அடித்தளத்தின் மீது நமது வாழ்க்கையைக் கட்டியெழுப்புவோம்",
    readings: "எசாயா 26:1–6 | மத்தேயு 7:21, 24–27",
    reflection: "இறைவார்த்தையைக் கேட்பது மட்டுமே போதாது; அதன்படி நாம் செயல்படவும் வேண்டும் என்று இயேசு நமக்குக் கற்பிக்கிறார்.\n\nஒரு வீடு உறுதியாக நிலைத்து நிற்பதற்கு வலுவான அடித்தளம் அவசியம். அதுபோலவே, நமது வாழ்க்கையும் விசுவாசம் என்னும் உறுதியான அடித்தளத்தின் மீது கட்டியெழுப்பப்பட வேண்டும்.\n\nநமது விசுவாசம் நாம் பேசும் வார்த்தைகளிலும், நடந்துகொள்ளும் விதத்திலும், மற்றவர்களை நடத்தும் முறையிலும் வெளிப்பட வேண்டும்.\n\nஅன்றாட வாழ்க்கையின் ஒவ்வொரு தருணமும் இயேசுவின் போதனைகளைச் செயல்படுத்த நமக்குக் கிடைக்கும் ஒரு வாய்ப்பாகும்.",
    actTitle: "இயேசுவின் போதனைகளின்படி செயல்படுவோம்",
    activity: "இன்று பின்வரும் செயல்களில் குறைந்தது ஒன்றையாவது சிறப்பாகச் செய்ய முயற்சி செய்யுங்கள்:\n- கோபப்படுவதற்குப் பதிலாக அன்பான வார்த்தைகளைப் பேசுங்கள்.\n- மனக்கசப்பை வைத்திருப்பதற்குப் பதிலாக ஒருவரை மன்னியுங்கள்.\n- வீட்டில் யாராவது கேட்கும் வரை காத்திருக்காமல், நீங்களாகவே உதவி செய்யுங்கள்.\n- கடினமாக இருந்தாலும் நேர்மையாக நடந்துகொள்ளுங்கள்.\n\nஇந்தச் செயல்களில் குறைந்தது ஒன்றையாவது இன்று உங்கள் வாழ்க்கையில் நடைமுறைப்படுத்துங்கள்."
  },
  {
    date: "12-04",
    title: "ஆண்டவரே, என் கண்களைத் திறந்தருளும்",
    readings: "எசாயா 29:17–24 | மத்தேயு 9:27–31",
    reflection: "இன்றைய நற்செய்தியில், நம்பிக்கையுடன் தம்மிடம் வந்த பார்வையற்ற இருவருக்கும் இயேசு பார்வையளிக்கிறார்.\n\nசில நேரங்களில் நம்மைச் சுற்றியுள்ள உதவி, அன்பு மற்றும் கவனம் தேவைப்படும் மனிதர்களைக் கவனிக்கத் தவறிவிடுகிறோம். நமது சொந்த வாழ்க்கையின் வேலைப்பளுவில் மூழ்கி, மற்றவர்களின் துன்பங்களையும் தேவைகளையும் காணத் தவறுகிறோம்.\n\nதிருவருகைக் காலம் நமது கண்களைத் திறந்து, மற்றவர்களிடம் அதிக அக்கறையும் கரிசனையும் காட்டும் மனிதர்களாக வாழ நமக்கு அழைப்பு விடுக்கிறது.\n\nநம்மைச் சுற்றியுள்ளவர்களின் தேவைகளைக் கவனித்து, அன்புடன் பதிலளிக்கக் கற்றுக்கொள்வோம்.",
    actTitle: "உங்களைத் தாண்டி மற்றவர்களையும் கவனிப்போம்",
    activity: "பெரும்பாலும் மற்றவர்களால் கவனிக்கப்படாமல் அல்லது ஒதுக்கப்பட்டு இருக்கும் ஒருவரைக் கவனியுங்கள். அவருடன் சிறிது நேரம் செலவிடுங்கள். அன்பான வார்த்தை ஒன்றைக் கூறுங்கள் அல்லது உங்களால் முடிந்த உதவியைச் செய்யுங்கள்."
  },
  {
    date: "12-05",
    title: "இலவசமாகப் பெற்றுக்கொண்டீர்கள்; இலவசமாகக் கொடுங்கள்",
    readings: "எசாயா 30:19–21, 23–26 | மத்தேயு 9:35–10:1, 5அ, 6–8",
    reflection: "இயேசு மக்களை அன்புடனும் இரக்கத்துடனும் நோக்கி, அவர்களுக்கு உதவுவதற்காகத் தமது சீடர்களை அனுப்புகிறார். நீங்கள் இலவசமாகப் பெற்றுக்கொண்டதை இலவசமாகக் கொடுங்கள் என்று அவர்களுக்கு நினைவூட்டுகிறார்.\n\nநம்மிடம் இருப்பவை அனைத்தும் இறைவன் நமக்கு வழங்கிய கொடைகளாகும். நமது திறமைகள், நேரம் மற்றும் ஆசீர்வாதங்கள் அனைத்தும் மற்றவர்களுடன் பகிர்ந்து கொள்வதற்காகவே நமக்குக் கொடுக்கப்பட்டுள்ளன.\n\nநமது செயல்களின் மூலம் இறைவனின் அன்பை மற்றவர்களுக்குப் பரப்ப நாம் அழைக்கப்பட்டுள்ளோம்.",
    actTitle: "ஒருவருக்கு ஆசீர்வாதமாக மாறுவோம்",
    activity: "இன்று எவ்விதப் பிரதிபலனையும் எதிர்பார்க்காமல் ஒருவருக்கு நன்மை செய்யுங்கள். ஒருவருக்கு உதவுங்கள், நண்பர் ஒருவரை உற்சாகப்படுத்துங்கள் அல்லது தேவையில் இருக்கும் ஒருவருக்காகச் செபியுங்கள்."
  }
];

// ---- Builds the full season (29 Nov – 25 Dec). No need to edit below. ----
function buildDays() {
  const byDate = {}, siByDate = {}, taByDate = {};
  ENGLISH.forEach(e => { byDate[e.date] = e; });
  SINHALA.forEach(e => { siByDate[e.date] = e; });
  TAMIL.forEach(e => { taByDate[e.date] = e; });
  const pack = e => e ? {
    title: e.title, feast: e.feast || "", readings: e.readings || "",
    reflection: e.reflection, actTitle: e.actTitle || "", activity: e.activity
  } : null;
  const days = [];
  const start = new Date(2026, 10, 29), end = new Date(2026, 11, 25);
  for (let d = new Date(start), i = 1; d <= end; d.setDate(d.getDate() + 1), i++) {
    const date = String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const e = byDate[date];
    const en = pack(e);
    // Sinhala and Tamil fall back to English for any day not translated yet.
    const si = pack(siByDate[date]) || en;
    const ta = pack(taByDate[date]) || en;
    days.push({ day: i, date, img: (e && e.img) || "", en, si, ta });
  }
  return days;
}

window.ADVENT_CONTENT = { days: buildDays() };
