import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type CharacterType = {
  slug: string;
  name: string;
  story: string;
  avatarUrl: string;
};

type GameType = {
  slug: string;
  name: string;
};

const sfCharacters: CharacterType[] = [
  {
    slug: "ryu-sf6",
    name: "ryu",
    story:
      "Ever training, this martial artist seeks true strength. Well-mannered and sincere, Ryu travels the globe in search of worthy opponents. Having overcome the Satsui no Hado, he now seeks yet greater heights.",
    avatarUrl: "ryu",
  },
  {
    slug: "luke-sf6",
    name: "luke",
    story:
      "A contractor for a PMC, Luke uses his elite military background to teach mixed martial arts. His days off are spent eating junk food, playing video games, and fighting, but make no mistake—Luke plays to win.",
    avatarUrl: "luke",
  },
  {
    slug: "jamie-sf6",
    name: "jamie",
    story:
      "This self-styled Chinatown peacekeeper aspires to the example set by Yun and Yang, the Twin Dragons. An expert dancer, Jamie places justice and friendship above all else, defending his town with martial skill.",
    avatarUrl: "jamie",
  },
  {
    slug: "chun-sf6",
    name: "chun-li",
    story:
      "A former high-kicking ICPO agent, Chun-Li looks after Li-Fen, a victim of the Black Moon Incident. With Shadaloo sundered, she now runs kung fu classes, and has become a well-loved member of the local community.",
    avatarUrl: "chun-li",
  },
  {
    slug: "guile-sf6",
    name: "guile",
    story:
      "A US Air Force pilot who fights for his country, Guile succeeded in dismantling Shadaloo and avenging his friend Charlie. He enjoys living the family man life, but new battlefields await him.",
    avatarUrl: "guile",
  },
  {
    slug: "kimberly-sf6",
    name: "kimberly",
    story:
      "Uninvited student to Guy, the 39th successor to Bushinryu. Kimberly had an ordinary upbringing, but she's a genuine prodigy who graduated college early...and now wants to be a ninja. Loves '80s pop culture.",
    avatarUrl: "kim",
  },
  {
    slug: "juri-sf6",
    name: "juri",
    story:
      "This sadistic thrillseeker enjoys the strife and suffering of others, taking immense joy in obliterating her foes. Without revenge against M. Bison as a motivator, she whiles away her time in a gloomy haze.",
    avatarUrl: "juri",
  },
  {
    slug: "ken-sf6",
    name: "ken",
    story:
      "Former US National Fighting Champ, and ex-VP of the Masters Foundation. Accusations of orchestrating a criminal plot have forced Ken to abandon his family and business and go into hiding.",
    avatarUrl: "ken",
  },
  {
    slug: "blanka-sf6",
    name: "blanka",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "blanka",
  },
  {
    slug: "dhalsim-sf6",
    name: "dhalsim",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "dhalsim",
  },
  {
    slug: "honda-sf6",
    name: "e. honda",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "honda",
  },
  {
    slug: "deejay-sf6",
    name: "deejay",
    story:
      "A globally popular dance music superstar, Dee Jay is always ready to have a good time. With a burning love for music and fighting, this Jamaican sensation drives audiences wild with hot new songs and stylish moves.",
    avatarUrl: "deejay",
  },
  {
    slug: "manon-sf6",
    name: "manon",
    story:
      "A super model and world champion judoka, Manon is an idealist, forever seeking self-improvement in the pursuit of beauty. She struts the catwalk of street fighting to become the world's strongest model.",
    avatarUrl: "manon",
  },
  {
    slug: "marisa-sf6",
    name: "marisa",
    story:
      "An up-and-coming jewelry designer from Italy who claims ancestry to ancient Greek warriors. As a child, she was inspired by a vision of the Colosseum in its prime. Today, she seeks glory with a smile—and an eye for beauty.",
    avatarUrl: "marisa",
  },
  {
    slug: "jp-sf6",
    name: "jp",
    story:
      "Head of an international NGO responsible for many successful investment projects, and the man behind Nayshall's present prosperity. Has a beloved cat named Cybele.",
    avatarUrl: "jp",
  },
  {
    slug: "zangief-sf6",
    name: "zangief",
    story:
      "A colossal wrestler nicknamed the Red Cyclone. Zangief is dedicated to physical improvement and instructing his students.",
    avatarUrl: "zangief",
  },
  {
    slug: "lily-sf6",
    name: "lily",
    story:
      "A descendant of the Thunderfoot tribe, Lily speaks with the spirits of nature, trusting in their guidance as she travels the globe. Don't judge a book by its cover—her small stature conceals truly titanic power.",
    avatarUrl: "lily",
  },
  {
    slug: "cammy-sf6",
    name: "cammy",
    story:
      "Member of British special forces unit Delta Red. Distinguished herself in the operation against Shadaloo, with which she shares a fated connection. Hyper-competent but somewhat moody. Currently working at HQ.",
    avatarUrl: "cammy",
  },
  {
    slug: "rashid-sf6",
    name: "rashid",
    story:
      "'The Souring Eagle of the Desert' that fights using parkour. With the wind as his ally, he outfoxes opponents with his high mobility. Born into nobility, he's a carefree but earnest man. Loves video streaming.",
    avatarUrl: "rashid",
  },
  {
    slug: "aki-sf6",
    name: "a.k.i.",
    story:
      "A poison-wielding apprentice of F.A.N.G, the former Shadaloo officer. Enchanted by the power of toxins, nothing brings her more joy than testing them on a new target—other than attention from her “master,” that is.",
    avatarUrl: "aki",
  },
  {
    slug: "ed-sf6",
    name: "ed",
    story:
      "A Psycho Power-wielding youth aged up rapidly by Shadaloo's experimentation,on a journey and a mission to free other subjects. He gets his short temper and foul mouth from Balrog, his former mentor.",
    avatarUrl: "ed",
  },
  {
    slug: "akuma-sf6",
    name: "akuma",
    story:
      "A demon of combat that has welcomed the Satsui no Hado into his being in his quest to become the ultimate master of the fist.",
    avatarUrl: "akuma",
  },
  {
    slug: "bison-sf6",
    name: "m. bison",
    story:
      "A man who resembles M. Bison, the leader of Shadaloo, who was believed to be dead. He has lost his memories, but has violent tendencies. He appears in locations related to Shadaloo, guided by Psycho Power.",
    avatarUrl: "bison",
  },
  {
    slug: "terry-sf6",
    name: "terry",
    story:
      'A passionate fighter that hones his craft as he travels all over the world. Also known as the "Hungry Wolf". He came to Metro City after hearing about the opening of the Pao Pao Cafe.',
    avatarUrl: "terry",
  },
  {
    slug: "mai-sf6",
    name: "mai",
    story:
      "The successor of Shiranui-style ninja arts. A charming kunoichi who is as dedicated to love as she is to training. Loves cooking, Japanese dressmaking, flower arrangement, and traditional Japanese dance.",
    avatarUrl: "mai",
  },
  {
    slug: "elena-sf6",
    name: "elena",
    story:
      "A cheerful girl raised in the arms of the savannah, and a member of a clan of proud warriors. She has a talent for healing, and seeks to become a veterinarian.",
    avatarUrl: "elena",
  },
  {
    slug: "sagat-sf6",
    name: "sagat",
    story:
      "The Emperor of Muay Thai. He was once one of the highest ranking members of Shadaloo, but has since left the criminal organization. He currently lives deep in the mountains, focusing only on his training.",
    avatarUrl: "sagat",
  },
  {
    slug: "cviper-sf6",
    name: "c. viper",
    story:
      "The Emperor of Muay Thai. He was once one of the highest ranking members of Shadaloo, but has since left the criminal organization. He currently lives deep in the mountains, focusing only on his training.",
    avatarUrl: "cviper",
  },
];

