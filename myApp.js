require('dotenv').config();
const { Model } = require('mongoose');
var mongoose = require('mongoose');
var mongoURI = "mongodb+srv://fcova89:E9FJYEwQ4KttkuZs@cluster0.lfhxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({ //creo Schema per un modello
  name: { 
    type: String,
    required: true},
  age: Number,
  favoriteFoods: [String]
});

let Person = mongoose.model('Person', personSchema); //assegno a Person il modello basato sullo schema PersonShcema


const createAndSavePerson = (done) => {
  let Francesco = new Person({
    name: 'Francesco Cova',
    age: 33,
    favoriteFoods: ['Goma Wakame','Sushi'] 
  });

  Francesco.save(function(err,data){
    console.log("Promise mantenuta ->" + data );
    console.log("Promise non mantenuta ->" + err);

    if (err) {
      return done(err);
    } else {//se promise non mantenuta torna error
    done(null , data)
    };
  }); //funzione che torna una Promise
};

const createManyPeople = (arrayOfPeople, done) => {
  let francesco = {
    name: 'Francesco Cova',
    age: 33,
    favoriteFoods: ['Goma Wakame','Sushi'] 
  };
  let michela = {
    name: 'Michela Bistoletti',
    age: 33,
    favoriteFoods: ['Pasta','Pizza'] 
  };

  Person.create([francesco,michela],(err,arrayOfPeople)=>{
    if (err) {
      return done(err);
    } else {//se promise non mantenuta torna error
    done(null , arrayOfPeople)
    };
  });
  
};

const findPeopleByName = (personName, done) => {
  done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
