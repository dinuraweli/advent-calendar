/* =====================================================================
   ADVENT CALENDAR — CONTENT  (Advent 2026: Sun 29 Nov → Fri 25 Dec)
   ---------------------------------------------------------------------
   HOW TO EDIT (for Sunday school volunteers):
   - Each day below is one entry, in date order. Keep the quotation
     marks and commas exactly as they are.
   - date       = "MM-DD". The calendar unlocks the day on that date.
   - img        = picture file in assets/days/ (leave "" for none).
   - feast      = optional saint's day / feast shown above the title.
   - title      = the day's theme.
   - verse      = the scripture text shown on the scroll.
   - reference  = where the verse is from, e.g. "Mark 13:33".
   - readings   = optional: the day's full Mass readings.
   - reflection = the reflection (a blank line "\n\n" starts a new paragraph).
   - actTitle   = optional heading for the day's task.
   - activity   = the day's task. Lines starting with "- " become a list.
   - After editing, bump CACHE_VERSION in sw.js so phones get the update.

   Week 1 (29 Nov – 5 Dec) comes from the Sunday school's "First Week of
   Advent" reflections. The short key verse on each of those days was
   added from that day's Gospel. Weeks 2–4 are drafts to review.
   Scripture is from the World English Bible (public domain).
   ===================================================================== */

