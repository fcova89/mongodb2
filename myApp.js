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

arrayOfPeople = [francesco,michela]// essendo un parametro della funzione createManyPeople, deve essere creato all'esterno


const createManyPeople = (arrayOfPeople,done) => {

  Person.create(arrayOfPeople,(err,data)=>{
    console.log("Promise mantenuta ->" + data );
    console.log("Promise non mantenuta ->" + err);
    if (err) {
      return done(err);
    } else {//se promise non mantenuta torna error
    done(null , data)
    };
  });

  
  
};

var personName = 'Francesco Cova' //creo variabile personName

const findPeopleByName = (personName, done) => { //funzione di partenza
  
  Person.find({ name: personName}, function (err, docs) { //funzione find per il model Person dove come filtro imposto il nome
    //inoltre avendo inserito la funzione di callback la query di ritorno viene inviata alla callback
    if (err) {
      return done(err)
    }
    done(null, docs);
  });
  
};


let food = 'Sushi'

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, function (err, data) {
    if (err) {
      return done(err);
    } else {
    done(null , data)
    };
  });
  
};

let personId = "1234"

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId}, function (err, docs) {
    if (err) {
      return done(err)
    }
    done(null, docs);
  });
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
