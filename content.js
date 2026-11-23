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
    title: "Stay Awake and Be Ready",
    reflection: "Jesus invites us to stay awake and be ready for His coming. This does not mean living in fear, but living each day with faith and love. Sometimes we become busy with our daily activities and forget God. Advent reminds us to make time for God and prepare our hearts for Jesus. Let us not wait until Christmas to change. Let us begin today.",
    actTitle: "Make Time for God",
    activity: "Spend at least 15 minutes in prayer privately today. Think of one habit that takes you away from God and try to change it."
  },
  {
    date: "11-30",
    feast: "Feast of St. Andrew, Apostle",
    title: "Come, Follow Me",
    readings: "Romans 10:9–18 | Matthew 4:18–22",
    reflection: "When Jesus called Andrew, he left everything and followed Him. Andrew teaches us to say ‘Yes’ to Jesus without delay. Sometimes we doubt or get so busy with our own plans that we forget to listen to God. Following Jesus means putting Him first and living by His teachings. Like Andrew, we are also called to bring others closer to Jesus.",
    actTitle: "Bring Someone Closer to Christ",
    activity: "Send an encouraging message prepared by you to someone today. Invite someone to pray with you or share a kind word about Jesus with someone."
  },
  {
    date: "12-01",
    title: "See the World Through God’s Eyes",
    readings: "Isaiah 11:1–10 | Luke 10:21–24",
    reflection: "Isaiah speaks about a world filled with peace and justice. In the Gospel, Jesus reminds us that God reveals Himself to those who are humble. God looks at the heart. Have you ever thought about how God looks at you? He surely respects us no matter who we are. Advent invites us to be humble, respect everyone, and see the goodness in others.",
    actTitle: "Practice Humility",
    activity: "Listen patiently to someone, and do not judge, but treat the person with kindness and respect."
  },
  {
    date: "12-02",
    title: "Jesus = Compassion",
    readings: "Isaiah 25:6–10a | Matthew 15:29–37",
    reflection: "In the Gospel, Jesus sees the hungry crowd and feels compassion for them. He multiplies the food and feeds them. The miracle here is not the multiplication of bread but the compassion of Jesus. Compassion makes everything great. We do not need to have a lot to help others. Even a small act of compassion can make a difference.",
    actTitle: "Share What You Have",
    activity: "Be sensitive to the needs of someone today. It could be food, your time, your knowledge, or a helping hand."
  },
  {
    date: "12-03",
    feast: "Memorial of St. Francis Xavier",
    title: "Build Your Life on a Strong Foundation",
    readings: "Isaiah 26:1–6 | Matthew 7:21, 24–27",
    reflection: "Jesus teaches us that it is not enough to listen to His Word; we must put it into practice. Just as a house needs a strong foundation to stand firm, our lives need a strong foundation of faith. Our faith should be seen in the way we speak, behave, and treat others. Everyday life gives us opportunities to live what Jesus teaches us.",
    actTitle: "Practise What Jesus Teaches",
    activity: "Today, make a special effort to:\n- Speak kindly instead of getting angry.\n- Forgive someone instead of holding a grudge.\n- Help at home without waiting to be asked.\n- Be honest, even when it is difficult.\n\nChoose at least one of these actions and put it into practice today."
  },
  {
    date: "12-04",
    title: "Lord, Open My Eyes",
    readings: "Isaiah 29:17–24 | Matthew 9:27–31",
    reflection: "In today’s Gospel, Jesus gives sight to two blind men who come to Him with faith. Sometimes we fail to notice the people around us who need our help, love, and attention. We may be too busy with our own lives to see their struggles. Advent invites us to open our eyes and become more caring and thoughtful towards others. Let us learn to notice the needs of those around us and respond with love.",
    actTitle: "Look Beyond Yourself",
    activity: "Notice someone who is often ignored or left out. Spend some time with that person and offer a kind word or a helping hand."
  },
  {
    date: "12-05",
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

// ---- Builds the full season (29 Nov – 25 Dec). No need to edit below. ----
function buildDays() {
  const byDate = {}, siByDate = {};
  ENGLISH.forEach(e => { byDate[e.date] = e; });
  SINHALA.forEach(e => { siByDate[e.date] = e; });
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
    // Sinhala falls back to English for any day not translated yet;
    // Tamil text has not been provided yet, so it shows English.
    const si = pack(siByDate[date]) || en;
    days.push({ day: i, date, img: (e && e.img) || "", en, si, ta: en });
  }
  return days;
}

window.ADVENT_CONTENT = { days: buildDays() };
