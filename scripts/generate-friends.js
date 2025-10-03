// Script to generate all friend pages
const fs = require('fs');
const path = require('path');

// All 30 friends data with descriptions and unique elements
const friends = [
  { name: 'Harsh', description: 'The adventurous spirit', tagline: 'The Adventurous Spirit', bio: 'Always ready for the next adventure, Harsh brings excitement and courage to every journey we take together.', emoji: '🌟', hearts: ['❤️', '💫', '🌟', '✨', '🎯'], memories: [
    { icon: '🏔️', title: 'Mountain Expeditions', desc: 'Leading us through challenging trails with unwavering determination.' },
    { icon: '🎪', title: 'Spontaneous Adventures', desc: 'Always the first to suggest "Let\'s try something new!"' },
    { icon: '🌅', title: 'Early Morning Quests', desc: 'Convincing us all to wake up early for the best sunrise views.' }
  ]},
  { name: 'Parduman', description: 'Always ready to help', tagline: 'Always Ready to Help', bio: 'The dependable friend who never hesitates to lend a hand. Parduman\'s selfless nature and willingness to help makes every challenge easier to overcome.', emoji: '🤝', hearts: ['🛠️', '💪', '🎯', '⭐', '🔧'], memories: [
    { icon: '🚀', title: 'Problem Solver', desc: 'Finding solutions when others see only obstacles, making the impossible possible.' },
    { icon: '🎁', title: 'Generous Spirit', desc: 'Sharing time, resources, and energy without expecting anything in return.' },
    { icon: '🌉', title: 'Bridge Builder', desc: 'Connecting people and bringing the group together through acts of service.' }
  ]},
  { name: 'Kartik', description: 'The creative genius', tagline: 'The Creative Genius', bio: 'With an imagination that knows no bounds, Kartik brings innovation and artistic flair to everything, inspiring us to see the world differently.', emoji: '🎨', hearts: ['💡', '🎭', '🌈', '✨', '🎪'], memories: [
    { icon: '🖌️', title: 'Artistic Vision', desc: 'Turning ordinary moments into extraordinary memories through creative expression.' },
    { icon: '💭', title: 'Innovative Ideas', desc: 'Always coming up with unique solutions and fresh perspectives on everything.' },
    { icon: '🌟', title: 'Inspiring Others', desc: 'Encouraging everyone to embrace their creative side and think outside the box.' }
  ]},
  { name: 'Pankaj', description: 'Master of good vibes', tagline: 'Master of Good Vibes', bio: 'The one who can turn any ordinary moment into something special. Pankaj\'s positive energy is contagious and lights up every room.', emoji: '😄', hearts: ['😊', '🎉', '✨', '🌈', '🎵'], memories: [
    { icon: '🎭', title: 'Comedy Central', desc: 'Making everyone laugh with perfectly timed jokes and impressions.' },
    { icon: '🎶', title: 'Mood Lifter', desc: 'Always knowing the right song to play when spirits need lifting.' },
    { icon: '🌟', title: 'Positive Energy', desc: 'Turning every challenge into an opportunity for growth and fun.' }
  ]},
  { name: 'Lakshay', description: 'The loyal companion', tagline: 'The Loyal Companion', bio: 'Through thick and thin, Lakshay stands by his friends with unwavering loyalty and dedication that defines true friendship.', emoji: '🛡️', hearts: ['💎', '🤗', '⚡', '🌟', '💝'], memories: [
    { icon: '🏰', title: 'Steadfast Support', desc: 'Being the rock everyone can lean on during challenging times.' },
    { icon: '🤝', title: 'Trust Builder', desc: 'Creating bonds that grow stronger with every shared experience.' },
    { icon: '🌅', title: 'Always Present', desc: 'Showing up consistently, making every moment more meaningful.' }
  ]},
  { name: 'Pasandu', description: 'Brings joy everywhere', tagline: 'Brings Joy Everywhere', bio: 'Like sunshine on a cloudy day, Pasandu has the magical ability to brighten any situation and bring smiles to everyone around.', emoji: '☀️', hearts: ['🌞', '🎈', '🦋', '🌺', '🎊'], memories: [
    { icon: '🎪', title: 'Joy Spreader', desc: 'Turning ordinary gatherings into celebrations full of laughter.' },
    { icon: '🌈', title: 'Rainbow Maker', desc: 'Finding the bright side in every situation and sharing it with others.' },
    { icon: '🎭', title: 'Happiness Expert', desc: 'Teaching us that joy is a choice we can make every day.' }
  ]},
  { name: 'Vishesh', description: 'The wise counselor', tagline: 'The Wise Counselor', bio: 'With wisdom beyond his years, Vishesh offers thoughtful advice and perspective that helps everyone navigate life\'s complexities.', emoji: '🦉', hearts: ['📚', '💭', '🔮', '⚖️', '🌟'], memories: [
    { icon: '💡', title: 'Wise Guidance', desc: 'Offering thoughtful advice that helps friends make better decisions.' },
    { icon: '🎯', title: 'Clear Vision', desc: 'Seeing through confusion to find the heart of any matter.' },
    { icon: '🌱', title: 'Growth Mentor', desc: 'Helping everyone become the best version of themselves.' }
  ]},
  { name: 'Sahil', description: 'Always up for fun', tagline: 'Always Up for Fun', bio: 'The spontaneous spirit who turns every moment into an adventure. Sahil\'s enthusiasm for life is absolutely infectious.', emoji: '🎢', hearts: ['🎯', '🚀', '⚡', '🎪', '🌟'], memories: [
    { icon: '🎮', title: 'Game Master', desc: 'Turning every activity into an exciting game or competition.' },
    { icon: '🎊', title: 'Party Starter', desc: 'Knowing exactly how to get everyone involved and having fun.' },
    { icon: '🌪️', title: 'Energy Tornado', desc: 'Bringing whirlwind excitement to even the quietest moments.' }
  ]},
  { name: 'Tushar', description: 'The problem solver', tagline: 'The Problem Solver', bio: 'When challenges arise, Tushar steps up with analytical thinking and creative solutions that amaze everyone.', emoji: '🧩', hearts: ['⚙️', '🔧', '💡', '🎯', '🚀'], memories: [
    { icon: '🔍', title: 'Detective Mind', desc: 'Analyzing problems from every angle to find the perfect solution.' },
    { icon: '🛠️', title: 'Fix-It Expert', desc: 'Making broken things work and impossible things possible.' },
    { icon: '🎪', title: 'Innovation Hub', desc: 'Coming up with creative approaches that surprise everyone.' }
  ]},
  { name: 'Yougank', description: 'Full of surprises', tagline: 'Full of Surprises', bio: 'Just when you think you know what to expect, Yougank brings something completely unexpected that delights everyone.', emoji: '🎁', hearts: ['🎭', '🌟', '🎪', '✨', '🎨'], memories: [
    { icon: '🎩', title: 'Magic Moments', desc: 'Creating unexpected surprises that leave everyone amazed.' },
    { icon: '🎪', title: 'Unpredictable Fun', desc: 'Keeping everyone guessing with delightful plot twists.' },
    { icon: '🌈', title: 'Wonder Creator', desc: 'Making ordinary days extraordinary with spontaneous magic.' }
  ]},
  { name: 'Masum', description: 'The gentle soul', tagline: 'The Gentle Soul', bio: 'With a heart full of kindness and understanding, Masum brings peace and harmony to every gathering.', emoji: '🕊️', hearts: ['💙', '🌸', '☮️', '🤲', '💫'], memories: [
    { icon: '🌿', title: 'Peaceful Presence', desc: 'Creating calm and tranquil moments in the midst of chaos.' },
    { icon: '🤗', title: 'Gentle Comfort', desc: 'Offering quiet support and understanding when it\'s needed most.' },
    { icon: '🌱', title: 'Nurturing Spirit', desc: 'Helping friendships grow with patience and care.' }
  ]},
  { name: 'Shiv', description: 'Strength and kindness', tagline: 'Strength and Kindness', bio: 'Combining inner strength with genuine kindness, Shiv shows us that true power comes from compassion.', emoji: '💪', hearts: ['⚡', '❤️', '🛡️', '🌟', '🔥'], memories: [
    { icon: '🏋️', title: 'Inner Strength', desc: 'Demonstrating that real strength comes from helping others.' },
    { icon: '🤝', title: 'Protective Friend', desc: 'Always standing up for what\'s right and protecting friends.' },
    { icon: '💖', title: 'Kind Warrior', desc: 'Fighting for friendship with love and determination.' }
  ]},
  { name: 'Arijit', description: 'The music lover', tagline: 'The Music Lover', bio: 'With rhythm in his soul and melody in his heart, Arijit brings the soundtrack to our friendship.', emoji: '🎵', hearts: ['🎶', '🎤', '🎸', '🎹', '🎺'], memories: [
    { icon: '🎧', title: 'Melody Maker', desc: 'Creating the perfect playlist for every mood and moment.' },
    { icon: '🎪', title: 'Rhythm Master', desc: 'Getting everyone dancing and moving to the beat of friendship.' },
    { icon: '🌟', title: 'Harmony Creator', desc: 'Bringing people together through the universal language of music.' }
  ]},
  { name: 'Pintu', description: 'Always positive', tagline: 'Always Positive', bio: 'No matter what life throws his way, Pintu maintains an optimistic outlook that inspires everyone around him.', emoji: '😊', hearts: ['🌞', '✨', '🌈', '💫', '🎈'], memories: [
    { icon: '☀️', title: 'Sunshine Attitude', desc: 'Brightening even the darkest days with unwavering optimism.' },
    { icon: '🎯', title: 'Hope Keeper', desc: 'Reminding everyone that better days are always ahead.' },
    { icon: '🌟', title: 'Positivity Spreader', desc: 'Infecting others with contagious enthusiasm for life.' }
  ]},
  { name: 'Ayush', description: 'The energetic one', tagline: 'The Energetic One', bio: 'Bursting with energy and enthusiasm, Ayush brings dynamic excitement to every adventure we share.', emoji: '⚡', hearts: ['🚀', '💥', '🌪️', '🔥', '⭐'], memories: [
    { icon: '🏃', title: 'Energy Dynamo', desc: 'Keeping everyone active and engaged with boundless enthusiasm.' },
    { icon: '🎪', title: 'Action Hero', desc: 'Turning every plan into an exciting adventure.' },
    { icon: '💫', title: 'Spark Igniter', desc: 'Lighting up the group with infectious energy and passion.' }
  ]},
  { name: 'Shivaji', description: 'Natural born leader', tagline: 'Natural Born Leader', bio: 'With natural charisma and wisdom, Shivaji guides the group with confidence and brings out the best in everyone.', emoji: '👑', hearts: ['🦅', '⚔️', '🏆', '🌟', '🛡️'], memories: [
    { icon: '🎯', title: 'Visionary Leader', desc: 'Seeing the bigger picture and guiding everyone toward success.' },
    { icon: '🤝', title: 'Team Builder', desc: 'Bringing out the best in everyone and creating unity.' },
    { icon: '🏰', title: 'Inspiring Presence', desc: 'Leading by example and inspiring others to reach their potential.' }
  ]},
  { name: 'Sachin', description: 'The sports enthusiast', tagline: 'The Sports Enthusiast', bio: 'Bringing competitive spirit and teamwork to everything we do. Sachin teaches us that winning isn\'t everything, but playing together is.', emoji: '⚽', hearts: ['🏆', '⚽', '🏃', '🎯', '💪'], memories: [
    { icon: '🏅', title: 'Team Captain', desc: 'Leading by example and bringing out the best in every teammate.' },
    { icon: '🎮', title: 'Game Night Champion', desc: 'Turning every game into an epic battle of strategy and skill.' },
    { icon: '🤝', title: 'Fair Play', desc: 'Teaching us that true victory comes from playing with honor.' }
  ]},
  { name: 'Varun', description: 'Quick wit and humor', tagline: 'Quick Wit and Humor', bio: 'With lightning-fast wit and perfect timing, Varun keeps everyone laughing and thinking with his clever observations.', emoji: '😄', hearts: ['🎭', '💡', '⚡', '🎪', '🌟'], memories: [
    { icon: '🎤', title: 'Comedy Genius', desc: 'Delivering perfectly timed jokes that leave everyone in stitches.' },
    { icon: '🧠', title: 'Quick Thinker', desc: 'Coming up with clever solutions and witty responses instantly.' },
    { icon: '🎯', title: 'Mood Lifter', desc: 'Knowing exactly what to say to turn any situation around.' }
  ]},
  { name: 'Hani', description: 'The thoughtful friend', tagline: 'The Thoughtful Friend', bio: 'Always considering others\' feelings and needs, Hani brings depth and meaning to every friendship interaction.', emoji: '💭', hearts: ['🌸', '💝', '🤗', '📚', '🕯️'], memories: [
    { icon: '💌', title: 'Thoughtful Gestures', desc: 'Remembering important moments and making everyone feel special.' },
    { icon: '👂', title: 'Great Listener', desc: 'Providing a caring ear and thoughtful advice when needed.' },
    { icon: '🌱', title: 'Deep Connections', desc: 'Creating meaningful bonds that last a lifetime.' }
  ]},
  { name: 'Anshul', description: 'Always encouraging', tagline: 'Always Encouraging', bio: 'The cheerleader of the group, Anshul believes in everyone\'s potential and never stops supporting their dreams.', emoji: '📣', hearts: ['💪', '🌟', '🎯', '🚀', '💫'], memories: [
    { icon: '🏆', title: 'Motivation Master', desc: 'Pushing everyone to achieve their best and never give up.' },
    { icon: '🎪', title: 'Confidence Builder', desc: 'Helping friends believe in themselves and their abilities.' },
    { icon: '🌈', title: 'Dream Supporter', desc: 'Cheering on every goal and celebrating every achievement.' }
  ]},
  { name: 'Abhishek', description: 'The reliable one', tagline: 'The Reliable One', bio: 'When you need someone you can count on, Abhishek is always there with steady support and unwavering dependability.', emoji: '🛡️', hearts: ['⚓', '💎', '🏰', '⭐', '🤝'], memories: [
    { icon: '🎯', title: 'Steady Support', desc: 'Being the constant friend everyone can depend on.' },
    { icon: '🔧', title: 'Problem Fixer', desc: 'Always ready to help solve any challenge that comes up.' },
    { icon: '🌟', title: 'Trust Anchor', desc: 'Creating a foundation of trust that strengthens all friendships.' }
  ]},
  { name: 'Arjun', description: 'Focused and determined', tagline: 'Focused and Determined', bio: 'With laser focus and unwavering determination, Arjun shows us the power of persistence and dedication.', emoji: '🎯', hearts: ['🏹', '💪', '🔥', '⚡', '🏆'], memories: [
    { icon: '🎪', title: 'Goal Achiever', desc: 'Setting ambitious targets and inspiring others to reach them too.' },
    { icon: '🚀', title: 'Persistence Master', desc: 'Never giving up and showing the power of determination.' },
    { icon: '🌟', title: 'Focus Expert', desc: 'Maintaining concentration and helping others stay on track.' }
  ]},
  { name: 'Dheraj', description: 'The peacemaker', tagline: 'The Peacemaker', bio: 'With natural diplomacy and understanding, Dheraj brings harmony to the group and helps resolve any conflicts.', emoji: '☮️', hearts: ['🕊️', '🤝', '💙', '🌸', '⚖️'], memories: [
    { icon: '🌈', title: 'Harmony Creator', desc: 'Bringing people together and resolving differences with wisdom.' },
    { icon: '🤗', title: 'Conflict Resolver', desc: 'Helping friends understand each other and find common ground.' },
    { icon: '🌿', title: 'Peace Bringer', desc: 'Creating calm and understanding in every situation.' }
  ]},
  { name: 'Rajat', description: 'Full of ideas', tagline: 'Full of Ideas', bio: 'With a mind that never stops creating, Rajat brings fresh perspectives and innovative solutions to every challenge.', emoji: '💡', hearts: ['🧠', '⚡', '🎨', '🚀', '✨'], memories: [
    { icon: '🎪', title: 'Idea Generator', desc: 'Coming up with creative solutions and exciting new possibilities.' },
    { icon: '🌟', title: 'Innovation Hub', desc: 'Inspiring others to think differently and explore new paths.' },
    { icon: '🎯', title: 'Creative Catalyst', desc: 'Sparking creativity and imagination in everyone around.' }
  ]},
  { name: 'Aditya', description: 'The curious mind', tagline: 'The Curious Mind', bio: 'Always asking questions and seeking to understand, Aditya\'s curiosity leads to fascinating discoveries and learning.', emoji: '🔍', hearts: ['📚', '🌟', '🧭', '💫', '🎓'], memories: [
    { icon: '🔬', title: 'Knowledge Seeker', desc: 'Always learning something new and sharing discoveries with friends.' },
    { icon: '🗺️', title: 'Explorer Spirit', desc: 'Leading the group to discover new places and experiences.' },
    { icon: '💡', title: 'Question Asker', desc: 'Encouraging everyone to think deeper and learn more.' }
  ]},
  { name: 'Rudra', description: 'Bold and fearless', tagline: 'Bold and Fearless', bio: 'With courage that inspires and boldness that motivates, Rudra shows us how to face challenges head-on.', emoji: '🦁', hearts: ['⚡', '🔥', '⚔️', '🌟', '💪'], memories: [
    { icon: '🏔️', title: 'Fearless Leader', desc: 'Taking on challenges that others might shy away from.' },
    { icon: '🎪', title: 'Courage Inspirer', desc: 'Motivating everyone to be brave and take bold steps.' },
    { icon: '🚀', title: 'Risk Taker', desc: 'Showing that great rewards come from bold actions.' }
  ]},
  { name: 'Mudashir', description: 'The storyteller', tagline: 'The Storyteller', bio: 'With captivating tales and vivid imagination, Mudashir brings our experiences to life through the art of storytelling.', emoji: '📖', hearts: ['🎭', '✨', '🌟', '📚', '🎪'], memories: [
    { icon: '🎤', title: 'Tale Weaver', desc: 'Turning everyday experiences into epic stories and adventures.' },
    { icon: '🎭', title: 'Memory Keeper', desc: 'Preserving our best moments through captivating narratives.' },
    { icon: '🌟', title: 'Imagination Master', desc: 'Inspiring everyone with creative stories and vivid descriptions.' }
  ]},
  { name: 'Ravi', description: 'Brings light to darkness', tagline: 'Brings Light to Darkness', bio: 'Like a beacon of hope, Ravi illuminates difficult times and helps everyone find their way through challenges.', emoji: '🌟', hearts: ['☀️', '💫', '🕯️', '✨', '🌅'], memories: [
    { icon: '💡', title: 'Light Bringer', desc: 'Illuminating the path forward during difficult times.' },
    { icon: '🌈', title: 'Hope Giver', desc: 'Reminding everyone that there\'s always light after darkness.' },
    { icon: '🌟', title: 'Beacon Friend', desc: 'Being the guiding light that helps friends find their way.' }
  ]},
  { name: 'Aashish', description: 'The optimistic dreamer', tagline: 'The Optimistic Dreamer', bio: 'With dreams as big as the sky and optimism that never fades, Aashish inspires everyone to reach for the stars.', emoji: '🌠', hearts: ['⭐', '🌙', '☁️', '🎈', '💫'], memories: [
    { icon: '🌟', title: 'Dream Chaser', desc: 'Pursuing big dreams and inspiring others to do the same.' },
    { icon: '🎪', title: 'Optimism Expert', desc: 'Maintaining hope and positivity no matter what challenges arise.' },
    { icon: '🚀', title: 'Sky Reacher', desc: 'Showing everyone that no dream is too big to achieve.' }
  ]},
  { name: 'Rijwaan', description: 'The caring heart', tagline: 'The Caring Heart', bio: 'With a heart full of compassion and understanding, Rijwaan reminds us what true friendship means through every act of kindness.', emoji: '💝', hearts: ['💖', '🤗', '🌸', '💫', '🕊️'], memories: [
    { icon: '🤲', title: 'Always There', desc: 'The first to offer help and the last to leave when someone needs support.' },
    { icon: '💌', title: 'Thoughtful Gestures', desc: 'Remembering the little things that make each friend feel special and valued.' },
    { icon: '🌱', title: 'Growing Together', desc: 'Nurturing friendships with patience, understanding, and endless compassion.' }
  ]}
];

