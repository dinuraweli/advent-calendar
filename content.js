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

// ---- Builds the full season (29 Nov – 25 Dec). No need to edit below. ----
function buildDays() {
  const byDate = {};
  ENGLISH.forEach(e => { byDate[e.date] = e; });
  const days = [];
  const start = new Date(2026, 10, 29), end = new Date(2026, 11, 25);
  for (let d = new Date(start), i = 1; d <= end; d.setDate(d.getDate() + 1), i++) {
    const date = String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const e = byDate[date];
    const en = e ? {
      title: e.title, feast: e.feast || "", readings: e.readings || "",
      reflection: e.reflection, actTitle: e.actTitle || "", activity: e.activity
    } : null;
    // Sinhala / Tamil text has not been provided yet, so they show English.
    days.push({ day: i, date, img: (e && e.img) || "", en, si: en, ta: en });
  }
  return days;
}

window.ADVENT_CONTENT = { days: buildDays() };
