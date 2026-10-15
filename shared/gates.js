(function () {
  var QA = window.QA, asks = QA.asks, withTap = QA.withTap, stuck = QA.stuck, MATRIX = QA.MATRIX;
  var GATE_ART = QA.GATE_ART;
  var SIGNPOST_ART = QA.SIGNPOST_ART;
  var CHARGE_ART = QA.CHARGE_ART;
  var NOTEBOOK_ART = QA.NOTEBOOK_ART;
  var SCISSORS_ART = QA.SCISSORS_ART;
  var SENSES_ART = QA.SENSES_ART;
  var DOODLE_ART = QA.DOODLE_ART;

  function gate1(P) {
    var a = P.g1, b = P.g1b || {}, c = P.g1c;
    var cols = b.cols || ["Hear", "Smell", "Touch"];
    var n = a.asks.length;
    var lis = a.asks.map(function (q, i) { return '<li data-t="' + (i + 1) + '" hidden>' + q + '</li>'; }).join('');
    var ths = cols.map(function (h) { return '<th scope="col">' + h + '</th>'; }).join('');
    var row = '<tr>' + cols.map(function () { return '<td></td>'; }).join('') + '</tr>';
    return {
      prompt: P.n, eyebrow: "", name: P.name, aim: !!a.aim,
      steps: [
        (a.aim ? '<p class="lead rule">' + a.aim + '</p>' + (a.aimNote ? '<p>' + a.aimNote + '</p>' : '') : null),
        (a.title ? '<div><p class="eyebrow">Gate 1</p><h3 class="step-title">' + a.title + '</h3></div>' : '') +
        '<p class="lead rule">' + a.lead + '</p>' +
        '<div class="reserve">' +
        '<div class="asklist" data-t="1" hidden><ul>' + lis + '</ul></div>' +
        '<div data-t="' + n + '" hidden>' +
        '<details class="note seq" style="--d:0.5s"><summary>New to free-writing?</summary><p>Write by hand or type, and keep writing. Nothing here needs to be polished or shared. It just needs to be true. About one page for each part is a good rhythm.</p></details>' +
        '<div class="seq" style="--d:1.1s">' +
        stuck("s-g1a", a.stuck) +
        '</div>' +
        '</div>' +
        '</div>' +
        GATE_ART,

        '<h3>' + (b.title || 'What You Sense') + '</h3>' +
        '<p>' + (b.intro || 'Fill each column with what you sense as you picture it.') + '</p>' +
        '<table class="sense-chart"><thead><tr>' + ths + '</tr></thead><tbody>' + row + row + row + '</tbody></table>' +
        '<p class="chart-note">' + (b.note || 'List at least three in each. Add anything else you’d like.') + '</p>' +
        SENSES_ART,

        DOODLE_ART +
        '<h3>' + (c.title || 'What remains') + '</h3>' +
        '<p>' + c.intro + '</p>' +
        '<div class="reserve">' +
        asks(c.starters) +
        withTap(c.starters.length, stuck("s-g1", c.stuck)) +
        '</div>'
      ].filter(function (x) { return x !== null; })
    };
  }

  var GATE2_OPENERS = [
  "Read over your writing and <u><em>underline the detail</em></u> that pulls at you most. That detail carries <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Read back over your writing and <u><em>underline the detail</em></u> that pulls at you most. That detail carries <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Look back at what you wrote. <u><em>Underline the one detail</em></u> you keep returning to. That\u2019s where <strong>your charge</strong> lives: the emotional current behind why this matters.",
  "Reread your writing and <u><em>underline the detail</em></u> that stirs something in you, even if you can\u2019t say why. <strong>Your charge</strong> is in there: the emotional current that makes this matter to you.",
  "Go back through what you wrote and <u><em>underline the line or detail</em></u> that your eye keeps landing on. It carries <strong>your charge</strong>, the feeling that makes it yours.",
  "Read it again, slowly. <u><em>Underline the detail</em></u> that makes you pause. That pause is <strong>your charge</strong>: the emotional current that makes it matter to you.",
  "Scan your writing for the detail that feels most alive, or the one you almost left out. <u><em>Underline it.</em></u> <strong>Your charge</strong> is hiding there: the emotional current that makes it matter to you.",
  "Reread your writing and <u><em>underline the detail</em></u> that pulls at you most. That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline the detail</em></u> you keep returning to. That\u2019s where <strong>your charge</strong> lives.",
  "Find the detail that makes you pause. <u><em>Underline it.</em></u> That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline the one detail</em></u> that feels most alive. It carries <strong>your charge</strong>.",
  "Reread, then <u><em>underline the detail</em></u> that stirs you most. That\u2019s <strong>your charge</strong>.",
  "<u><em>Underline what pulls at you.</em></u> That\u2019s <strong>your charge</strong>.",
  "Look for the detail you almost left out. <u><em>Underline it.</em></u> <strong>Your charge</strong> is probably there.",
  "<u><em>Underline the detail</em></u> that feels most yours. That\u2019s <strong>your charge</strong>."
];

  function gate2opener(P) {
    var n = (P && P.n) || 1;
    var i = n - 1, L = 7; // the first seven are the full versions; after that only the shorter ones cycle
    if (i >= GATE2_OPENERS.length) i = L + ((i - L) % (GATE2_OPENERS.length - L));
    return GATE2_OPENERS[i];
  }

  var GATE2B = [
  {
    "h": "Follow where it points",
    "p": "A detail is often a doorway to something larger. Let your mind follow it a little further.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What is it pointing you toward?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Where does it lead?",
    "p": "Small details often point to something bigger. Give yours a little room to lead.",
    "a": "Imagine the detail you underlined as a <strong>signpost</strong>.",
    "q": "Which way does it point?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Read the signpost",
    "p": "The detail you underlined is a clue. Stay with it a moment and see what it opens onto.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "Where does it take you?",
    "s": "What I keep coming back to is\u2026"
  },
  {
    "h": "Take one more step",
    "p": "Your detail may be pointing past itself. Let your mind wander a little further down the road.",
    "a": "See your underlined detail as a <strong>signpost</strong>.",
    "q": "What\u2019s the next place it points to?",
    "s": "If I followed this detail, I\u2019d end up at\u2026"
  },
  {
    "h": "What\u2019s behind it?",
    "p": "Details are often the tip of something. Let yours lead you a little deeper.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What does it want you to notice next?",
    "s": "Behind this detail is\u2026"
  },
  {
    "h": "Where does it lead?",
    "p": "A detail is often a doorway to something larger. Let your mind follow it a little further.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "What does it make you think of next?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Read the signpost",
    "p": "Small details often point to something bigger. Give yours a little room to lead.",
    "a": "Picture the detail you underlined as a <strong>signpost</strong>.",
    "q": "What is it pointing you to?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Follow the detail",
    "p": "Let your mind follow it a little further.",
    "a": "Picture your detail as a <strong>signpost</strong>.",
    "q": "What is it pointing toward?",
    "s": "Underneath this detail is\u2026"
  },
  {
    "h": "Let it lead",
    "p": "Let your mind follow it a little further.",
    "a": "Picture the detail as a <strong>signpost</strong>.",
    "q": "What does it remind you of?",
    "s": "This detail makes me think of\u2026"
  },
  {
    "h": "Follow the detail",
    "p": "Small details often point to something bigger.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "What does it make you think of next?",
    "s": "Behind this detail is\u2026"
  },
  {
    "h": "Let it lead",
    "p": "Give it a little room to lead.",
    "a": "Picture it as a <strong>signpost</strong>.",
    "q": "Where does it take you?",
    "s": "What I keep coming back to is\u2026"
  }
];

  function gate2b(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 7; // seven full versions, then the shorter ones cycle
    if (i >= GATE2B.length) i = L + ((i - L) % (GATE2B.length - L));
    return GATE2B[i];
  }

  function gate2(P) {
    return {
      eyebrow: "Gate 2", name: "Deepen the charge",
      steps: [
        '<p>' + gate2opener(P) + '</p>' +
        GATE_ART.replace('class="gate-art"', 'class="gate-art fixed-art"'),
        '<h3>' + gate2b(P).h + '</h3>' +
        SIGNPOST_ART +
        '<p>' + gate2b(P).p + '</p>' +
        '<div class="reserve">' +
        asks([gate2b(P).a, '<em>' + gate2b(P).q + '</em>']) +
        withTap(2, stuck("s-g2", "Finish this sentence: " + gate2b(P).s)) +
        '</div>'
      ]
    };
  }

  var GATE3H = [
  {
    "h": "Choose a way in",
    "p": "Your free-write is full of specific words and images that can carry your charge."
  },
  {
    "h": "Pick a place to start",
    "p": "Your writing has plenty of words and images that could hold your charge."
  },
  {
    "h": "Where do you want to begin?",
    "p": "Somewhere in your writing is something that can carry your charge."
  },
  {
    "h": "Find a way in",
    "p": "Your free-write is full of details that could hold your charge. Choose one way to begin."
  },
  {
    "h": "Start with what you have",
    "p": "The words, images and details in your writing can all carry your charge."
  },
  {
    "h": "Which way feels right today?",
    "p": "Any of these can carry your charge into cloth."
  },
  {
    "h": "Three ways to start",
    "p": "Your writing already holds what you need. Pick the one that feels easiest."
  },
  {
    "h": "Choose a way in",
    "p": "Your writing can carry your charge."
  },
  {
    "h": "Pick a place to start",
    "p": "Choose whichever feels easiest."
  },
  {
    "h": "Where to begin?",
    "p": "Start with whatever your writing gives you."
  }
];

  var GATE3_THING = ["Which one in your writing holds your charge best? Sketch it or imagine it.", "Is there an object in your writing that holds your charge? Sketch it or picture it.", "Pick the object or image that feels most loaded. Draw it or hold it in your mind."], GATE3_FABRIC = ["Look through what you have. Which one feels like it can carry your charge? What about it: color, texture, pattern?", "Spread out some fabrics. Which one feels right for your charge? What is it about it?", "Handle your fabrics for a minute. Which one gets your attention, and why?"], GATE3_WORD = ["Choose a specific, personal word you wrote or that comes to mind. What makes this <em>your</em> word? How would you stitch it: what style, what size, what color?", "Pick a word from your writing that matters to you. How would it look in thread?", "Find a word that holds your charge. What size, color and style would you stitch it in?"], GATE3_STUCK = ["Scan your writing again for a second detail that belongs with the first. Picture the two together.", "Pick a second detail that might sit next to the first. What do they look like together?", "Look for another detail that matches the first. Imagine them side by side.", "Choose two details and picture them in the same spot on your quilt."];

  function gate3h(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 7; // seven full versions, then the shorter ones cycle
    if (i >= GATE3H.length) i = L + ((i - L) % (GATE3H.length - L));
    return GATE3H[i];
  }

  function pick3(list, P) { return list[(((P && P.n) || 1) - 1) % list.length]; }

  function gate3(P) {
    return {
      eyebrow: "Gate 3", name: "Visualize the charge",
      steps: [
        '<h3>' + gate3h(P).h + '</h3>' +
        '<p>' + gate3h(P).p + '</p>' +
        (P.g3 && P.g3.note ? '<p>' + P.g3.note + '</p>' : '') +
        '<div class="ways">' +
        '<details class="seq" style="--d:0.5s" name="way"><summary>Start with a thing</summary><p>' + pick3(GATE3_THING, P) + '</p></details>' +
        '<details class="seq" style="--d:1.1s" name="way"><summary>Start with your fabrics</summary><p>' + pick3(GATE3_FABRIC, P) + '</p></details>' +
        '<details class="seq" style="--d:1.7s" name="way"><summary>Start with a word</summary><p>' + pick3(GATE3_WORD, P) + '</p></details>' +
        '</div>' +
        '<div class="seq" style="--d:2.3s">' +
        stuck("s-g3", GATE3_STUCK[((P.n || 1) - 1) % GATE3_STUCK.length]) +
        '</div>' +
        GATE_ART
      ]
    };
  }

  var GATE4_INTRO = [
  "This matrix helps you reflect on how <strong>personal</strong> and how <strong>strong</strong> your image is. <strong>Tap a corner</strong> to see how each one works.",
  "This matrix shows how <strong>personal</strong> and how <strong>strong</strong> your image is. <strong>Tap a corner</strong> to see what each one means.",
  "Use this matrix to check how <strong>personal</strong> and how <strong>strong</strong> your image feels. <strong>Tap a corner</strong> to see how each one works.",
  "Here\u2019s a way to test your image: how <strong>personal</strong> is it, and how <strong>strong</strong>? <strong>Tap a corner</strong> to see what each corner means.",
  "Your image sits somewhere on this matrix, between <strong>personal</strong> and universal and between <strong>strong</strong> and faint. <strong>Tap a corner</strong> to find out what each means.",
  "Let\u2019s see where your image lands. <strong>Tap a corner</strong> to learn what each part of the matrix means.",
  "Where does your image fall on the matrix?",
  "Check your image against the matrix."
];

  var GATE4_ASK = ["Where does your image currently land?", "Where does your image land right now?", "Which corner is it closest to?", "Where do you think your image sits?"], GATE4_HEAD = ["Does your image want to move to another part of the matrix?", "Does your image want to move?", "Would your image like to be somewhere else on the matrix?", "Should your image shift to another corner?", "Is there a corner you\u2019d like it to move toward?", "Does your image feel finished, or does it want to move?"], GATE4_PERSONAL = ["To move toward <strong>Personal</strong>, add a detail only you would know", "To make it more <strong>Personal</strong>, add a detail only you would know", "For more <strong>Personal</strong>, add something only you would notice", "To move toward <strong>Personal</strong>, add a detail that\u2019s yours alone"], GATE4_STRONG = ["To move toward <strong>Strong</strong>, return to your {link} and find a detail that holds more of your charge", "To make it <strong>Stronger</strong>, go back to your {link} and find a detail that holds more of your charge", "For more <strong>Strong</strong>, return to your {link} and pick a detail that carries more charge", "To move toward <strong>Strong</strong>, look in your {link} for a detail that holds more charge"], GATE4_DONE = ["If it holds up where it is, it\u2019s time to start sewing", "If it already feels right where it is, you\u2019re ready to sew", "If it feels right where it is, go ahead and start sewing", "If nothing needs to change, it\u2019s time to sew"];

  function gate4intro(P) {
    var n = (P && P.n) || 1, i = n - 1, L = 6; // six full versions, then the shorter ones cycle
    if (i >= GATE4_INTRO.length) i = L + ((i - L) % (GATE4_INTRO.length - L));
    return GATE4_INTRO[i];
  }

  function g4pick(list, P, stride) { return list[((((P && P.n) || 1) - 1) * stride) % list.length]; }

  function gate4(P) {
    return {
      eyebrow: "Gate 4", name: "Test the charge",
      steps: [
        '<p>' + gate4intro(P) + '</p>' +
        MATRIX +
        '<p class="ask noline">' + g4pick(GATE4_ASK, P, 1) + '</p>',

        '<h3>' + g4pick(GATE4_HEAD, P, 1) + '</h3>' +
        '<div class="reserve">' +
        '<ul class="iconlist">' + '<li class="seq" data-t="1" hidden style="--d:0s">' + g4pick(GATE4_PERSONAL, P, 1) + '</li>' + '<li class="seq" data-t="2" hidden style="--d:0s">' + g4pick(GATE4_STRONG, P, 3).replace('{link}', '<a href="#" class="steplink" data-g="0" data-s="' + (P.g1.aim ? 2 : 1) + '">sensory writing</a>') + '</li>' + (P.g4.sizeNote ? '<li class="seq" data-t="3" hidden style="--d:0s">' + P.g4.sizeNote + '</li>' : '') +
        '<li class="seq" data-t="3" hidden style="--d:0s">' + g4pick(GATE4_DONE, P, 1) + '</li>' + '</ul>' +
        (P.g4.collapse ? '<details class="seq ex-fold" data-t="4" hidden style="--d:0s"><summary>Want to see an example?</summary>' : '<div class="seq" data-t="4" hidden style="--d:0s">') + '<div class="example-card"><div class="ex-top"><p>' + P.g4.exampleTop + '</p></div><div class="ex-bottom"><p>' + P.g4.exampleBottom + '</p></div></div>' + (P.g4.collapse ? '</details>' : '</div>') +
        '<div class="seq" data-t="4" hidden style="--d:0.8s">' + stuck("s-g4", P.g4.stuck) + '</div>' +
        '</div>' +
        GATE_ART
      ]
    };
  }

  function closing(P) {
    return {
      eyebrow: "All gates completed", name: "Time to sew!", closing: true,
      steps: [
        '<p class="big">' + (P.closing && P.closing.line ? P.closing.line : 'Add your ' + P.subject + ' image to your quilt.') + '</p>' +
        '<p>' + (P.closing && P.closing.note ? P.closing.note + ' ' : '') + (P.closing && P.closing.guide ? P.closing.guide : 'Keep your charge in mind as you sew, and look for chances to heighten the charge even more.') + '</p>'
      ]
    };
  }

  QA.buildGates = function (P) {
    if (P.placeholder) {
      return [{
        prompt: P.n, eyebrow: "", name: "Coming soon",
        steps: ['<p>This prompt has not been written yet. This page is a placeholder.</p>']
      }];
    }
    return [gate1(P), gate2(P), gate3(P), gate4(P), closing(P)];
  };
})();