const cotwCharacters: CharacterType[] = [
  {
    slug: "rock-cotw",
    name: "Rock",
    story:
      "Born to Geese Howard, raised by Terry Bogard—Rock's very being is one of mixed emotions and internal conflict. Despite having lived a new life with Terry, one day Rock finds himself facing off against a foe who claims to know about his past—namely his birth mother, and the fact that she is very much alive. Armed with this new information, the troubled youth resolves to find his own way through life—and fight on in order to make that happen.",
    avatarUrl: "rock",
  },
  {
    slug: "terry-cotw",
    name: "Terry",
    story: `South Town's very own Legendary Hungry Wolf. Following his epic encounter with archrival Geese Howard, he takes young Rock (Geese's son) under his wing; the two are inseparable—until the events of a fateful tournament compel them to go their separate ways. Terry fights it out on the streets for a time thereafter, but when word of an upcoming martial arts tournament ("KOF") reaches him, he realizes that another date with destiny awaits...`,
    avatarUrl: "terry",
  },
  {
    slug: "bjenet-cotw",
    name: "B. Jenet",
    story: `Captain of the Lilien Knights, a crew of virtuous pirates. With Kain and Grant weighing on her mind during and after the events of the previous tournament, she makes an altogether uncharacteristic decision: to stay in South Town, if not for a short while. Strangely unable to express her lingering thoughts in words, she sees the upcoming KOF tournament as a true blessing in disguise: finally, a chance to vent her frustrations to both men face-to-face!`,
    avatarUrl: "bjenet",
  },
  {
    slug: "marco-cotw",
    name: "Marco",
    story: `A Kyokugen karateka whose hefty, hot-blooded nature has earned him a reputation for being a beast in battle. With his dojo sign stolen by forces unknown, he has no choice but to hone his karate skills elsewhere in the interim—namely, at Yuri's fitness club. Upon learning of a new KOF tournament on the horizon, Marco steels himself for what lies ahead: an opportunity to spread word about his beloved dojo, a chance to get its sign back, and (of course) a turbulent test of his Kyokugen Karate might.`,
    avatarUrl: "marco",
  },
  {
    slug: "preecha-cotw",
    name: "Preecha",
    story: `A scientist investigating the wonders and miracles of a fascinating principle known as ki (spirit energy). She also happens to be the star pupil of Joe Higashi, the acclaimed Muay Thai champ himself! While her martial arts talent can't be denied, that's not to say she's only in it to win it either; indeed, Preecha fights for academic purposes, not accolades. She hates the pain, but sure is willing to endure it—as long as it furthers her research into unique and perplexing fight styles.`,
    avatarUrl: "preecha",
  },
  {
    slug: "hotaru-cotw",
    name: "Hotaru",
    story: `A young girl searching far and wide for her older brother, who disappeared when her mother passed away. As luck would have it she would one day run into someone who looked very much like him, though he denied all knowledge of the matter. But that was then, this is now, and Hotaru still hasn't given up: determined to fight the mysterious stranger again and let her feelings be known, she sets off into the unknown once more.`,
    avatarUrl: "hotaru",
  },
  {
    slug: "voxreaper-cotw",
    name: "Vox Reaper",
    story: `Enter the demon: Vox Reaper. This street assassin is dispatched to hunt down and eliminate Kain R. Heinlein—and though the attempt is thwarted, he at least escapes with his life. Kain's bodyguard Grant, having realized the youth's talent and potential, decides to take him under his wing thereafter. Afforded a new lease on life, and intent on fulfilling his dying master's wishes (not to mention Kain's own grandiose ambitions), Vox stalks the bloody battleground that is South Town—a demon reborn.`,
    avatarUrl: "voxreaper",
  },
  {
    slug: "tizoc-cotw",
    name: "Tizoc",
    story: `An invincible symbol of justice who now makes his triumphant return to the ring. Despite hanging up his boots for a time, the joyous cries of the children in his corner spur him into action—and bring him back home. Pledging to lift the spirits of one young fan in particular, he laces up and sets his sights on the squared circle once again. For the mighty Tizoc, one thing's for sure: this fight will be even more furious than the last.`,
    avatarUrl: "tizoc",
  },
  {
    slug: "kevin-cotw",
    name: "Kevin",
    story: `SWAT officer and keeper of the peace stationed in South Town. With trusty companion Marky in tow, this hard-hitting lawman scours the city's streets in pursuit of the sinister Freeman—the man who murdered his best friend in cold blood. Kevin's moves are inherently explosive, wildly energetic, and supremely effective; indeed, no perp has ever been able to walk away from them scot-free.`,
    avatarUrl: "kevin",
  },
  {
    slug: "billy-cotw",
    name: "Billy",
    story: `Loyal right-hand man to the infamous Geese Howard. Despite already assuming control of the late kingpin's organization (the Howard Connection), Billy nevertheless finds himself brooding over how to lead his bereaved family of associates into a new era. Amidst all the darkness and turmoil, at least one thing is still crystal clear: he has a bone to pick with Terry Bogard, the man who took his revered master's life in the first place.`,
    avatarUrl: "billy",
  },
  {
    slug: "mai-cotw",
    name: "Mai",
    story: `Successor to Shiranui-style ninjutsu. Following an important tip-off from dutiful monk Sokaku Mochizuki, this modern-day kunoichi proceeds to South Town with purpose—her intense flame and ever-refined techniques lighting up the darkness therein.`,
    avatarUrl: "mai",
  },
  {
    slug: "kim-cotw",
    name: "Kim",
    story: `Son of taekwondo master Kim Kaphwan, and no stranger to the martial art himself—a true taekwondo prodigy, as he puts it. Dong Hwan's unabashed, happy-go-lucky lifestyle after the previous tournament earns him a stern reprimand from his father, which promptly takes him down a peg or two. Turns out it's just the kind of wake-up call Dong Hwan needs, though—and so, adamant that his grasp of taekwondo will someday surpass even his dad's, the fledgling fighter (secretly) dives headfirst into his own unique brand of training.`,
    avatarUrl: "kim",
  },
  {
    slug: "gato-cotw",
    name: "Gato",
    story: `A man who fights in order to settle the score with his father, Gao. In the previous tournament, Gato was nearly blinded after a vicious attack from him. Although he has for the most part recovered his sense of sight, after realizing the sluggishness in his movements he now willingly chooses to fight in complete darkness. Hearing news of the latest King of Fighters tournament, Gato once again steps into the fray in order to enact his vengeance.`,
    avatarUrl: "gato",
  },
  {
    slug: "kain-cotw",
    name: "Kain",
    story: `Having torn through numerous hostile organizations around South Town, Kain makes an unsettling discovery: his older sister, Marie, is being held captive by one of them. Knowing that his will alone cannot right this wrong, he joins forces with Rock Howard to secure her release. A twist of fate, a dream for the future—with unwavering resolve Kain directs his attention to the upcoming KOF tournament, hoping to return Marie to safety at last.`,
    avatarUrl: "kain",
  },
  {
    slug: "cristiano-cotw",
    name: "Cristiano",
    story: `A divisive figure for sure. Convicted of tax evasion, and accused of rape in 2017 leading to a settlement of $375K. I could argue much of loss of interest in the game prior to launch can be traced back to him. He will forever be a lesson in not putting IRL characters in a fighting game.`,
    avatarUrl: "cristiano",
  },
  {
    slug: "salvatore-cotw",
    name: "Salvatore",
    story: `Salvatore is a justice-dealing Artist who has arrived in South Town looking for inspiration to help finish his latest (and hopefully greatest) anime music video. When his good friend Duck King tells him about the KOF tournament on the horizon, Salvatore decides it just might give him the spark he needs. Combining DJing and martial arts, Salvatore is nothing if not versatile—mixing music, muscles, and mayhem leaving even the most formidable opponents stunned and disoriented by his extraordinary abilities.`,
    avatarUrl: "salvatore",
  },
  {
    slug: "hokutomaru-cotw",
    name: "Hokutomaru",
    story: `Andy Bogard and Mai Shiranui's young pupil. After the previous tournament, Hokutomaru traded his home in the mountains for the bustling metropolis that is South Town—with Terry's help, that is. Despite having to grapple with the ups and downs that is "life in the city," the fledgling Shiranui fighter spends a great deal of time wondering how to use his abilities to help those around him. With the latest tournament now close at hand, Hokutomaru decides it's the perfect opportunity to see how he has grown.`,
    avatarUrl: "hokutomaru",
  },
  {
    slug: "andy-cotw",
    name: "Andy",
    story: `Human weapon. Master of Shiranui ninjutsu.  This legendary South Town shinobi currently works with Mai in her clan's village, where he helps train its youth.  Now that his pupil Hokutomaru has come into his own, Andy longs for the day when the two can square up in a real bout—not only as master and apprentice, but also man-to-man.  At the same time, he knows that a separate battle yet remains: A contest he has always yearned for. A man he was born to fight.`,
    avatarUrl: "andy",
  },
  {
    slug: "ken-cotw",
    name: "Ken",
    story: `A veteran Metro City street fighter who sets his sights on South Town, seeking closure for an incident to which he was wrongfully tied. Burning with determination and a fiery arsenal of unmatched offense, this former US National Fighting Champion eventually crosses paths with the Legendary Wolf himself—and with that, the wheels of fate are set in motion.`,
    avatarUrl: "ken",
  },
  {
    slug: "joe-cotw",
    name: "Joe",
    story: `Famed Muay Thai fighter with stiff kicks that can shatter steel. No other kickboxer can lay a finger, elbow, or knee on Joe Higashi, so the champ winds up tackling a different beast: the silver screen! His biopic documentary, The Legend of Joe (directed by none other than Cheng Sinzan), is already shooting around South Town; Joe even envisions a bit part for star pupil Preecha, whose recent tournament triumphs have done her master proud.`,
    avatarUrl: "joe",
  },
  {
    slug: "chun-cotw",
    name: "Chun-Li",
    story: `Famed Muay Thai fighter with stiff kicks that can shatter steel. No other kickboxer can lay a finger, elbow, or knee on Joe Higashi, so the champ winds up tackling a different beast: the silver screen! His biopic documentary, The Legend of Joe (directed by none other than Cheng Sinzan), is already shooting around South Town; Joe even envisions a bit part for star pupil Preecha, whose recent tournament triumphs have done her master proud.`,
    avatarUrl: "chun-li",
  },
];

