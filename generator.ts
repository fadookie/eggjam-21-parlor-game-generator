interface Rule {
  template: string;
}

const initialRules: Rule[] = [
  {
    template: 'In each round, one player must ${playerVerb1} a ${playerNoun1}.',
  },
];

const intermediateRules1: Rule[] = [
  {
    template: 'Every other player takes turns ${playerVerb2} the ${playerNoun1} based on the original ${playerVerb1AsNoun}.',
  }
];

const intermediateRules2: Rule[] = [
  {
    template: 'The original player is blindfolded.',
  },
  {
    template: 'The order of the ${playerVerb2AsNoun} are shuffled.',
  },
  {
    template: 'One player is secretly selected as the traitor by drawing a special card, and must try to make all the other players lose.',
  },
];

const intermediateRules3: Rule[] = [
  {
    template: 'The original player must exactly reproduce the ${playerVerb2AsNoun} of each other player.',
  },
  {
    template: 'Each other player must try to reproduce the ${playerVerb2AsNoun} of each other player in a ring.',
  },
];

const finalRules: Rule[] = [
  {
    template: 'Everyone judges this, if a majority of players think the original player deserves to win, they win. Otherwise, the other players win.',
  },
  {
    template: 'If a player makes an obvious mistake and a majority of players boo them, they are out of the game. The last player remaining wins.',
  },
];

const playerVerb1Options = [
  ['draw', 'drawing'],
  ['sing', 'song'],
  ['mime', 'mime performance'],
  ['hum', 'hummed tune'],
  ['describe without saying the name of', 'description'],
  ['rhyme', 'rhyme'],
];

const playerVerb2Options = [
  ['guessing', 'guess'],
  ['singing', 'song'],
  ['miming', 'mime performance'],
  ['humming', 'hummed tune'],
  ['describing without saying the name of', 'description'],
  ['rhyming', 'rhyme'],
  ['drawing', 'drawing'],
  ['interpretive dancing', 'interpretive dance'],
  ['beatboxing', 'beatbox performance'],
  ['rapping', 'rap'],
];

const playerNoun1Options = [
  'weather phenomenon',
  'video game',
  'video game character',
  'famous person',
  'book',
  'song',
  'famous artwork',
  'actor',
  'politician',
  'youtuber',
  'flower',
  'animal',
  'food item',
  'poem'
];

const ruleHistory: string[] = [];
let currentRuleHistoryIndex = -1;

function pickRandom<T>(array: T[]): T {
  return array[_.random(0, array.length - 1)];
}

function generateRules() {
  // Bind variables
  const playerVerb1Tenses = pickRandom(playerVerb1Options);
  const playerVerb1 = playerVerb1Tenses[0];

  const playerVerb1AsNoun = playerVerb1Tenses[1];
  const playerVerb2Tenses = pickRandom(playerVerb2Options);
  const playerVerb2 = playerVerb2Tenses[0];
  const playerVerb2AsNoun = playerVerb2Tenses[1];

  const playerNoun1 = pickRandom(playerNoun1Options);

  const allVariables = { playerVerb1, playerVerb1AsNoun, playerVerb2, playerVerb2AsNoun, playerNoun1 };

  // Pick and interpolate rules
  const initialRule = pickRandom(initialRules);
  const initialRuleTemplate = _.template(initialRule.template);
  const initialRuleText = initialRuleTemplate(allVariables);

  const intermediateRule1 = pickRandom(intermediateRules1);
  const intermediateRule1Template = _.template(intermediateRule1.template);
  const intermediateRule1Text = intermediateRule1Template(allVariables);

  const intermediateRule2 = pickRandom(intermediateRules2);
  const intermediateRule2Template = _.template(intermediateRule2.template);
  const intermediateRule2Text = intermediateRule2Template(allVariables);

  const intermediateRule3 = pickRandom(intermediateRules3);
  const intermediateRule3Template = _.template(intermediateRule3.template);
  const intermediateRule3Text = intermediateRule3Template(allVariables);

  const finalRule = pickRandom(finalRules);
  const finalRuleTemplate = _.template(finalRule.template);
  const finalRuleText = finalRuleTemplate(allVariables);

  return `<p>${initialRuleText}</p>
<p>${intermediateRule1Text}</p>
<p>${intermediateRule2Text}</p>
<p>${intermediateRule3Text}</p>
<p>${finalRuleText}</p>`;
}

function prevRule() {
  if (currentRuleHistoryIndex > 0) {
    --currentRuleHistoryIndex;
    updateRule();
  }
}

function nextRule() {
  if (currentRuleHistoryIndex == ruleHistory.length - 1) {
    const newRule = generateRules();
    ruleHistory.push(newRule);
  }
  ++currentRuleHistoryIndex;
  updateRule();
}

function copyToClipboard() {
  if (currentRuleHistoryIndex >= 0) {
    navigator.clipboard.writeText(ruleHistory[currentRuleHistoryIndex]);
  }
}

function updateRule() {
  document.getElementById("rules")!.innerHTML = ruleHistory[currentRuleHistoryIndex];
  document.getElementById("ruleIndex")!.innerHTML = `Game ${currentRuleHistoryIndex + 1}/${ruleHistory.length}`;
}

document.addEventListener("DOMContentLoaded", (e) => {
  nextRule();
});