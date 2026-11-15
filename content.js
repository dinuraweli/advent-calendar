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

// English readings for each day (verse, reference, reflection, activity).
// Scripture is quoted from the World English Bible (public domain), so it
// can be shared freely. Swap in your church's preferred translation if you like.
const EN = [
  { verse: "For a child is born to us. A son is given to us; and the government will be on his shoulders. His name will be called Wonderful, Counselor, Mighty God, Everlasting Father, Prince of Peace.",
    reference: "Isaiah 9:6",
    reflection: "Long before Jesus was born, God made a promise that a special child would come. God's people waited and waited for hundreds of years. God always keeps his promises, even when we have to wait.",
    activity: "Make a paper chain with one link for each day until Christmas. Tear one off every morning as you wait." },
  { verse: "But you, Bethlehem Ephrathah, being small among the clans of Judah, out of you one will come out to me that is to be ruler in Israel.",
    reference: "Micah 5:2",
    reflection: "Bethlehem was a small, ordinary town, but God chose it for the biggest event in history. God loves to use little things and little people to do great things. You are never too small to matter to God.",
    activity: "Draw your own town or street. Add a small star somewhere to remember that God sees you there." },
  { verse: "The angel said to her, “Don't be afraid, Mary, for you have found favor with God. Behold, you will conceive in your womb and give birth to a son, and will name him ‘Jesus.’”",
    reference: "Luke 1:30–31",
    reflection: "Mary was surprised and maybe a little scared when the angel Gabriel visited her. But she trusted God and said yes to his plan. We can say yes to God too, even when we don't understand everything.",
    activity: "Think of one thing you can say “yes” to today without complaining, like helping at home, and do it cheerfully." },
  { verse: "She shall give birth to a son. You shall name him Jesus, for it is he who shall save his people from their sins.",
    reference: "Matthew 1:21",
    reflection: "Joseph was worried, but God spoke to him in a dream and told him not to be afraid. Joseph listened and obeyed right away. The name Jesus means “God saves.”",
    activity: "Ask a grown-up why they chose your name, or what it means. Then thank God that he knows you by name." },
  { verse: "Joseph also went up from Galilee, out of the city of Nazareth, into Judea, to the city of David, which is called Bethlehem, because he was of the house and family of David, to enroll himself with Mary, who was pledged to be married to him as wife, being pregnant.",
    reference: "Luke 2:4–5",
    reflection: "Mary and Joseph had to make a long, tiring journey to Bethlehem. It was not easy, but God was with them every step of the way. God is with us on our journeys too.",
    activity: "Count how many steps it takes to walk around your home. Say a prayer for people who are travelling this Christmas." },
  { verse: "She gave birth to her firstborn son. She wrapped him in bands of cloth, and laid him in a feeding trough, because there was no room for them in the inn.",
    reference: "Luke 2:7",
    reflection: "When Mary and Joseph arrived, there was no room for them anywhere. So the King of the whole world was born in a place where animals were kept. Jesus wants us to make room for him in our hearts.",
    activity: "Make room for someone today: share a toy, save a seat, or invite someone to join your game." },
  { verse: "The child was growing, and was becoming strong in spirit, being filled with wisdom, and the grace of God was upon him.",
    reference: "Luke 2:40",
    reflection: "Jesus grew up in a real family with Mary and Joseph who loved and cared for him. God gave us families to love each other and help each other grow. Every family can be a place where God's love lives.",
    activity: "Draw a picture of your family and pray for each person in it by name." },
  { verse: "There were shepherds in the same country staying in the field, and keeping watch by night over their flock.",
    reference: "Luke 2:8",
    reflection: "The shepherds were ordinary workers, out in the cold fields at night looking after their sheep. Nobody thought they were important. But God chose them to hear the good news first!",
    activity: "Make a sheep from cotton wool and paper. Remember that Jesus is our Good Shepherd who looks after us." },
  { verse: "The angel said to them, “Don't be afraid, for behold, I bring you good news of great joy which will be to all the people. For there is born to you today, in David's city, a Savior, who is Christ the Lord.”",
    reference: "Luke 2:10–11",
    reflection: "The angel's first words were “Don't be afraid!” The news was good news, and it was for everyone. Jesus came for all people, everywhere, including you.",
    activity: "Tell someone a piece of good news today, and tell them that Jesus is good news too." },
  { verse: "Suddenly, there was with the angel a multitude of the heavenly army praising God, and saying, “Glory to God in the highest, on earth peace, good will toward men.”",
    reference: "Luke 2:13–14",
    reflection: "Suddenly the sky was filled with angels singing praise to God! Heaven was so happy that Jesus had come. We can join the angels' song with our own voices.",
    activity: "Sing your favourite Christmas carol with your family, as loudly and joyfully as the angels." },
  { verse: "When the angels went away from them into the sky, the shepherds said one to another, “Let's go to Bethlehem, now, and see this thing that has happened, which the Lord has made known to us.”",
    reference: "Luke 2:15",
    reflection: "The shepherds didn't wait until morning. They left right away to find baby Jesus. When God speaks to us, it's good to respond quickly and gladly.",
    activity: "Is there something kind you have been putting off? Do it straight away today." },
  { verse: "They came with haste, and found both Mary and Joseph, and the baby was lying in the feeding trough.",
    reference: "Luke 2:16",
    reflection: "The shepherds found everything just as the angel had said. They saw baby Jesus with their own eyes and worshipped him. Imagine how amazed and happy they must have been!",
    activity: "Close your eyes and imagine you are a shepherd seeing baby Jesus. What would you say to him? Tell him in a prayer." },
  { verse: "The shepherds returned, glorifying and praising God for all the things that they had heard and seen, just as it was told them.",
    reference: "Luke 2:20",
    reflection: "The shepherds went back to their fields, but they were not the same. They were full of joy and couldn't stop praising God. Meeting Jesus changes us too.",
    activity: "Write or draw three things you want to thank God for today." },
  { verse: "But Mary kept all these sayings, pondering them in her heart.",
    reference: "Luke 2:19",
    reflection: "Mary took time to be quiet and think about all the wonderful things God had done. Christmas can be very busy. It's good to stop and remember what God has done for us.",
    activity: "Find a quiet spot and sit still for two minutes. Think about something wonderful God has done for you." },
  { verse: "A star will come out of Jacob. A scepter will rise out of Israel.",
    reference: "Numbers 24:17",
    reflection: "Long ago, God promised that a star would point to a great King. When Jesus was born, a bright new star appeared in the sky. Jesus is the light that shines in the dark.",
    activity: "Cut out a paper star and decorate it. Put it in a window where others can see it." },
  { verse: "Wise men from the east came to Jerusalem, saying, “Where is he who is born King of the Jews? For we saw his star in the east, and have come to worship him.”",
    reference: "Matthew 2:1–2",
    reflection: "Far away in the east, wise men saw the new star and knew it meant a King had been born. They were not from Israel, but God invited them too. God's love is for people from every country.",
    activity: "Look at a map or globe. Pick a country far away and pray for the children who live there." },
  { verse: "The star, which they saw in the east, went before them until it came and stood over where the young child was.",
    reference: "Matthew 2:9",
    reflection: "The wise men travelled a very long way, following the star. They kept going even when the journey was hard. God guides us too, if we keep following him.",
    activity: "Play a “follow the leader” game. Then talk about how we can follow Jesus every day." },
  { verse: "When they saw the star, they rejoiced with exceedingly great joy.",
    reference: "Matthew 2:10",
    reflection: "After their long journey, the wise men saw the star stop over the place where Jesus was. They were filled with great joy! Finding Jesus is the best thing anyone can ever find.",
    activity: "Hide a small star (paper or toy) somewhere at home and let someone hunt for it. Celebrate when it's found!" },
  { verse: "They came into the house and saw the young child with Mary, his mother.",
    reference: "Matthew 2:11",
    reflection: "The wise men had looked for Jesus for a long time, and at last they found him. Jesus says that anyone who looks for God with all their heart will find him. He is never far away.",
    activity: "Ask a grown-up to help you find today's verse in a real Bible, and read it together." },
  { verse: "Opening their treasures, they offered to him gifts: gold, frankincense, and myrrh.",
    reference: "Matthew 2:11",
    reflection: "The wise men brought their very best gifts to Jesus. We may not have gold, but we can give Jesus our love, our time, and our kindness. That is a gift he treasures.",
    activity: "Make a small gift or card for someone who might be lonely this Christmas." },
  { verse: "And they fell down and worshiped him.",
    reference: "Matthew 2:11",
    reflection: "These important, wise men knelt down before a little child. They knew Jesus was the true King. Worship means showing God that he is the most important one in our lives.",
    activity: "Kneel down with your family and say a short prayer together, telling Jesus that he is your King." },
  { verse: "The Word became flesh, and lived among us. We saw his glory, such glory as of the only born Son of the Father, full of grace and truth.",
    reference: "John 1:14",
    reflection: "God didn't just send us a message from far away. He came himself, as a real baby, to live among us. That is how much God loves us.",
    activity: "Give someone a big hug today and tell them, “God loves you so much he came to be with us.”" },
  { verse: "For my eyes have seen your salvation, which you have prepared before the face of all peoples.",
    reference: "Luke 2:30–31",
    reflection: "Mary, Joseph, the shepherds, the angels and the wise men all came together around Jesus. People rich and poor, near and far, were welcomed. Jesus brings everyone together as one big family.",
    activity: "Set up a nativity scene (or draw one) and name every person and animal in it." },
  { verse: "The people who walked in darkness have seen a great light. Those who lived in the land of the shadow of death, on them the light has shined.",
    reference: "Isaiah 9:2",
    reflection: "It's Christmas Eve! Jesus came as a light into a dark world. Tonight, as we get ready to celebrate, we remember that his light can never be put out.",
    activity: "With a grown-up, light a candle (or switch on a torch) in a dark room and thank Jesus for being the light of the world." },
  { verse: "Behold, the virgin shall be with child, and shall give birth to a son. They shall call his name Immanuel, which is, being interpreted, “God with us.”",
    reference: "Matthew 1:23",
    reflection: "Merry Christmas! Jesus is born! His name Immanuel means “God with us.” Whatever happens, wherever we go, God is always with us. That is the best present of all.",
    activity: "Before you open any presents, sing “Happy Birthday” to Jesus with your family!" }
];

// Generates 25 days. English is filled in above; Sinhala/Tamil verse,
// reflection and activity are still placeholders to complete.
function buildDays() {
  const days = [];
  for (let d = 1; d <= 25; d++) {
    const date = "12-" + String(d).padStart(2, "0");
    const special = d === 25;
    const title = TITLES[d - 1];
    days.push({
      day: d,
      date: date,
      en: Object.assign({ title: title.en }, EN[d - 1]),
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