// Template for friend page
const createFriendPageTemplate = (friend) => {
  const slug = friend.name.toLowerCase().replace(/\s+/g, '-');
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${friend.name} - ${friend.tagline} | 2024 Walle Pals</title>
    <link rel="stylesheet" href="../css/main.css">
    <link rel="stylesheet" href="../css/animations.css">
    <link rel="stylesheet" href="../css/candle-animations.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="nav-brand">
                <h1 class="brand-title">2024 Walle Pals</h1>
            </div>
            <ul class="nav-menu">
                <li><a href="../index.html" class="nav-link">Home</a></li>
                <li><a href="../index.html#wall-of-frames" class="nav-link">Friends</a></li>
                <li><a href="../memories.html" class="nav-link">Memories</a></li>
            </ul>
            <button class="nav-toggle" aria-label="Toggle navigation">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    </header>

    <main>
        <section class="friend-hero">
            <div class="container">
                <div class="friend-intro animate-fade-in-up">
                    <h1 class="friend-title">${friend.name}</h1>
                    <p class="friend-tagline">${friend.tagline}</p>
                    <p class="friend-bio">${friend.bio}</p>
                </div>
            </div>
        </section>

        <section class="friend-animation-section">
            <div class="container">
                <div class="candle-container">
                    <div class="candle">
                        <div class="flame"></div>
                    </div>
                </div>

                <div class="friendship-scene">
                    <div class="character character-1">
                        <div class="character-eyes">
                            <div class="eye"></div>
                            <div class="eye"></div>
                        </div>
                        <div class="character-mouth"></div>
                        ${friend.name[0]}
                    </div>
                    
                    <div class="character character-2">
                        <div class="character-eyes">
                            <div class="eye"></div>
                            <div class="eye"></div>
                        </div>
                        <div class="character-mouth"></div>
                        ${friend.emoji}
                    </div>

                    <div class="hearts-container">
                        ${friend.hearts.map(heart => `<div class="floating-heart">${heart}</div>`).join('\n                        ')}
                    </div>

                    <div class="memory-bubble"></div>
                    <div class="memory-bubble"></div>
                    <div class="memory-bubble"></div>

                    <div class="story-element story-sun"></div>
                    <div class="story-element story-cloud"></div>
                </div>
            </div>
        </section>

        <section class="friend-memories">
            <div class="container">
                <h2 class="section-title">${friend.name}'s Special Moments</h2>
                <div class="memories-grid">
                    ${friend.memories.map((memory, index) => `
                    <div class="memory-card animate-fade-in-${index === 0 ? 'left' : index === 1 ? 'up' : 'right'} stagger-${index + 1}">
                        <div class="memory-placeholder">
                            <div class="placeholder-icon">${memory.icon}</div>
                        </div>
                        <h3>${memory.title}</h3>
                        <p>${memory.desc}</p>
                    </div>`).join('')}
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Walle Pals. Made with ❤️ for our amazing friend circle.</p>
        </div>
    </footer>

    <script src="../js/main.js"></script>
    <script src="../js/animations.js"></script>
</body>
</html>`;
};

// Create data directory and save friends data as JSON
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'friends.json'), JSON.stringify(friends, null, 2));
console.log('✅ Friends data saved to data/friends.json');

// Generate pages for all friends
const friendsDir = path.join(__dirname, '..', 'friends');
if (!fs.existsSync(friendsDir)) {
  fs.mkdirSync(friendsDir, { recursive: true });
}

friends.forEach(friend => {
  const slug = friend.name.toLowerCase().replace(/\s+/g, '-');
  const filename = path.join(friendsDir, `${slug}.html`);
  const content = createFriendPageTemplate(friend);
  
  fs.writeFileSync(filename, content);
  console.log(`✅ Generated ${slug}.html`);
});

console.log(`🎉 Successfully generated ${friends.length} friend pages!`);