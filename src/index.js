const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) =>{
 
    console.log(req.url, req.method) 
    res.send('Hello World!')
})



app.get('/transaction', (req, res) =>{
 
    console.log(req.url, req.method) 
    res.send('transaction space!')
})

app.get('/transaction/:abcd', (req, res) =>{
 
    console.log(req.url, req.method) 
    res.send(`transaction ${req.params.abcd} space!`)
})

app.listen(
    port, 
    () => console.log(
        `escuando na porta  ${port}!` //isso é uma interpolação de string uso esse  acento: ` e isso vai pegar a variavel e inserir dentro da str na posição marcada 
    )
) 



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