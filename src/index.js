// const Sequelize = require('sequelize-cockroachdb');

// const express = require('express')
// const app = express()
// const port = 8000

const sequelize = new Sequelize('vacavomita', 'vacavomita', '', {
  dialect: 'postgres',
  port: 26257,
  logging: false,
  define: {
    underscored: true, // Important due running in a postgres dialect
  },
});


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
const Transaction = sequelize.define('Transaction', {
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
// a partir daqui vou fazer o mesmo para as outras tabelas account e transaction
.then(() => {
  return Acq.findAll()
})

// .then(() => {
//     return Acq.bulkCreate([
//     {acq_id: 1, name: "Jessica"},
//     {acq_id: 2, name: "Lucas"},
//   ]);
// })

.then((resultado)=>{ 
  console.log ('acabou_1')
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
//-----------------------------------------------------------
// o de cima é o meu exemplo 
// .then(() => {
//   return Account.bulkCreate([
//   {acq_id: 1, account_id: 1234567890},
//   {acq_id: 2,account_id: 9876543210}
//     ])})

.then(() => {
  return Account.findAll()
})
.then((resultados_acc)=>{ 
  console.log ('acabou_2')
  resultados_acc.forEach((item_acc) => {
    console.log(item_acc.acq_id, item_acc.account_id)
  })
})
///_______________________________________________________________transaction resultados

.then(() => {
  return Transaction.bulkCreate([
  {account_id: 1234567890, type:"transfer", value:10 , timestamp: undefined, description: "A"}
   ])})

b
.then(() => {
  return Transaction.findAll()
})
.then((resultados_trc)=>{ 
  console.log ('acabou_3')
  resultados_trc.forEach((item_trc) => {
    console.log(item_trc.account_id,item_trc.type, item_trc.value, item_trc.timestamp, item_trc.description)
  })
})

// será que vai?
//-----------------------------------------------------------
app.get('/', (req, res) =>{
  console.log(req.url, req.method) 
  res.send('Hello World!')
})

//-----------------------------------------------------------parte do accounts rest

app.get('/accounts_texto', (req, res) => {
  Account.findAll()
  .then((resultados_acc)=>{
    res.send(
      resultados_acc
      .map((item_acc) => `id_acq: ${item_acc.acq_id} account_id: ${item_acc.account_id}`)
      .join('<br>'))
  })

})

app.get('/accounts', (req, res) => {
  Account.findAll()
  .then((resultados_acc)=>{
    const jsonResult = resultados_acc
    .map((item_acc) => {
      return {
        acq_id: item_acc.acq_id,
        account_id: item_acc.account_id,
      }
    });

    res.send(
      jsonResult
    )
  })
})

  
// será que vai?
//-----------------------------------------------------------

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