interface BaseRule {
  template: string;
}

type InitialRuleType = 'Guess';

interface InitialRule extends BaseRule {
  type: InitialRuleType;
}

const initialRules: InitialRule[] = [
  {
    type: 'Guess',
    template: 'Each player must ${playerVerb1} a ${playerNoun1}.',
  },
];

const playerVerb1Options = [
  'draw',
  'sing',
  'mime',
  'hum',
  'describe without saying the name of',
  'rhyme'
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

function pickRandom<T>(array: T[]): T {
  return array[_.random(0, array.length - 1)];
}

function generateRules() {
  const initialRule = pickRandom(initialRules);
  const initialRuleTemplate = _.template(initialRule.template);
  const playerVerb1 = pickRandom(playerVerb1Options);
  const playerNoun1 = pickRandom(playerNoun1Options);
  const initialRuleText = initialRuleTemplate({ playerVerb1, playerNoun1 });
  return initialRuleText;
}

document.addEventListener("DOMContentLoaded", (e) => {
  document.getElementById("rules")!.innerHTML = generateRules();
});