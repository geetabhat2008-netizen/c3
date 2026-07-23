export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'lead'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'pull'; text: string }
  | { type: 'tip'; title: string; text: string }
  | { type: 'science'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type BlogPost = {
  slug: string
  title: string
  dek: string
  category: string
  date: string
  readTime: string
  phase: string // CSS color for the accent
  hero: string
  heroAlt: string
  blocks: BlogBlock[]
}

export const POSTS: BlogPost[] = [
  {
    slug: 'the-bucket-theory',
    title: 'The Wine Didn\u2019t Do It',
    dek: 'Why the same glass of red destroys you on Tuesday and does nothing on Saturday \u2014 and what that tells you about how migraines actually work.',
    category: 'The Framework',
    date: 'June 2026',
    readTime: '6 min',
    phase: 'var(--phase-1)',
    hero: '/images/blog/bucket-theory.png',
    heroAlt: 'An enamel bucket overflowing with water on a warm cream background',
    blocks: [
      {
        type: 'lead',
        text: 'Here\u2019s a question that has quietly driven migraine sufferers mad for decades. Why does a glass of wine trigger an attack on Tuesday but not on Saturday? Same wine. Same you. Completely different outcome.',
      },
      {
        type: 'p',
        text: 'Most people conclude their nervous system is random. Moody. Broken. It\u2019s none of those things. It\u2019s a bucket.',
      },
      { type: 'h2', text: 'The bucket, explained' },
      {
        type: 'p',
        text: 'Your nervous system has a threshold \u2014 think of it as the rim of a bucket. Every single day, inputs pour in. The fluorescent light in your office. Pour. The three-hour meeting where you forgot to drink water. Pour. The argument at breakfast. Pour. The bad night of sleep behind all of it. Pour.',
      },
      {
        type: 'p',
        text: 'None of those things, individually, caused your migraine. The overflow did. When the bucket hits its limit \u2014 when your nervous system can no longer process the incoming sensory load \u2014 it doesn\u2019t send you a polite email. It sends you a migraine.',
      },
      {
        type: 'pull',
        text: 'You were never fighting one trigger. You were losing a volume management problem.',
      },
      { type: 'h2', text: 'Same trigger, different Tuesday' },
      {
        type: 'p',
        text: 'This is where almost everyone goes wrong. They hunt for the villain \u2014 the one food, one light, one stress event that \u201Ccauses\u201D their migraines. There is no single villain. There is only the level of the bucket when the last thing gets added.',
      },
      {
        type: 'p',
        text: 'On Saturday, your bucket was half full. You slept in. You were relaxed. You drank water. The wine hit a system with room to process it. On Tuesday, the bucket was already at 90% \u2014 stress, bad sleep, skipped lunch, a full day of screens. The wine was just the last drop. It gets the blame. It doesn\u2019t deserve it.',
      },
      {
        type: 'p',
        text: 'This is also why the elimination game never fully works. You cut wine \u2014 still get migraines. Cut caffeine \u2014 still get them. Cut gluten \u2014 nothing changes. You weren\u2019t removing the cause. You were removing one of forty inputs.',
      },
      {
        type: 'science',
        text: 'Researchers call this the threshold model. The migraine brain shows reduced habituation \u2014 it keeps responding at full strength to stimuli a typical brain learns to ignore. Each unfiltered input keeps cortical excitability elevated, and when it crosses a critical point, a wave of cortical spreading depression rolls across the brain and activates the trigeminal pain system. One measurable threshold. Many small contributions.',
      },
      {
        type: 'tip',
        title: 'Try this tonight',
        text: 'Think back to your last attack \u2014 not the pain itself, but the 24 hours before it. Write down everything that poured in: sleep, meals, light, noise, stress. Almost everyone who does this once is shocked. Not by what they find, but by how obvious the stack becomes in hindsight.',
      },
      { type: 'h2', text: 'The part nobody tells you: the bucket isn\u2019t fixed' },
      {
        type: 'p',
        text: 'Here\u2019s the hopeful bit. The rim of your bucket \u2014 your threshold \u2014 moves. Good sleep raises it. Hydration raises it. Calming input like rhythmic pressure, softened light, and masked sound raises it. Which means you have two levers, not one: reduce what pours in, and raise the rim itself.',
      },
      {
        type: 'p',
        text: 'That\u2019s the entire logic behind everything we build. Not \u201Cavoid your triggers and hope.\u201D Manage the volume. Keep the level low. Give the last drop somewhere to land.',
      },
      {
        type: 'p',
        text: 'Once you see your migraines as overflow instead of ambush, everything changes. You stop being a victim of weather. You become the person holding the tap.',
      },
    ],
  },
  {
    slug: 'the-prodrome-window',
    title: 'Your Migraine Warns You. You Keep Missing It.',
    dek: 'The yawning, the neck stiffness, the weird carb craving \u2014 your attack announces itself hours before the pain. Learn to hear it.',
    category: 'Early Warning',
    date: 'June 2026',
    readTime: '7 min',
    phase: 'var(--phase-2)',
    hero: '/images/blog/prodrome.png',
    heroAlt: 'A woman by a window in soft evening light, hand resting on her neck',
    blocks: [
      {
        type: 'lead',
        text: 'Most migraines don\u2019t ambush you. They send a letter first. The problem is that the letter is written in a language nobody taught you to read.',
      },
      {
        type: 'p',
        text: 'That letter is called the prodrome \u2014 the warning phase that arrives hours, sometimes a full day, before the pain. And because its symptoms seem completely unrelated to a headache, almost everyone misses it.',
      },
      { type: 'h2', text: 'What the letter says' },
      {
        type: 'p',
        text: 'The prodrome doesn\u2019t look like a migraine. It looks like a slightly off day. Which is exactly why it slips past you.',
      },
      {
        type: 'list',
        items: [
          'Unusual fatigue \u2014 or yawning you can\u2019t explain',
          'Mood shifts: irritability, flatness, or oddly elevated energy',
          'Food cravings, especially carbohydrates',
          'Neck stiffness at the base of the skull',
          'Light and sound feeling slightly sharp \u2014 not painful, just off',
          'Words coming slower. Focus feeling more expensive than usual',
        ],
      },
      {
        type: 'p',
        text: 'Sound familiar? That\u2019s not a coincidence. That\u2019s your nervous system telling you the bucket is nearly full \u2014 before it overflows.',
      },
      {
        type: 'science',
        text: 'Brain imaging studies have caught the prodrome in the act. PET scans show the hypothalamus \u2014 the brain\u2019s regulator of sleep, hunger, and hydration \u2014 lighting up as much as 24 hours before pain begins. That early dopamine shift is why you yawn, crave carbs, and feel oddly flat. The strange little symptoms aren\u2019t random; they\u2019re the biology of an attack assembling itself.',
      },
      {
        type: 'pull',
        text: 'The prodrome is your intervention window. The bucket is filling, but it has not overflowed. Yet.',
      },
      { type: 'h2', text: 'Why this window matters more than anything else' },
      {
        type: 'p',
        text: 'Once an attack is at full intensity, everything you do is damage control. But in the prodrome? The wave hasn\u2019t triggered. The system is strained, not broken. Intervene here \u2014 dim the inputs, get horizontal, hydrate hard, close the gate with cold or rhythmic pressure \u2014 and you can sometimes stop the attack from ever reaching full force.',
      },
      {
        type: 'p',
        text: 'This is the single highest-leverage skill in migraine management. Not a device. Not a pill. Recognition.',
      },
      {
        type: 'tip',
        title: 'The Prodrome Log',
        text: 'Keep a running note on your phone titled \u201CProdrome Log.\u201D Every time you notice any of the signals above, jot the time and what you felt. After two weeks, patterns emerge. You\u2019ll discover your personal prodrome signature \u2014 an early warning system no device can replicate.',
      },
      { type: 'h2', text: 'What to actually do when the letter arrives' },
      {
        type: 'list',
        items: [
          'Cut the light. Tinted lenses on, screens dimmed, overheads off.',
          'Ramp hydration \u2014 water plus electrolytes, not just water.',
          'Eat something. A glucose dip pours cortisol straight into the bucket.',
          'Close the gate: cold at the base of the skull, rhythmic pressure, quiet sound.',
          'Cancel what can be cancelled. One protected evening beats three lost days.',
        ],
      },
      {
        type: 'p',
        text: 'None of this is dramatic. That\u2019s the point. The prodrome asks for small, boring interventions \u2014 and pays you back with whole days of your life.',
      },
      {
        type: 'p',
        text: 'Your migraine has been writing to you for years. Starting today, you read the mail.',
      },
    ],
  },
  {
    slug: 'the-migraine-hangover',
    title: 'The Headache Ended. The Migraine Didn\u2019t.',
    dek: 'Postdrome \u2014 the fog, the fatigue, the fragile day after \u2014 is not recovery. Treating it like one is why your attacks come in pairs.',
    category: 'Recovery',
    date: 'May 2026',
    readTime: '6 min',
    phase: 'var(--phase-3)',
    hero: '/images/blog/postdrome.png',
    heroAlt: 'An unmade bed with cream linen sheets in gentle morning light',
    blocks: [
      {
        type: 'lead',
        text: 'The pain stops. You exhale. You answer forty emails, hit the gym, cook dinner, catch up on everything the migraine stole. And two days later \u2014 another attack. Sound familiar?',
      },
      {
        type: 'p',
        text: 'That second attack wasn\u2019t bad luck. It was a predictable consequence of the most common mistake in migraine management: treating the postdrome like recovery.',
      },
      { type: 'h2', text: 'What\u2019s actually happening the day after' },
      {
        type: 'p',
        text: 'The electrical storm has passed, but your nervous system is exhausted. Deep, unusual fatigue. Cognitive fog \u2014 thinking feels like wading. Mood that\u2019s either flat or strangely euphoric. A scalp and neck that still feel tender for no reason.',
      },
      {
        type: 'p',
        text: 'People call it the \u201Cmigraine hangover,\u201D and the name is more accurate than they realize. Like a hangover, it\u2019s not the event \u2014 it\u2019s the debt from the event. And debts have to be repaid.',
      },
      {
        type: 'science',
        text: 'Imaging backs this up. Studies show cerebral blood flow and brain connectivity remain measurably altered for a day or more after the pain resolves \u2014 which is why the fog and fatigue are so physical. Your brain isn\u2019t being dramatic. It\u2019s still, quite literally, running on changed circulation.',
      },
      {
        type: 'pull',
        text: 'Postdrome is not recovery. It\u2019s vulnerability. Your bucket is nearly empty \u2014 but the rim is at its lowest.',
      },
      { type: 'h2', text: 'The trap' },
      {
        type: 'p',
        text: 'Here\u2019s the cruel mechanics of it. After an attack, your bucket has drained \u2014 but your threshold has dropped with it. The rim sits lower than usual. The bucket fills faster. The same Tuesday that your normal self would shrug off can tip your postdrome self straight into round two.',
      },
      {
        type: 'p',
        text: 'This is why attacks cluster. Not because your migraines are getting worse \u2014 because you keep sprinting on a freshly sprained nervous system.',
      },
      { type: 'h2', text: 'The postdrome protocol' },
      {
        type: 'list',
        items: [
          'Treat the day after like a recovery day, not a normal day. Full stop.',
          'Keep filtering light during screen use \u2014 the trigeminal nerve is still tender.',
          'Hydrate aggressively, with electrolytes. The attack cost you more fluid than you think.',
          'Gentle input only: soft pressure, low sound, warm light. Nothing intense.',
          'Prioritize sleep above everything else on the list. Everything.',
        ],
      },
      {
        type: 'tip',
        title: 'The one-line rule',
        text: 'The migraine did not end when the headache stopped. It ends when your threshold is fully restored. Usually that\u2019s 24 to 48 hours after the pain \u2014 protect that window like it\u2019s part of the attack, because neurologically, it is.',
      },
      {
        type: 'p',
        text: 'Nobody gives you permission to move slowly the day after. So consider this your permission. The emails will wait. The gym will wait. Your threshold won\u2019t negotiate.',
      },
    ],
  },
  {
    slug: 'your-office-is-the-trigger',
    title: 'It\u2019s Not You. It\u2019s the Ceiling.',
    dek: 'Fluorescent flicker, screen glare, open-plan noise, forgotten water \u2014 the modern office is a bucket-filling machine. Here\u2019s how to disarm it.',
    category: 'Environment',
    date: 'May 2026',
    readTime: '7 min',
    phase: 'var(--phase-4)',
    hero: '/images/blog/office.png',
    heroAlt: 'A minimal desk near a window lit by a warm lamp instead of overhead lights',
    blocks: [
      {
        type: 'lead',
        text: 'You feel fine at breakfast. By 3 p.m. there\u2019s a familiar tightness behind your right eye. By dinner, you\u2019re bargaining with your own skull. What happened in between? Eight hours in a room designed \u2014 accidentally but thoroughly \u2014 to fill your bucket.',
      },
      { type: 'h2', text: 'The four office taps' },
      {
        type: 'p',
        text: 'Most offices pour into your nervous system from four directions at once. Individually, each is survivable. Together, running all day, they\u2019re a stack.',
      },
      {
        type: 'list',
        items: [
          'The ceiling: fluorescent tubes flicker at 100\u2013120Hz \u2014 invisible to your conscious eye, fully visible to your nervous system.',
          'The screen: eight-plus hours of unfiltered blue light, most of it at full brightness because nobody ever changes the default.',
          'The room: open-plan chatter, HVAC hum, notification pings \u2014 a low-grade auditory tax you pay every minute.',
          'The schedule: back-to-back meetings that quietly delete water, meals, and movement from your day.',
        ],
      },
      {
        type: 'science',
        text: 'The light story has a specific culprit: cells in your retina called ipRGCs, tuned to blue light around 480nm, feed directly into the brain\u2019s pain pathways \u2014 which is why bright screens hurt even when your eyes are fine. And that fluorescent flicker? A migraine brain\u2019s visual cortex doesn\u2019t habituate to repetitive stimulation the way other brains do. It registers every single pulse, hour after hour.',
      },
      {
        type: 'pull',
        text: 'You sat under the same lights last month and felt fine. The lights didn\u2019t change. Your bucket level did.',
      },
      { type: 'h2', text: 'Disarming the room' },
      {
        type: 'p',
        text: 'You can\u2019t renovate your office. You can change what reaches your nervous system. That distinction is everything.',
      },
      {
        type: 'p',
        text: 'Start with light, because it\u2019s the biggest tap. If you can sit near a window, take the seat \u2014 daylight doesn\u2019t flicker. If you\u2019re under tubes, tinted lenses built for light sensitivity filter the exact wavelengths that agitate the migraine brain. Drop your screen brightness to match the room and turn on the warm shift you\u2019ve been ignoring in settings.',
      },
      {
        type: 'p',
        text: 'Then sound. You don\u2019t need silence \u2014 you need masking. A steady, low-frequency wash like brown noise turns forty little interruptions into one smooth surface your brain can ignore.',
      },
      {
        type: 'p',
        text: 'Then the body. Every 90 minutes: stand, roll the shoulders, drink water before you\u2019re thirsty. The suboccipital muscles at the base of your skull hold your screen posture all day \u2014 and they pour tension into the bucket by the hour.',
      },
      {
        type: 'tip',
        title: 'The 3 p.m. audit',
        text: 'Set one daily alarm for 3 p.m. When it fires, ask: have I had water? Have I eaten? How long since I looked away from the screen? Three questions, thirty seconds. It catches the afternoon stack while it\u2019s still catchable.',
      },
      { type: 'h2', text: 'The meeting survival rule' },
      {
        type: 'p',
        text: 'Long meetings are trigger stacks in a conference room: fluorescent light, one droning voice, no water, no movement. Walk in with a full glass. Sit where you\u2019re not staring into a window\u2019s glare. And if the meeting runs past an hour, excusing yourself for two minutes isn\u2019t rude \u2014 it\u2019s maintenance.',
      },
      {
        type: 'p',
        text: 'Your office isn\u2019t going to change. It doesn\u2019t have to. Once you control what actually reaches you, the room loses its vote.',
      },
    ],
  },
  {
    slug: 'the-travel-protocol',
    title: 'Flying With a Sensitive Head',
    dek: 'Cabin pressure, recycled air, broken routines, airport lighting \u2014 travel is a perfect storm. Here\u2019s the protocol that lets you board anyway.',
    category: 'Protocols',
    date: 'April 2026',
    readTime: '8 min',
    phase: 'var(--phase-5)',
    hero: '/images/blog/travel.png',
    heroAlt: 'A traveler resting with eyes closed by an airplane window in golden light',
    blocks: [
      {
        type: 'lead',
        text: 'For a lot of migraine sufferers, travel stopped being exciting years ago. It became a gamble \u2014 will this trip cost me a day in a dark hotel room? Here\u2019s the honest answer: travel is a stack of triggers. And stacks can be managed.',
      },
      { type: 'h2', text: 'Why travel hits so hard' },
      {
        type: 'p',
        text: 'Count the taps. A 4 a.m. alarm that wrecks your sleep rhythm. Airport halls lit like operating theaters. Dehydrating cabin air \u2014 humidity around 10\u201320%, drier than most deserts. Barometric pressure changes your nervous system can literally measure. Skipped meals, disrupted routines, and the low hum of travel stress underneath all of it.',
      },
      {
        type: 'p',
        text: 'Any one of those, fine. All of them in six hours? That\u2019s not bad luck. That\u2019s arithmetic.',
      },
      {
        type: 'science',
        text: 'The pressure thing is real, not folklore. Studies tracking migraine patients against weather data found attack rates rise when barometric pressure drops by as little as 5 hPa \u2014 and an ascending cabin drops far more than that. Add air at 10\u201320% humidity (the Sahara averages about 25%) and even mild dehydration, which measurably reduces plasma volume, and the flight itself becomes a physiological event before anything goes wrong.',
      },
      {
        type: 'pull',
        text: 'You don\u2019t cancel the trip. You board with a lower bucket than everyone else on the plane.',
      },
      { type: 'h2', text: 'Two days before: pre-drain the bucket' },
      {
        type: 'list',
        items: [
          'Guard your sleep like it\u2019s cargo. Two consistent nights before a flight matter more than anything you pack.',
          'Front-load hydration \u2014 start 48 hours out, not at the gate.',
          'Go easy on the known pours: alcohol, heavy caffeine, skipped meals.',
          'Pack your relief tools in the carry-on. Checked luggage can\u2019t help you at 35,000 feet.',
        ],
      },
      { type: 'h2', text: 'Flight day: the boarding protocol' },
      {
        type: 'p',
        text: 'Airports are sensory casinos \u2014 no windows, relentless light, constant announcements. Tinted lenses go on at the terminal door, not when the headache starts. Earbuds with a steady masking sound turn gate chaos into background texture.',
      },
      {
        type: 'p',
        text: 'On board: an aisle seat makes water refills and movement easier. Drink roughly a cup of water per hour in the air \u2014 yes, really. Skip the free wine; cabin altitude roughly doubles its effect on a sensitized nervous system. If pressure changes bother you on descent, that\u2019s the moment for slow breathing and cold at the neck, not your phone.',
      },
      {
        type: 'tip',
        title: 'The hotel reset',
        text: 'First fifteen minutes after check-in, before anything else: curtains drawn, water poured, ten minutes of quiet with cold or gentle pressure at the base of the skull. It feels indulgent. It\u2019s not \u2014 it drains the airport out of your bucket before the trip begins.',
      },
      { type: 'h2', text: 'The return leg nobody plans for' },
      {
        type: 'p',
        text: 'Most travel migraines don\u2019t hit on the way out \u2014 they hit the day after you get home, when the accumulated stack finally lands on a tired system. Treat your first day back like a postdrome day: slow morning, filtered light, aggressive hydration, early night. Book it into the trip like it\u2019s a hotel night, because neurologically, it is.',
      },
      {
        type: 'p',
        text: 'The world doesn\u2019t shrink because your head is sensitive. It just asks you to travel like someone who knows their own arithmetic.',
      },
    ],
  },
  {
    slug: 'stop-hunting-the-villain',
    title: 'You Cut the Cheese. The Migraines Stayed.',
    dek: 'Wine, chocolate, gluten, caffeine \u2014 you\u2019ve eliminated them all, one grim month at a time. Here\u2019s why the elimination game keeps failing.',
    category: 'The Framework',
    date: 'April 2026',
    readTime: '6 min',
    phase: 'var(--phase-2)',
    hero: '/images/blog/elimination.png',
    heroAlt: 'A wine glass, aged cheese, and a coffee cup arranged on cream linen',
    blocks: [
      {
        type: 'lead',
        text: 'First it was red wine. Then aged cheese. Then chocolate, then caffeine, then gluten, then anything fermented, cured, or fun. Each elimination came with a month of hope \u2014 and then another migraine, arriving right on schedule, completely unbothered by your discipline.',
      },
      {
        type: 'p',
        text: 'If that story stings, good news: the problem was never your willpower. It was the strategy.',
      },
      { type: 'h2', text: 'The villain myth' },
      {
        type: 'p',
        text: 'The elimination approach rests on a single assumption: somewhere in your life is one villain \u2014 one food, one drink, one habit \u2014 that causes your migraines. Find it, remove it, be free.',
      },
      {
        type: 'p',
        text: 'But your last attack wasn\u2019t caused by the wine. It was caused by the wine landing in a bucket that was already at 90% \u2014 filled all day by poor sleep, a skipped lunch, four hours of glare, and one tense phone call. The wine was the last drop, not the source. Remove it, and next Tuesday something else becomes the last drop. The stack doesn\u2019t care which straw breaks it.',
      },
      {
        type: 'science',
        text: 'There\u2019s an even stranger wrinkle: some \u201Ctriggers\u201D may be symptoms in disguise. The hypothalamus activates up to 24 hours before the pain \u2014 driving cravings. So when you eat chocolate and get a migraine six hours later, the attack may have already been underway when you reached for the bar. The chocolate didn\u2019t cause the migraine. The migraine caused the chocolate.',
      },
      {
        type: 'pull',
        text: 'The elimination diet removes one input out of forty \u2014 and leaves the other thirty-nine pouring.',
      },
      { type: 'h2', text: 'Why it feels like it works (at first)' },
      {
        type: 'p',
        text: 'Here\u2019s the trap that keeps everyone playing. When you start an elimination diet, you usually clean up everything at once \u2014 you sleep better, drink more water, eat regular meals, pay attention. The bucket drains. The migraines ease. And the diet takes the credit.',
      },
      {
        type: 'p',
        text: 'Then life returns. Sleep slips, meetings stack, hydration fades \u2014 and the attacks come back even though you never touched the forbidden food again. Cue the conclusion: \u201CI must have another trigger.\u201D And the hunt begins anew.',
      },
      { type: 'h2', text: 'What to do instead' },
      {
        type: 'p',
        text: 'Stop asking \u201Cwhat causes my migraines?\u201D and start asking \u201Cwhat fills my bucket fastest?\u201D Those are different questions with different answers \u2014 and only the second one is useful.',
      },
      {
        type: 'list',
        items: [
          'Track the 24 hours before each attack, not just the last thing you ate.',
          'Identify your biggest pours \u2014 for most people it\u2019s sleep disruption, light exposure, and dehydration, not food at all.',
          'Manage volume daily: filter the light, mask the noise, close the gate with pressure and cold.',
          'Keep the foods you love. Just stop serving them to a bucket that\u2019s already full.',
        ],
      },
      {
        type: 'tip',
        title: 'The Saturday test',
        text: 'Want proof? Notice what you can get away with on a relaxed Saturday after two good nights of sleep \u2014 the wine, the cheese, the late night. Same \u201Ctriggers,\u201D no attack. That\u2019s not luck. That\u2019s headroom.',
      },
      {
        type: 'p',
        text: 'You\u2019ve spent years subtracting joy from your life one food at a time. The math never worked because it was the wrong equation. Manage the volume \u2014 and take back the menu.',
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug)
}
