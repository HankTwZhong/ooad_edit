var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var service = require('./service');
var cors =  require('cors');

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.post('/', (req, res) => {
    console.log('here');
    res.send('so far so good');
})

app.post('/event', (req, res) => {
    console.log('here');
    console.log(req);
    let event = req.body;
    service.recordEvent(event);
    res.send('so far so good');
})

app.post('/findEvent', (req, res) => {
    let event = req.body;
    service.findEvent(event);
    res.send('so far so good');
})

app.get('/getEvent', (req, res) =>{
    let getEvent = service.getEvent()
    getEvent.then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err)
        res.send(err);
    })
})

app.delete('/deleteEvent', (req, res) =>{
    let event = req.body;
    let deleteEvent = service.deleteEvent(event);
    deleteEvent.then((result) => {
        res.send(result);
    }).catch((err) =>{
        res.send(err);
    })
})
app.post('/bookStore', (req, res) => {
    let bookstore = req.body;
    service.addBookStore(bookstore)
    .then((result) => {
        res.send(result);
    })
})

app.post('/findBookStore',(req, res) =>{
    let bookStore = req.body;
    service.findBookStore(bookStore)
    .then((result) =>{
        res.send(result);
    })
})


app.listen(1321, function () {
    console.log('listening on port 1321!');
})