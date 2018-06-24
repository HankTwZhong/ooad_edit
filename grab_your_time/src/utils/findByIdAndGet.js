
// var mongoose = require('mongoose');
// var connection = mongoose.connect('mongodb://localhost/timelog');
// var db = mongoose.connection;
// var calendarSchema = require('../server/Schemas/calendarSchema');
// var Event = require('../server/Event');

// function findOneAndUpadate (){

//     let typeName = '煙花易冷';
//     let eventList = [{"_id":"5aefc07a9055491150dc2969","title":"煙花易冷","start":"2018-05-07T02:56:00.000Z","end":"2018-05-07T02:56:00.000Z","desc":"F2"},{"_id":"5aefc84024d20f3ff0d23747","title":"煙花易冷","start":"2018-05-07T03:30:00.000Z","end":"2018-05-07T03:30:00.000Z","desc":"AD"},{"_id":"5aefc8c424d20f3ff0d2374a","title":"煙花易冷","start":"2018-05-07T03:57:00.000Z","end":"2018-05-07T03:59:00.000Z","desc":"沒想法"},{"_id":"5aefc9a4c336d028f4293cac","title":"煙花易冷","start":"2018-05-07T03:57:00.000Z","end":"2018-05-07T03:36:00.000Z","desc":"多少"},{"_id":"5aefcb32b2d0333bfc6d1220","title":"煙花易冷","start":"2018-05-07T03:42:00.000Z","end":"2018-05-07T03:46:00.000Z","desc":"菸"},{"_id":"5af0036325a2704804a43f4d","title":"煙花易冷","start":"2018-05-07T07:20:00.000Z","end":"2018-05-07T07:24:00.000Z","desc":"花滿天"},{"_id":"5af00390890b4b342c4b8791","title":"煙花易冷","start":"2018-05-09T07:20:00.000Z","end":"2018-05-09T07:22:00.000Z","desc":"花牽罟"}];
//     let eventData = {"title":"煙花易冷","start":"2018-05-10T07:20:00.000Z","end":"2018-05-10T07:23:00.000Z","desc":"花千秋"};
//     console.log(eventData);
//     eventList.push(new Event(eventData.title, eventData.start,eventData.end,eventData.desc)) //builder
//     calendarSchema.update({account:'admin', 'typeList.typeName':typeName},{$set: {'typeList.$.eventList':this.eventList}})
//     .then((result)=>{
//         console.log('success');
//     })
// }

// findOneAndUpadate();



    // events:[{
    //     eventName: 'coding',
    //     Type:'',
    //     startTime: str,
    //     endTime: end,
    //     desciption: 'hello'
    // }]
    