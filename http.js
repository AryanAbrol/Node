const http = require("http");

const data = { age: 5 };

const fs = require('fs');

const datajson = fs.readFileSync('data.json','utf-8');
const server = http.createServer((req, res) => {
  console.log(req.url,req.method);
  switch(req.url)
  {
    case '/': res.setHeader('content-type', 'application/json');
    res.end(datajson);
    break;

    case '/ok': res.setHeader('content-type', 'text/html');
    res.end('<h1>Hello</h1>');
    break;

    default: res.writeHead(404);
    res.end();
  }
  // res.setHeader('Dummy', 'Dummyval');
  // res.setHeader('content-type', 'application/json');
  // res.end(JSON.stringify(data));
  // res.end(datajson);
});

server.listen(8080);