const ENGLISH = [
  // ---------------- WEEK 1 · First Sunday of Advent · Hope ----------------
  {
    date: "11-29",   img: "",
    title: "Stay Awake and Be Ready",
    verse: "Watch, keep alert, and pray; for you don’t know when the time is.",
    reference: "Mark 13:33",   readings: "Isaiah 63:16–17, 19; 64:2–7 | 1 Corinthians 1:3–9 | Mark 13:33–37",
    reflection: "Jesus invites us to stay awake and be ready for His coming. This does not mean living in fear, but living each day with faith and love. Sometimes we become busy with our daily activities and forget God. Advent reminds us to make time for God and prepare our hearts for Jesus. Let us not wait until Christmas to change. Let us begin today.",
    actTitle: "Make Time for God",
    activity: "Spend at least 15 minutes in prayer privately today. Think of one habit that takes you away from God and try to change it."
  },
  {
    date: "11-30",   img: "",   feast: "Feast of St. Andrew, Apostle",
    title: "Come, Follow Me",
    verse: "He said to them, “Come after me, and I will make you fishers for men.” They immediately left their nets and followed him.",
    reference: "Matthew 4:19–20",   readings: "Romans 10:9–18 | Matthew 4:18–22",
    reflection: "When Jesus called Andrew, he left everything and followed Him. Andrew teaches us to say ‘Yes’ to Jesus without delay. Sometimes we doubt or get so busy with our own plans that we forget to listen to God. Following Jesus means putting Him first and living by His teachings. Like Andrew, we are also called to bring others closer to Jesus.",
    actTitle: "Bring Someone Closer to Christ",
    activity: "Send an encouraging message prepared by you to someone today. Invite someone to pray with you or share a kind word about Jesus with someone."
  },
  {
    date: "12-01",   img: "",
    title: "See the World Through God’s Eyes",
    verse: "I thank you, O Father, Lord of heaven and earth, that you have hidden these things from the wise and understanding, and revealed them to little children.",
    reference: "Luke 10:21",   readings: "Isaiah 11:1–10 | Luke 10:21–24",
    reflection: "Isaiah speaks about a world filled with peace and justice. In the Gospel, Jesus reminds us that God reveals Himself to those who are humble. God looks at the heart. Have you ever thought about how God looks at you? He surely respects us no matter who we are. Advent invites us to be humble, respect everyone, and see the goodness in others.",
    actTitle: "Practice Humility",
    activity: "Listen patiently to someone, and do not judge, but treat the person with kindness and respect."
  },
  {
    date: "12-02",   img: "",
    title: "Jesus = Compassion",
    verse: "Jesus summoned his disciples and said, “I have compassion on the multitude, because they continue with me now three days and have nothing to eat.”",
    reference: "Matthew 15:32",   readings: "Isaiah 25:6–10a | Matthew 15:29–37",
    reflection: "In the Gospel, Jesus sees the hungry crowd and feels compassion for them. He multiplies the food and feeds them. The miracle here is not the multiplication of bread but the compassion of Jesus. Compassion makes everything great. We do not need to have a lot to help others. Even a small act of compassion can make a difference.",
    actTitle: "Share What You Have",
    activity: "Be sensitive to the needs of someone today. It could be food, your time, your knowledge, or a helping hand."
  },
  {
    date: "12-03",   img: "",   feast: "Memorial of St. Francis Xavier",
    title: "Build Your Life on a Strong Foundation",
    verse: "Everyone therefore who hears these words of mine and does them, I will liken him to a wise man who built his house on a rock.",
    reference: "Matthew 7:24",   readings: "Isaiah 26:1–6 | Matthew 7:21, 24–27",
    reflection: "Jesus teaches us that it is not enough to listen to His Word; we must put it into practice. Just as a house needs a strong foundation to stand firm, our lives need a strong foundation of faith. Our faith should be seen in the way we speak, behave, and treat others. Everyday life gives us opportunities to live what Jesus teaches us.",
    actTitle: "Practise What Jesus Teaches",
    activity: "Today, make a special effort to:\n- Speak kindly instead of getting angry.\n- Forgive someone instead of holding a grudge.\n- Help at home without waiting to be asked.\n- Be honest, even when it is difficult.\n\nChoose at least one of these actions and put it into practice today."
  },
  {
    date: "12-04",   img: "",
    title: "Lord, Open My Eyes",
    verse: "Then he touched their eyes, saying, “According to your faith be it done to you.” Their eyes were opened.",
    reference: "Matthew 9:29–30",   readings: "Isaiah 29:17–24 | Matthew 9:27–31",
    reflection: "In today’s Gospel, Jesus gives sight to two blind men who come to Him with faith. Sometimes we fail to notice the people around us who need our help, love, and attention. We may be too busy with our own lives to see their struggles. Advent invites us to open our eyes and become more caring and thoughtful towards others. Let us learn to notice the needs of those around us and respond with love.",
    actTitle: "Look Beyond Yourself",
    activity: "Notice someone who is often ignored or left out. Spend some time with that person and offer a kind word or a helping hand."
  },
  {
    date: "12-05",   img: "",
    title: "Freely You Have Received, Freely Give",
    verse: "Heal the sick, cleanse the lepers, and cast out demons. Freely you received, so freely give.",
    reference: "Matthew 10:8",   readings: "Isaiah 30:19–21, 23–26 | Matthew 9:35–10:1, 5a, 6–8",
    reflection: "Jesus looks at the people with love and compassion and sends His disciples to help them. He reminds them to give freely what they have freely received. Everything we have is a gift from God. Our talents, time and blessings are meant to be shared with others. We are called to spread God’s love through our actions.",
    actTitle: "Become a Blessing to Someone",
    activity: "Do something good for someone today without expecting anything in return. Help someone, encourage a friend, or pray for someone in need."
  },

  // ---------------- WEEKS 2–4 + CHRISTMAS (drafts to review) --------------
  {
    date: "12-06",   img: "day-01.jpg",
    title: "The prophecy foretold",
    verse: "For a child is born to us. A son is given to us; and the government will be on his shoulders. His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    reference: "Isaiah 9:6",
    reflection: "Long before Jesus was born, God made a promise that a special child would come. God's people waited and waited for hundreds of years. God always keeps his promises, even when we have to wait.",
    activity: "Make a paper chain with one link for each day until Christmas. Tear one off every morning as you wait.",
    si_title: "අනාවැකිය පැවසෙයි", ta_title: "தீர்க்கதரிசனம் உரைக்கப்படுகிறது"
  },
  {
    date: "12-07",   img: "day-02.jpg",
    title: "The little town of Bethlehem",
    verse: "But you, Bethlehem Ephrathah, being small among the clans of Judah, out of you one will come out to me that is to be ruler in Israel.",
    reference: "Micah 5:2",
    reflection: "Bethlehem was a small, ordinary town, but God chose it for the biggest event in history. God loves to use little things and little people to do great things. You are never too small to matter to God.",
    activity: "Draw your own town or street. Add a small star somewhere to remember that God sees you there.",
    si_title: "බෙත්ලෙහෙම් කුඩා නගරය", ta_title: "பெத்லகேம் எனும் சிறு நகரம்"
  },
  {
    date: "12-08",   img: "day-03.jpg",
    title: "The angel appears to Mary",
    verse: "The angel said to her, “Don't be afraid, Mary, for you have found favor with God. Behold, you will conceive in your womb and give birth to a son, and will name him ‘Jesus.’”",
    reference: "Luke 1:30–31",
    reflection: "Mary was surprised and maybe a little scared when the angel Gabriel visited her. But she trusted God and said yes to his plan. We can say yes to God too, even when we don't understand everything.",
    activity: "Think of one thing you can say “yes” to today without complaining, like helping at home, and do it cheerfully.",
    si_title: "දේවදූතයා මරියට පෙනී සිටී", ta_title: "தூதன் மரியாளுக்குத் தோன்றுகிறார்"
  },
  {
    date: "12-09",   img: "day-04.jpg",
    title: "Joseph's dream",
    verse: "She shall give birth to a son. You shall name him Jesus, for it is he who shall save his people from their sins.",
    reference: "Matthew 1:21",
    reflection: "Joseph was worried, but God spoke to him in a dream and told him not to be afraid. Joseph listened and obeyed right away. The name Jesus means “God saves.”",
    activity: "Ask a grown-up why they chose your name, or what it means. Then thank God that he knows you by name.",
    si_title: "යෝසෙප්ගේ සිහිනය", ta_title: "யோசேப்பின் கனவு"
  },
  {
    date: "12-10",   img: "day-05.jpg",
    title: "The journey to Bethlehem",
    verse: "Joseph also went up from Galilee, out of the city of Nazareth, into Judea, to the city of David, which is called Bethlehem, because he was of the house and family of David, to enroll himself with Mary, who was pledged to be married to him as wife, being pregnant.",
    reference: "Luke 2:4–5",
    reflection: "Mary and Joseph had to make a long, tiring journey to Bethlehem. It was not easy, but God was with them every step of the way. God is with us on our journeys too.",
    activity: "Count how many steps it takes to walk around your home. Say a prayer for people who are travelling this Christmas.",
    si_title: "බෙත්ලෙහෙමට ගමන", ta_title: "பெத்லகேமுக்குப் பயணம்"
  },
  {
    date: "12-11",   img: "day-06.jpg",
    title: "No room at the inn",
    verse: "She gave birth to her firstborn son. She wrapped him in bands of cloth, and laid him in a feeding trough, because there was no room for them in the inn.",
    reference: "Luke 2:7",
    reflection: "When Mary and Joseph arrived, there was no room for them anywhere. So the King of the whole world was born in a place where animals were kept. Jesus wants us to make room for him in our hearts.",
    activity: "Make room for someone today: share a toy, save a seat, or invite someone to join your game.",
    si_title: "නවාතැනේ ඉඩක් නැත", ta_title: "விடுதியில் இடம் இல்லை"
  },
  {
    date: "12-12",   img: "",
    title: "The shepherds in the fields",
    verse: "There were shepherds in the same country staying in the field, and keeping watch by night over their flock.",
    reference: "Luke 2:8",
    reflection: "The shepherds were ordinary workers, out in the cold fields at night looking after their sheep. Nobody thought they were important. But God chose them to hear the good news first!",
    activity: "Make a sheep from cotton wool and paper. Remember that Jesus is our Good Shepherd who looks after us.",
    si_title: "කෙත්වල එඬේරුන්", ta_title: "வயல்களில் மேய்ப்பர்கள்"
  },
  {
    date: "12-13",   img: "day-09.jpg",
    title: "The angel appears to the shepherds",
    verse: "The angel said to them, “Don't be afraid, for behold, I bring you good news of great joy which will be to all the people. For there is born to you today, in David's city, a Savior, who is Christ the Lord.”",
    reference: "Luke 2:10–11",
    reflection: "The angel's first words were “Don't be afraid!” The news was good news, and it was for everyone. Jesus came for all people, everywhere, including you.",
    activity: "Tell someone a piece of good news today, and tell them that Jesus is good news too.",
    si_title: "දේවදූතයා එඬේරුන්ට පෙනී සිටී", ta_title: "தூதன் மேய்ப்பர்களுக்குத் தோன்றுகிறார்"
  },
  {
    date: "12-14",   img: "day-10.jpg",
    title: "The heavenly host",
    verse: "Suddenly, there was with the angel a multitude of the heavenly army praising God, and saying, “Glory to God in the highest, on earth peace, good will toward men.”",
    reference: "Luke 2:13–14",
    reflection: "Suddenly the sky was filled with angels singing praise to God! Heaven was so happy that Jesus had come. We can join the angels' song with our own voices.",
    activity: "Sing your favourite Christmas carol with your family, as loudly and joyfully as the angels.",
    si_title: "ස්වර්ගීය දූත සමූහය", ta_title: "பரலோக சேனை"
  },
  {
    date: "12-15",   img: "day-12.jpg",
    title: "The shepherds adore the Christ child",
    verse: "They came with haste, and found both Mary and Joseph, and the baby was lying in the feeding trough.",
    reference: "Luke 2:16",
    reflection: "The shepherds found everything just as the angel had said. They saw baby Jesus with their own eyes and worshipped him. Imagine how amazed and happy they must have been!",
    activity: "Close your eyes and imagine you are a shepherd seeing baby Jesus. What would you say to him? Tell him in a prayer.",
    si_title: "එඬේරුන් ක්‍රිස්තු බිළිඳාට නමස්කාර කරති", ta_title: "மேய்ப்பர்கள் குழந்தையை ஆராதிக்கிறார்கள்"
  },
  {
    date: "12-16",   img: "day-14.jpg",
    title: "Mary treasures these things",
    verse: "But Mary kept all these sayings, pondering them in her heart.",
    reference: "Luke 2:19",
    reflection: "Mary took time to be quiet and think about all the wonderful things God had done. Christmas can be very busy. It's good to stop and remember what God has done for us.",
    activity: "Find a quiet spot and sit still for two minutes. Think about something wonderful God has done for you.",
    si_title: "මරිය මේ සියල්ල සිතේ රැක ගනී", ta_title: "மரியாள் இவற்றை இதயத்தில் போற்றுகிறாள்"
  },
  {
    date: "12-17",   img: "day-15.jpg",
    title: "The Star of Bethlehem",
    verse: "A star will come out of Jacob. A scepter will rise out of Israel.",
    reference: "Numbers 24:17",
    reflection: "Long ago, God promised that a star would point to a great King. When Jesus was born, a bright new star appeared in the sky. Jesus is the light that shines in the dark.",
    activity: "Cut out a paper star and decorate it. Put it in a window where others can see it.",
    si_title: "බෙත්ලෙහෙම් තරුව", ta_title: "பெத்லகேம் நட்சத்திரம்"
  },
  {
    date: "12-18",   img: "day-16.jpg",
    title: "The wise men see the star",
    verse: "Wise men from the east came to Jerusalem, saying, “Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.”",
    reference: "Matthew 2:1–2",
    reflection: "Far away in the east, wise men saw the new star and knew it meant a King had been born. They were not from Israel, but God invited them too. God's love is for people from every country.",
    activity: "Look at a map or globe. Pick a country far away and pray for the children who live there.",
    si_title: "ඥානවන්තයෝ තරුව දකිති", ta_title: "ஞானிகள் நட்சத்திரத்தைக் காண்கிறார்கள்"
  },
  {
    date: "12-19",   img: "day-17.jpg",
    title: "The wise men journey",
    verse: "The star, which they saw in the east, went before them until it came and stood over where the young child was.",
    reference: "Matthew 2:9",
    reflection: "The wise men travelled a very long way, following the star. They kept going even when the journey was hard. God guides us too, if we keep following him.",
    activity: "Play a “follow the leader” game. Then talk about how we can follow Jesus every day.",
    si_title: "ඥානවන්තයන්ගේ ගමන", ta_title: "ஞானிகளின் பயணம்"
  },
  {
    date: "12-20",   img: "day-19.jpg",
    title: "The wise men find the child",
    verse: "They came into the house and saw the young child with Mary, his mother.",
    reference: "Matthew 2:11",
    reflection: "The wise men had looked for Jesus for a long time, and at last they found him. Jesus says that anyone who looks for God with all their heart will find him. He is never far away.",
    activity: "Ask a grown-up to help you find today's verse in a real Bible, and read it together.",
    si_title: "ඥානවන්තයෝ බිළිඳා සොයා ගනිති", ta_title: "ஞானிகள் குழந்தையைக் காண்கிறார்கள்"
  },
  {
    date: "12-21",   img: "day-20.jpg",
    title: "The wise men present their gifts",
    verse: "Opening their treasures, they offered to him gifts: gold, frankincense, and myrrh.",
    reference: "Matthew 2:11",
    reflection: "The wise men brought their very best gifts to Jesus. We may not have gold, but we can give Jesus our love, our time, and our kindness. That is a gift he treasures.",
    activity: "Make a small gift or card for someone who might be lonely this Christmas.",
    si_title: "ඥානවන්තයෝ තෑගි පිළිගන්වති", ta_title: "ஞானிகள் காணிக்கைகளை அளிக்கிறார்கள்"
  },
  {
    date: "12-22",   img: "day-21.jpg",
    title: "The wise men worship",
    verse: "And they fell down and worshiped him.",
    reference: "Matthew 2:11",
    reflection: "These important, wise men knelt down before a little child. They knew Jesus was the true King. Worship means showing God that he is the most important one in our lives.",
    activity: "Kneel down with your family and say a short prayer together, telling Jesus that he is your King.",
    si_title: "ඥානවන්තයෝ නමස්කාර කරති", ta_title: "ஞானிகள் ஆராதிக்கிறார்கள்"
  },
  {
    date: "12-23",   img: "",
    title: "The Word made flesh",
    verse: "The Word became flesh, and lived among us. We saw his glory, such glory as of the only born Son of the Father, full of grace and truth.",
    reference: "John 1:14",
    reflection: "God didn't just send us a message from far away. He came himself, as a real baby, to live among us. That is how much God loves us.",
    activity: "Give someone a big hug today and tell them, “God loves you so much he came to be with us.”",
    si_title: "වචනය මනුෂ්‍ය විය", ta_title: "வார்த்தை மாம்சமானது"
  },
  {
    date: "12-24",   img: "",
    title: "The Christ child in glory",
    verse: "The people who walked in darkness have seen a great light. Those who lived in the land of the shadow of death, on them the light has shined.",
    reference: "Isaiah 9:2",
    reflection: "It's Christmas Eve! Jesus came as a light into a dark world. Tonight, as we get ready to celebrate, we remember that his light can never be put out.",
    activity: "With a grown-up, light a candle (or switch on a torch) in a dark room and thank Jesus for being the light of the world.",
    si_title: "මහිමයෙන් බැබළෙන ක්‍රිස්තු බිළිඳා", ta_title: "மகிமையில் கிறிஸ்து குழந்தை"
  },
  {
    date: "12-25",   img: "",
    title: "Christmas Day — Emmanuel",
    verse: "Behold, the virgin shall be with child, and shall give birth to a son. They shall call his name Immanuel, which is, being interpreted, “God with us.”",
    reference: "Matthew 1:23",
    reflection: "Merry Christmas! Jesus is born! His name Immanuel means “God with us.” Whatever happens, wherever we go, God is always with us. That is the best present of all.",
    activity: "Before you open any presents, sing “Happy Birthday” to Jesus with your family!",
    si_title: "නත්තල් දිනය — එම්මානුවෙල්", ta_title: "கிறிஸ்மஸ் நாள் — இம்மானுவேல்"
  }
];

