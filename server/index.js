
const express = require('express')
const app = express()
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'postgr',
  database: 'projetnosql',
  password: 'root',
  port: 5432,
});
const cors = require('cors');
app.use(cors())
//================================================================================================

var mongoose = require('mongoose');
 
// make a connection 
mongoose.connect('mongodb://mongod:27017/nosql');
 
// get reference to database
var db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var colSchema = mongoose.Schema({
      name: String,
    });
 
    // compile schema to model
    var Pseud = mongoose.model('Pseud', colSchema, 'nosql');
 
    // a document instance

    var pseud1 = new Pseud({ name: 'Inserting data into mongo'});

 
    // save model to database
    pseud1.save(function (err, pseud) {
      if (err) return console.error(err);
      console.log(pseud.name + " saved to nosql collection.");
    });
     
});

//================================================================================================


app.listen(3001, () => {
    console.log("Serveur à l'écoute")
})

app.get('/', (req,res) => {
    res.send("Hello")
})

app.get('/select/:user', (req,res) => {
    const user = req.params.user
    var sql1 = "SELECT identifiant from recettes where pseudo = '" + user + "'";
  
    pool.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Select done !(affiche les recette save)");
        res.send(results);
    });
  })



app.get('/save/:id1/:id2/:id3/:id4/:id5/:id6/:id7', (req,res) => {
  const id1 = req.params.id1
  const id2 = req.params.id2
  const id3 = req.params.id3
  const id4 = req.params.id4
  const id5 = req.params.id5
  const id6 = req.params.id6
  const id7 = req.params.id7

var sql1 = "insert into recettes (identifiant, pseudo, proteine, glucide, lipide) VALUES ('" + id1 + "', '" + id4 + "', '" + id5 + "', '" + id6 + "', '" + id7 + "')";
var sql2 = "insert into recettes (identifiant, pseudo) VALUES ('" + id2 + "', '" + id4 + "')";
var sql3 = "insert into recettes (identifiant, pseudo) VALUES ('" + id3 + "', '" + id4 + "')";
var sql4 = "insert into nutriment (proteines, glucides, lipides) VALUES ('" + id5 + "', '" + id6 + "', '" + id7 + "')";
var sql5 = "insert into table_calcul (prot_total,gluc_total,lip_total) SELECT SUM(proteines),SUM(glucides),SUM(lipides) FROM nutriment";
  
    pool.query(sql1, function(err, results) {
      if (err) throw err;
      console.log("Request done 1!(premiere recette save)");
        
    });
    pool.query(sql2, function(err, results) {
      if (err) throw err;
      console.log("Request done 2!(deuxieme recette save)");
      
    });
    pool.query(sql3, function(err, results) {
      if (err) throw err;
      console.log("Request done 3!(troisieme recette save)");
    
    });
    pool.query(sql4, function(err, results) {
      if (err) throw err;
      console.log("Request done 4!(nutriments save)");
    
    });
    pool.query(sql5, function(err, results) {
      if (err) throw err;
      console.log("Select done 5!(somme calculée)");
      res.send(results);
  });

})
