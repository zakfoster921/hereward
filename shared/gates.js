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
      prompt: P.n, eyebrow: "", name: P.name,
      steps: [
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

        '<h3>' + (b.title || 'Full body recall') + '</h3>' +
        '<p>' + b.intro + '</p>' +
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
      ]
    };
  }

  var gate2 = {
      eyebrow: "Gate 2", name: "Deepen the charge",
      steps: [
        '<p>Read over your writing and <u><em>underline the detail</em></u> that pulls at you most. That detail carries <strong>your charge</strong>: the emotional current that makes it matter to you.</p>' +
        GATE_ART.replace('class="gate-art"', 'class="gate-art fixed-art"'),
        '<h3>Follow where it points</h3>' +
        SIGNPOST_ART +
        '<p>A detail is often a doorway to something larger. Let your mind follow it a little further.</p>' +
        '<div class="reserve">' +
        asks(['Picture the detail you underlined as a <strong>signpost</strong>.', '<em>What is it pointing you toward?</em>']) +
        withTap(2, stuck("s-g2", "Finish this sentence: Underneath this detail is…")) +
        '</div>'
      ]
    };

  var gate3 = {
      eyebrow: "Gate 3", name: "Visualize the charge",
      steps: [
        '<h3>Choose a way in</h3>' +
        '<p>Your free-write is full of specific words and images that can carry your charge.</p>' +
        '<div class="ways">' +
        '<details class="seq" style="--d:0.5s" name="way"><summary>Start with a thing</summary><p>Which one in your writing holds your charge best? Sketch it or imagine it.</p></details>' +
        '<details class="seq" style="--d:1.1s" name="way"><summary>Start with your fabrics</summary><p>Look through what you have. Which one feels like it can carry your charge? What about it: color, texture, pattern?</p></details>' +
        '<details class="seq" style="--d:1.7s" name="way"><summary>Start with a word</summary><p>Choose a specific, personal word you wrote or that comes to mind. What makes this <em>your</em> word? How would you stitch it: what style, what size, what color?</p></details>' +
        '</div>' +
        '<div class="seq" style="--d:2.3s">' +
        stuck("s-g3", "Scan your writing again for a second detail that belongs with the first. Picture the two together.") +
        '</div>' +
        GATE_ART
      ]
    };

  function gate4(P) {
    return {
      eyebrow: "Gate 4", name: "Test the charge",
      steps: [
        '<p>This matrix helps you reflect on how <strong>personal</strong> and how <strong>strong</strong> your image is. <strong>Tap a corner</strong> to see how each one works.</p>' +
        MATRIX +
        '<p class="ask noline">Where does your image currently land?</p>',

        '<h3>Does your image want to move to another part of the matrix?</h3>' +
        '<div class="reserve">' +
        '<ul class="iconlist">' + '<li class="seq" data-t="1" hidden style="--d:0s">To move toward <strong>Personal</strong>, add a detail only you would know</li>' + '<li class="seq" data-t="2" hidden style="--d:0s">To move toward <strong>Strong</strong>, return to your <a href="#" class="steplink" data-g="0" data-s="1">sensory writing</a> and find a detail that holds more of your charge</li>' + '<li class="seq" data-t="3" hidden style="--d:0s">If it holds up where it is, it’s time to start sewing</li>' + '</ul>' +
        '<div class="seq example-card" data-t="4" hidden style="--d:0s"><div class="ex-top"><p class="ex-label">Example</p><p>' + P.g4.exampleTop + '</p></div><div class="ex-bottom"><p>' + P.g4.exampleBottom + '</p></div></div>' +
        '<div class="seq" data-t="4" hidden style="--d:0.8s">' + stuck("s-g4", P.g4.stuck) + '</div>' +
        '</div>' +
        GATE_ART
      ]
    };
  }

  function closing(P) {
    return {
      eyebrow: "All gates completed", name: "Time to sew", closing: true,
      steps: [
        '<p class="big">Take your ' + P.subject + ' image and add it to your quilt.</p>' +
        '<p>Keep your charge in mind as you sew, and look for chances to heighten the charge even more.</p>'
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
    return [gate1(P), gate2, gate3, gate4(P), closing(P)];
  };
})();