// Sinhala / Tamil: titles for weeks 2–4 are filled in (please have a
// native speaker review); everything else is still a placeholder.
function buildDays() {
  return ENGLISH.map((e, i) => {
    const d = i + 1;
    const en = {
      title: e.title, verse: e.verse, reference: e.reference,
      readings: e.readings || "", feast: e.feast || "",
      reflection: e.reflection, actTitle: e.actTitle || "", activity: e.activity
    };
    return {
      day: d, date: e.date, img: e.img,
      en,
      si: {
        title: e.si_title || "[දින " + d + " මාතෘකාව — සිංහල]",
        verse: "[දින " + d + " පදය — සිංහල]",
        reference: "[යොමුව]",
        reflection: "[දින " + d + " මෙනෙහි කිරීම — සිංහල]",
        activity: "[දින " + d + " කාර්යය — සිංහල]"
      },
      ta: {
        title: e.ta_title || "[நாள் " + d + " தலைப்பு — தமிழ்]",
        verse: "[நாள் " + d + " வசனம் — தமிழ்]",
        reference: "[குறிப்பு]",
        reflection: "[நாள் " + d + " சிந்தனை — தமிழ்]",
        activity: "[நாள் " + d + " பணி — தமிழ்]"
      }
    };
  });
}

window.ADVENT_CONTENT = { days: buildDays() };
