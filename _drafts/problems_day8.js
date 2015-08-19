function talk() {
  console.log(this.noise);
}

var dog = {
  noise: 'woof',
  talk: talk
};

var cat= {
  noise: 'miao',
  talk: talk
};

var canary = {
  noise: 'tweet',
  talk: talk
};

var animals = [dog, cat, canary];
animals.allTalk = function() {
  this.forEach(function(animal) {
    animal.talk();
  });
};

animals.allTalk(); // failure!
