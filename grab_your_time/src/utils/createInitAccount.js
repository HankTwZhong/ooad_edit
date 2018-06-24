var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost/timelog');
var db = mongoose.connection;
var calendarSchema = require('../server/Schemas/calendarSchema');    


function createInitAccount(){

    let str = new Date(); let end = new Date();
    calendarSchema.create({
        account:'Hank' ,
        typeList:[]
    })
    .then((result) =>{
        console.log(result)
    })
}

createInitAccount()