const lolCharacters: CharacterType[] = [
  {
    slug: "ahri-2xko",
    name: "Ahri",
    story: `Ahri is a fox-like vastaya who can manipulate her prey's emotions and consume their essence. She's a highly mobile mage with tons of pressure tools at her disposal.`,
    avatarUrl: "ahri",
  },
  {
    slug: "blitzcrank-2xko",
    name: "Blitzcrank",
    story: `Though this big, metal golem was originally made for waste disposal, Blitzcrank now uses their mechanical powers to help people in other ways. Using their rocket fists to pull opponents close, Blitz follows up with potent grabs and energy bursts.`,
    avatarUrl: "blitzcrank",
  },
  {
    slug: "braum-2xko",
    name: "Braum",
    story: `Braum roams the frostbitten wilds of the Freljord, lending his shield to those in need. He deploys defensive utility, close-range attacks, and an army of poros to protect his allies and freeze enemies in their tracks.`,
    avatarUrl: "braum",
  },
  {
    slug: "darius-2xko",
    name: "Darius",
    story: `Rising from humble origins to become a bringer of true carnage, Darius cleaves through the empire's enemies. He's a mid-range fighter with attacks just as brutal and deadly as his axe.`,
    avatarUrl: "darius",
  },
  {
    slug: "ekko-2xko",
    name: "Ekko",
    story: `A prodigy from the rough streets of Zaun, Ekko manipulates time to twist any situation to his advantage. Using his own invention, the Z-Drive, he thrives in pressure mixups and burst mobility.`,
    avatarUrl: "ekko",
  },
  {
    slug: "illaoi-2xko",
    name: "Illaoi",
    story: `The Truth-Bearer of Nagakabouros, Illaoi wields a massive totem to test the will of her enemies and summon spectral tentacles to fight by her side. She's a high-damage lockdown bruiser who overwhelms enemies with pressure as immense as her faith.`,
    avatarUrl: "illaoi",
  },
  {
    slug: "jinx-2xko",
    name: "Jinx",
    story: `With an arsenal of custom guns, traps, and explosives, Jinx unleashes mayhem wherever she goes. She excels at zoning enemies, overwhelming them with colorful destruction from afar.`,
    avatarUrl: "jinx",
  },
  {
    slug: "teemo-2xko",
    name: "Teemo",
    story: `A proud Bandle Scout, Teemo never misses an opportunity to earn a merit badge. Armed with his trusty scout utensils, this yordle is a deceptive ranged fighter with a knapsack full of tricks.`,
    avatarUrl: "teemo",
  },
  {
    slug: "vi-2xko",
    name: "Vi",
    story: `Vi is an impulsive power-puncher who lives to throw hands. Armed with hextech gauntlets and slick boxing footwork, she excels at closing the distance and clobbering foes with haymakers.`,
    avatarUrl: "vi",
  },
  {
    slug: "warwick-2xko",
    name: "Warwick",
    story: `An infamous and vicious beast from the depths of Zaun, Warwick's howl strikes fear into the heart of his opponents. Using powerful teeth and claws, and a relentless rushdown approach, Warwick mauls opponents with varied and unpredictable angles of attack.`,
    avatarUrl: "warwick",
  },
  {
    slug: "yasuo-2xko",
    name: "Yasuo",
    story: `An Ionian of deep resolve, Yasuo is an agile swordsman who wields the air itself against his enemies. He excels at mid-range, using the power of the wind to dash through opponents and block projectiles.`,
    avatarUrl: "yasuo",
  },
];

