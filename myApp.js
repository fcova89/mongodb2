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

let francesco = new Person({
  name: 'Francesco Cova',
  age: 33,
  favoriteFoods: ['Goma Wakame','Sushi','burrito'] 
});

const createAndSavePerson = (done) => {
  francesco.save(function(err,data){
    console.log("Promise mantenuta ->" + data );
    console.log("Promise non mantenuta ->" + err);

    if (err) {
      return done(err);
    } else {//se promise non mantenuta torna error
    done(null , data)
    };
  }); //funzione che torna una Promise
};


/*
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
*/

//arrayOfPeople = [francesco,michela]// essendo un parametro della funzione createManyPeople, deve essere creato all'esterno


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
  Person.findById({ _id: personId}, function (err, record) {
    if (err) {
      return done(err)
    }
    done(null, record);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  //step1 cerco la persona da Id
  Person.findById({ _id: personId}, function (err, foundPerson) {
    if (err) {
      return done(err) //se callback ha errore, ritorna errore
    }
    console.log('La persona trovata è' + foundPerson);//verifica persona trovata
    //modifico il record trovato

    foundPerson.favoriteFoods.push(foodToAdd);

      console.log('La persona cambiata è' + foundPerson);//verifica persona cambiata
      foundPerson.save(function (err, savedPerson) {
        if (err) {
          return done(err)
        }
        console.log(savedPerson);//verifica persona salvata
        done(null, savedPerson); //ritorna la persona salvata
      });   
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //funzione find per il model Person dove come filtro imposto il nome
  Person.findOneAndUpdate({ name: personName},{age: ageToSet},{ new: true }, function (err, updatedPerson) { 
    //parametro 1 -> Filtro -> filtra per nome
    //parametro 2 -> Update key age in  -> ageToSet
    //paremetro 3 -> Opzione che if true, return the modified document; if false return the original. defaults to false
    console.log(updatedPerson); // mostra cosa è updated person -> il risultato del metodo findOneAndUpdate passato alla funzione di callback
    if (err) {
      return done(err)
    }
    done(null, updatedPerson);
  });
};

const removeById = (personId, done) => {
  Person.findById({ _id: personId}, function (err, foundPerson) {
    if (err) {
      return done(err) //se callback ha errore, ritorna errore
    }
    console.log('La persona trovata è' + foundPerson);//verifica persona trovata

    Person.findByIdAndRemove(personId,(err,personDeleted)=>{
      console.log(personDeleted);//verificare la persona eliminata?
      if (err) {
        return done(err)
      }
      done(null, personDeleted);
    });
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,personDeleted)=>{
    if (err) {
      return done(err)
    }
    done(null, personDeleted);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  console.log
  Person.find({favoriteFoods: [foodToSearch]},function (err,foundPeople) {//estrai persone a cui piace il burrito
    console.log(`Le persone a cui piace il ${foodToSearch} sono ` + foundPeople);
    if (err) {
      console.log('Errore da qualche parte' + err),
      return done(err)
    }
    foundPeople.sort({name : 'asc'}) //metti in ordine ascendente?
    console.log('Le persone in ordine sono '+ foundPeople);
    done(null, foundPeople);
  })
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
