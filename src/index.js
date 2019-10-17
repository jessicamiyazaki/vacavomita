const http = require('http');
//liguagem orientada a call back "hell"  assincrona

const server = http.createServer((req, res) => { 
    console.log(req.url, req.method) 
    res.write("hello world")
    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

console.log ("escuando na porta 8000")
server.listen(8000);

