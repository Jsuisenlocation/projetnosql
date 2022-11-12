

const express = require('express')
const app = express()
var mysql = require('mysql');
var http = require('http')

var conn = mysql.createConnection({
  database: 'projet_web',
  host: "localhost",
  user: "root",
  password: ""
});

const server = http.createServer((req, res) => {

  // Configure l'en-tête de la réponse HTTP
  // avec le code du statut et le type de contenu
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Envoie le corps de la réponse « Salut tout le monde »
  console.log("Serveur à l'écoute")

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

app.get('/', (req,res) => {
    res.send("Hello")
})

app.get('/select/:user', (req,res) => {
    const user = req.params.user
    var sql1 = "SELECT identifiant from recettes where pseudo = '" + user + "'";
  
    conn.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Select done !");
        res.send(results);
    });
  })

  app.get('/select2', (req,res) => {
    var sql1 = "SELECT prot_total, gluc_total, lip_total FROM table_calcul ORDER by id DESC limit 1";
  
    conn.query(sql1, function(err, results) {
        if (err) throw err;
        console.log("Select done sel2!");
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

  
var sql1 = "insert into recettes VALUES (NULL,'" + id1 + "', '" + id4 + "', '" + id5 + "', '" + id6 + "', '" + id7 + "')";
var sql2 = "insert into recettes VALUES (NULL,'" + id2 + "', '" + id4 + "', NULL, NULL, NULL)";
var sql3 = "insert into recettes VALUES (NULL,'" + id3 + "', '" + id4 + "', NULL, NULL, NULL)";
var sql4 = "insert into nutriment VALUES (NULL,'" + id5 + "', '" + id6 + "', '" + id7 + "')";
var sql5 = "INSERT INTO table_calcul (prot_total,gluc_total,lip_total) SELECT SUM(proteines),SUM(glucides),SUM(lipides) FROM nutriment;";
  
    conn.query(sql1, function(err, results) {
      if (err) throw err;
      console.log("Request done 1!");
        
    });
    conn.query(sql2, function(err, results) {
      if (err) throw err;
      console.log("Request done 2!");
      
    });
    conn.query(sql3, function(err, results) {
      if (err) throw err;
      console.log("Request done 3!");
    
    });
    conn.query(sql4, function(err, results) {
      if (err) throw err;
      console.log("Request done 4!");
    
    });
    conn.query(sql5, function(err, results) {
      if (err) throw err;
      console.log("Select done 5!");
      res.send(results);
  });

})
