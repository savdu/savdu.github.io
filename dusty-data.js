// Story content for Dusty & Crumby — edit this file to write the actual story.
//
// Each beat is keyed by id and has:
//   characters: ["dusty", "crumby"]       which character(s) are on stage — either, both, or neither
//   narration:  string | null             shown centered in the box below the stage
//   dialogue:   { speaker, text } | null  shown as a speech bubble above `speaker` ("dusty" | "crumby")
//   next:       id of the following beat, or null to end the story
//   choices:    [{ label, next }, ...]    use instead of `next` to branch — renders one button per choice
//   mode:       "movable" (optional)      characters become arrow-key/WASD-controlled
//                                          roaming sprites instead of static stage art
//   items:      [{ emoji, speaker, text }, ...] (optional) — randomly placed
//               on screen; when a roaming character touches one, its `text`
//               shows in a speech bubble above the emoji itself
//
// A beat can have narration and dialogue at the same time (scene-setting text
// plus a line from a character), just one of the two, or neither.

const story = {
  start: "scene1",
  beats: {
    scene1: {
      characters: [],
      narration: `NOTICE: this experience is for crumby and crumby only. are you crumby?`,
      dialogue: null,
      choices: [
        { label: "yes", next: "scene4" },
        { label: "no", next: "scene1-no" }
      ]
    },
    "scene1-no": {
      characters: [],
      narration: `this experience is for crumby. maybe another time.`,
      dialogue: null,
      next: null
    },
    // scene2: {
    //   characters: ["crumby"],
    //   narration: `this is crumby. crumby is great.`,
    //   dialogue: null,
    //   next: "scene3"
    // },
    // scene3: {
    //   characters: ["dusty"],
    //   narration: `this is dusty. dusty is great.`,
    //   dialogue: null,
    //   next: "scene4"
    // },
    scene4: {
      characters: ["crumby"],
      mode: "movable",
      narration: `this is crumby. crumby is great. crumby has a lot of energy. he is a philosopher-realist (thanks peter singer) 
      with a boundless energy and curiosity for life and deep appreciation for engaging conversation with 
      cool people. crumby loves to be loved.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "crumby", text: "i'm the best!" }
      ],
      next: "scene5"
    },
    scene5: {
      characters: ["crumby"],
      mode: "movable",
      narration: `crumby is dusty's hero. he's thoughtful and affectionate in his wacky endearing way.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "crumby", text: "be there in 30" },
        { emoji: "🌸", speaker: "crumby", text: "i got you a gift and you won't like it but the science says it helps anxiety so we'll try it together" },
        { emoji: "🌸", speaker: "crumby", text: "let's escape to the woods!! it'll be good for you!!" },
        { emoji: "🌸", speaker: "crumby", text: "let me read to you" },
        { emoji: "🌸", speaker: "crumby", text: "i dreamed about the optimal sleeping system for us" },
      ],
      next: "scene6"
    },

    scene6: {
      characters: ["dusty"],
      mode: "movable",
      narration: `dusty shows affection, but only in the ways ingrained from her childhood (nurture, even though nature may or may not be more formative to the soul)
       - through acts of service and nagging. it's always been easier to assume than to ask.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "dusty", text: "some fruit for you (i like you)." },
        { emoji: "🌸", speaker: "dusty", text: "hydrate don't diedrate (i like you)." },
        { emoji: "🌸", speaker: "dusty", text: "i have an extra toothbrush (i like you)." },
        { emoji: "🌸", speaker: "dusty", text: "i made a stack of large shirts that fit you (i like you)." },
        { emoji: "🌸", speaker: "dusty", text: "you should sleep earlier (i like you)." },
        { emoji: "🌸 ", speaker: "dusty", text: "you're stressed!! let's go to the sauna (i like you)." },
      ],
      next: "scene7"
    },
    scene7: {
      characters: ["dusty"],
      mode: "movable",
      narration: `there are a lot of thoughts dusty keeps to herself that should really be said out loud.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "dusty", text: "i really really love seeing how lost in the moment and excited you get about music you like (you are enough)." },
        { emoji: "🌸", speaker: "dusty", text: "i appreciate how thoughtful you are of my shyness (when you left your citibike out and stayed with me in the apartment so i wouldn't be there alone)." },
        { emoji: "🌸", speaker: "dusty", text: "i like that you push me out of my comfort zone and how great of a cheerleader you are (salsa, knicks in 5)." },
        { emoji: "🌸", speaker: "dusty", text: "i like that you remember things i mention liking and take initiative (jazz bar, whitney, fruit picking)." },
        { emoji: "🌸", speaker: "dusty", text: "i like seeing you energetic, i like hearing you yap, i like being in your electric presence." },
        { emoji: "🌸", speaker: "dusty", text: "i like spending time with you, being in the same room as you, being close to you, even in silence." },
      ],
      next: "scene8"
    },
    scene8: {
      characters: ["dusty"],
      mode: "movable",
      narration: `dusty is a whimsical girly at heart who wants to embark on many a side quest with crumby. 
      but she's also learning to balance being self-sufficient with being emotionally vulnerable, learning to communicate instead of handling everything herself.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "dusty", text: "my depression used to weigh heavily on my close friends - i swung too far in the other direction of keeping things in." },
        { emoji: "🌸", speaker: "dusty", text: "my anxiety is pretty bad teehee! ok actually it's really paralyzing. sometimes i physically can't move because i'm thinking of what movements are the most efficient for all the things i need to do." },
      ],
      next: "scene9"
    },
    scene9: {
      characters: ["dusty"],
      mode: "movable",
      narration: `she takes long pauses and speaks slowly because she wants to say exactly the right things in the right way, but sometimes it comes across as aloofness.`,
      dialogue: null,
      items: [
        { emoji: "🌸", speaker: "dusty", text: "i'm trying operate at the speed of ai, unsuccessfully." },
        { emoji: "🌸", speaker: "dusty", text: "sometimes i takes bathroom breaks to sit on the toilet and imagine not existing because then i wouldn't have to feel anxious anymore (i love living)." },
        { emoji: "🌸", speaker: "dusty", text: "what if you get escorted off the premises away into another dimension and then i never see you again?" },
        { emoji: "🌸", speaker: "dusty", text: "what if i text you too much and then you get annoyed at how needy i am and nothing is actually interesting and then you get frustrated at work and lose your job and have to move back to pennsylvania and i never see you again and it was all my fault?" },
        { emoji: "🌸", speaker: "dusty", text: "my ocd manifests as extreme black-and-white thinking. if i'm not showing you enough affection, maybe i should just quite stripe and disappear from your life forever! i won't, but that's my immediate first thought." },
        { emoji: "🌸", speaker: "dusty", text: "these are not excuses - i have room to grow and ask for your patience and understanding." }
      ],
      next: "scene10"
    },
    scene10: {
      characters: ["dusty"],
      mode: "movable",
      narration: `i'm sorry for not being clear with my affection and communication. you inspire me to be more open, social, energetic, magnetic, vulnerable, affectionate. 
      i may not be able to immediately communicate everything perfectly, but i can promise that i'll do my best to learn about your needs and say more of the things that are on my mind.
      thank you for being patient with me.`,
      dialogue: null,
      next: "scene11"
    },
    scene11: {
      characters: ["dusty", "crumby"],
      mode: "movable",
      narration: `(i like you)`,
      dialogue: null,
      next: null
    },
    scene11: {
      characters: ["dusty", "crumby"],
      mode: "movable",
      narration: `(i like you)`,
      dialogue: null,
      next: "scene12"
    },
    scene12: {
      characters: ["dusty", "crumby"],
      // mode: "movable",
      narration: `these were the original sprites lol`,
      dialogue: null,
      next: null
    },
  }
};