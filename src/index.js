var Sequelize = require('sequelize-cockroachdb');

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize('vacavomita', 'vacavomita', '', {
  dialect: 'postgres',
  port: 26257,
  logging: false
});

// Define the Acq model for the "create and register accounts" table.
var Acq = sequelize.define('acq', {
    acq_id: { type: Sequelize.INTEGER, primaryKey: true },
    name: { type: Sequelize.STRING}
  });

// Define the Account model for the "accounts" table.
var Account = sequelize.define('accounts', {
    acq_id: { type: Sequelize.INTEGER},
  account_id: { type: Sequelize.INTEGER, primaryKey: true}
});

// Define the Transactions details model for the "Transaction" table.
var Transaction = sequelize.define('Transaction', {
    account_id: { type: Sequelize.INTEGER},
    type: { type: Sequelize.ENUM ('transfer', 'payment')},
    value: { type: Sequelize.INTEGER},
    timestamp: { type: Sequelize.DATE},
    description: {tupe: Sequelize.STRING}
});

// Create the "accounts" table.
Account.sync({force: true})
.then(function() {
  // Insert two rows into the "accounts" table.
  return Account.bulkCreate([
    {id: 1, balance: 1000},
    {id: 2, balance: 250}
  ]);
})
.then(function() {
  // Retrieve accounts.
  return Account.findAll();
})
.then(function(accounts) {
  // Print out the balances.
  accounts.forEach(function(account) {
    console.log(account.id + ' ' + account.balance);
  });
  process.exit(0);
}).catch(function(err) {
  console.error('error: ' + err.message);
  process.exit(1);
});














// const express = require('express')
// const app = express()
// const port = 8000

// app.get('/', (req, res) =>{
 
//     console.log(req.url, req.method) 
//     res.send('Hello World!')
// })



// app.get('/transaction', (req, res) =>{
 
//     console.log(req.url, req.method) 
//     res.send('transaction space!')
// })

// app.get('/transaction/:abcd', (req, res) =>{
 
//     console.log(req.url, req.method) 
//     res.send(`transaction ${req.params.abcd} space!`)
// })

// app.listen(
//     port, 
//     () => console.log(
//         `escuando na porta  ${port}!` //isso é uma interpolação de string uso esse  acento: ` e isso vai pegar a variavel e inserir dentro da str na posição marcada 
//     )
// ) 



// const http = require('http');
// //liguagem orientada a call back "hell"  assincrona

// const server = http.createServer((req, res) => { 
//     console.log(req.url, req.method) 
//     res.write("hello world")
//     res.end();
// });

// server.on('clientError', (err, socket) => {
//     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// });

// console.log ("escuando na porta 8000")
// server.listen(8000);
// para executar é nodejs ./src/index.js