const characters: CharacterType[][] = [
  sfCharacters,
  cotwCharacters,
  lolCharacters,
];

const games: GameType[] = [
  { slug: "sf6", name: "street fighter 6" },
  { slug: "cotw", name: "city of the wolves" },
  { slug: "2xko", name: "2XKO" },
];

async function main() {
  for (let i = 0; i < games.length; i++) {
    const gameResult = await prisma.game.upsert({
      where: { slug: games[i].slug },
      update: {},
      create: {
        slug: games[i].slug,
        name: games[i].name,
      },
    });
    if (!gameResult) {
      console.log("error making game");
    }
    console.log("Game created ", gameResult);
    console.log("Beginning seed loop for characters...");
    for (const char of characters[i]) {
      console.log(`Loop started for ${char.name} in ${gameResult.name}`);
      await prisma.character.upsert({
        where: { slug: char.slug },
        update: {},
        create: {
          slug: char.slug,
          name: char.name,
          story: char.story,
          gameId: gameResult.id,
          avatarUrl: char.avatarUrl,
        },
      });
      console.log(`Loop for ${char.name} finished.`);
    }
  }

  // console.log("Start seeding...");
  // console.log("Seeding game/s...");
  // const gameResult = await prisma.game.upsert({
  //   where: { slug: games[0].slug },
  //   update: {},
  //   create: {
  //     slug: games[0].slug,
  //     name: games[0].name,
  //   },
  // });
  // if (!gameResult) {
  //   console.log("error making game");
  // }
  // console.log("Game created ", gameResult);
  // console.log("beginning seeding loop for characters");

  // for (const character of sfCharacters) {
  //   console.log("Loop started for ", character.name);
  //   await prisma.character.upsert({
  //     where: { slug: character.slug },
  //     update: {},
  //     create: {
  //       slug: character.slug,
  //       name: character.name,
  //       story: character.story,
  //       gameId: gameResult.id,
  //       avatarUrl: character.avatarUrl,
  //     },
  //   });
  //   console.log("Loop finished for ", character.name);
  // }
  const charCount = await prisma.character.count();
  console.log(`Seeding complete! ${charCount} characters seeded!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
