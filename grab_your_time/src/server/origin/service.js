var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/timelog')
var bodyParser = require('body-parser');
var eventSchema = require('./Schemas/eventSchema');
var dateFormat = require('dateformat');
var bookStoreSchema = require('./Schemas/testRecursiveSchema');
var db = mongoose.connection;

class Service {
    recordEvent(event) {
        return new Promise((resolve, reject) => {
            db.on('error', console.error.bind(console, 'MongoDB connection error:'));
            console.log('title:'+event.title+'\n startTime:'+event.start+'\n endTime:'+event.end);
            eventSchema.create({
                title: event.title,
                start:dateFormat(event.start, "yyyy/mm/dd HH:mm:ss"),
                end:dateFormat(event.end, "yyyy/mm/dd HH:mm:ss")
            })
            console.log('done');
        })
    }
    findEvent(event){
        return new Promise((resolve, reject) => {
            eventSchema.find({startTime: event.startTime})
            .then((result) => {
                console.log('findEvent');
                console.log(result);
            })
        })

    }
    getEvent(){
        return new Promise((resolve, reject) => {
            eventSchema.find({})
            .then((result) => {
                resolve(result);
            }, (err) => {
                reject(err);
            })
        })
    }
    deleteEvent(event){
        return new Promise((resolve, reject) => {
            eventSchema.remove({_id:event._id})
            .then((result) => {
                resolve(result);
            })
            .catch((err) => {
                reject(err);
            })
        })
    }
    addBookStore(book){
        return new Promise((resolve, reject) => {
            bookStoreSchema.create({
                name: book.name,
                classify: book.classify
            })
            console.log("done");
            resolve(book);
        })
    }
    findBookStore(book){
        return new Promise((resolve, reject)=>{
            // let bookLocation;
            // bookStoreSchema.find({name: book.name})
            // .then((bookStoreName)=>{
            //     console.log(bookStoreName);
            //     bookStoreSchema.find({name: bookStoreName.name})
            //     .then((result) => {
            //         console.log(result);
            //         resolve(result)
            //     })
            // })
            // let bookLocation;
            // console.log(book.classify[0].name);
            // console.log(book)
            // bookStoreSchema.find({
            //     'classify':{
            //         $elemMatch:{name: book.classify[0].name}
            //     }
            // })
            // .then((bookStoreName)=>{
            //     console.log(bookStoreName);
            //     resolve(bookStoreName)
            //     resolve('so far so good');
            // })
            // bookStoreSchema.find({
            //         classify: [{
            //             name:'landscape'}
            //         ]
            // })
            // .populate('classify')
            // .exec(function(err, result){
            //     console.log(result);
            //     resolve(result)
            // })
            // .then((result) => {
            //     return bookStoreSchema.find({
            //         classify: [{
            //             name:'landscape'}
            //         ]
            // })
            //     console.log(result);
            //     resolve(result)
            // })
            // bookStoreSchema.findOne({'classify.name':'architecture'})
            // .then((result)=> {
            //     console.log(result);
            //     resolve(result)
            // })

            bookStoreSchema.find({name:'eslite'}, {classify:{$elemMatch:{name:'architecture'}}})
            .then((result)=>{
                console.log(result);
                result.name = book.name;
                resolve(result);
            })
        })
    }
}

module.exports = new Service();