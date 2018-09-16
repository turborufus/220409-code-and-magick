'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SECOND_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_AMOUNT = 4;

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var createRandomArrayIndex = function (arrayLength) {
  var array = [];
  for (var i = 0; i < arrayLength; i++) {
    array.push(i);
  }

  for (i = arrayLength - 1; i > 0; i--) {
    var j = getRandomInt(0, i);
    var temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
};

var createWizardsArray = function (amount) {
  var wizards = [];

  var randomFirstNameIndexes = createRandomArrayIndex(FIRST_NAMES.length);
  var randomSecondNameIndexes = createRandomArrayIndex(SECOND_NAMES.length);
  var randomCoatColorIndexes = createRandomArrayIndex(COAT_COLORS.length);
  var randomEyesColorIndexes = createRandomArrayIndex(EYES_COLORS.length);

  for (var i = 0; i < amount; i++) {
    var newWizard = {
      name: '',
      coatColor: '',
      eyesColor: ''
    };

    newWizard.name = FIRST_NAMES[randomFirstNameIndexes[i]] + ' ' + SECOND_NAMES[randomSecondNameIndexes[i]];
    newWizard.coatColor = COAT_COLORS[randomCoatColorIndexes[i]];
    newWizard.eyesColor = EYES_COLORS[randomEyesColorIndexes[i]];

    wizards.push(newWizard);
  }

  return wizards;
};

var createWizardElement = function (wizardTemplate, wizardObject) {
  var wizardElement = wizardTemplate.cloneNode(true);

  var name = wizardTemplate.querySelector('.setup-similar-label');
  name.textContent = wizardObject.name;

  var coatColor = wizardElement.querySelector('.wizard-coat');
  coatColor.style.fill = wizardObject.coatColor;

  var eyesColor = wizardElement.querySelector('.wizard-eyes');
  eyesColor.style.fill = wizardObject.eyesColor;

  return wizardElement;
};

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizards = createWizardsArray(WIZARDS_AMOUNT);

var fragment = document.createDocumentFragment();
for (var i = 0; i < WIZARDS_AMOUNT; i++) {
  var wizardElement = createWizardElement(similarWizardTemplate, wizards[i]);
  fragment.appendChild(wizardElement);
}

similarListElement.appendChild(fragment);
userDialog.querySelector('.setup-similar').classList.remove('hidden');
