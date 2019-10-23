const Sequelize = require('sequelize-cockroachdb');

const express = require('express')
const app = express()
const port = 8000

// Connect to CockroachDB through Sequelize.
const sequelize = new Sequelize('vacavomita', 'vacavomita', '', {
  dialect: 'postgres',
  port: 26257,
  logging: false
});

// Define the Acq model for the "create and register accounts" table.
const Acq = sequelize.define('acq', {
    acq_id: { type: Sequelize.INTEGER, primaryKey: true },
    name: { type: Sequelize.STRING}
  });

// Define the Account model for the "accounts" table.
const Account = sequelize.define('account', {
    acq_id: { type: Sequelize.INTEGER},
  account_id: { type: Sequelize.INTEGER, primaryKey: true}
});

// Define the Transactions details model for the "Transaction" table.
const Transaction = sequelize.define('transaction', {
    account_id: { type: Sequelize.INTEGER},
    type: { type: Sequelize.ENUM ('transfer', 'payment')},
    value: { type: Sequelize.INTEGER},
    timestamp: { type: Sequelize.DATE},
    description: {type: Sequelize.STRING}
});
///fazer apartir daqui esse código pronto 
console.log('sincronizando Acq')
Acq.sync()
.then(() => {
  console.log('sincronizando Account')
  return Account.sync()
})
.then(()=>{
  console.log('sincronizando Transaction')
  return Transaction.sync()
})
// .then(() => {
//     return Acq.bulkCreate([
//     {acq_id: 1, name: "Jessica"},
//     {acq_id: 2, name: "Lucas"}
//   ]);
// })
.then(() => {
  return Acq.findAll()
})
.then((resultado)=>{ 
  console.log ('acabou')
  resultado.forEach((item) => {
    console.log(item.acq_id, item.name)
  })
  app.listen(
      port, 
      () => console.log(
          `escuando na porta  ${port}!` //isso é uma interpolação de string uso esse  acento: ` e isso vai pegar a constiavel e inserir dentro da str na posição marcada 
      )
  ) 
})

app.get('/', (req, res) =>{
  console.log(req.url, req.method) 
  res.send('Hello World!')
})

app.get('/acqs_texto', (req, res) => {
  Acq.findAll()
  .then((resultados)=>{
    res.send(
      resultados
      .map((item) => `id_acq: ${item.acq_id} name: ${item.name}`)
      .join('<br>'))
  })
})

app.get('/acqs', (req, res) => {
  Acq.findAll()
  .then((resultados)=>{
    const jsonResult = resultados
    .map((item) => {
      return {
        acq_id: item.acq_id,
        name: item.name,
      }
    });

    res.send(
      jsonResult
    )
  })
})
















// // Create the "accounts" table.
// Account.sync({force: true})
// .then(function() {
//   // Insert two rows into the "accounts" table.
//   return Account.bulkCreate([
//     {id: 1, balance: 1000},
//     {id: 2, balance: 250}
//   ]);
// })
// .then(function() {
//   // Retrieve accounts.
//   return Account.findAll();
// })
// .then(function(accounts) {
//   // Print out the balances.
//   accounts.forEach(function(account) {
//     console.log(account.id + ' ' + account.balance);
//   });
//   process.exit(0);
// }).catch(function(err) {
//   console.error('error: ' + err.message);
//   process.exit(1);
// });































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
//         `escuando na porta  ${port}!` //isso é uma interpolação de string uso esse  acento: ` e isso vai pegar a constiavel e inserir dentro da str na posição marcada 
//     )
// ) 



// // const http = require('http');
// // //liguagem orientada a call back "hell"  assincrona

// // const server = http.createServer((req, res) => { 
// //     console.log(req.url, req.method) 
// //     res.write("hello world")
// //     res.end();
// // });

// // server.on('clientError', (err, socket) => {
// //     socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
// // });

// // console.log ("escuando na porta 8000")
// // server.listen(8000);