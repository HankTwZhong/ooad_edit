import Event from'./Event';
import moment from 'moment';

class Type{
    constructor(typeName,eventList){
        this.typeName = typeName;
        this.eventList = eventList;
    }
    addEvent(_account, eventData,calendarSchema){
        return new Promise((resolve, reject)=>{
                this.eventList.push(new Event(eventData.title, eventData.start,eventData.end,eventData.desc));
                calendarSchema.findOneAndUpdate({account:_account, 'typeList.typeName':this.typeName},{$set: {'typeList.$.eventList':this.eventList}},{ new: true })
                .then((result)=>{
                        let filteredType = result.typeList.filter((type)=>{
                            if(type.typeName == this.typeName)
                            return type;
                        })
                        this.eventList = filteredType[0].eventList;
                    resolve(this.eventList);
                })
                .catch((err)=>{
                    reject(err);
                })
        })
    }

    deleteEvent(_account, eventID,calendarSchema){
        this.eventList = this.eventList.filter((event)=>{
            if(_account === "Hank"){
                if(event._id !== eventID)
                    return event;
            }
            else
                if(event._id.toString() !== eventID)
                    return  event;
        })
        calendarSchema.update({account:_account, 'typeList.typeName':this.typeName},{$set: {'typeList.$.eventList':this.eventList}})
        .then((result)=>{
            console.log(result);
        })
    }

    getSpecifyPeriodDate(eventDate){
        let startDate = eventDate.start;
        let endDate = eventDate.end;
        let specifyStartPeriodDate  = [];
        let specifyEndPeriodDate = [];
        let specifyStartTime = moment(startDate);
        let specifyEndTime = moment(endDate);
        let iteratorDate;
        let iteratorStartDate;
        let iteratorEndDate ;
        specifyStartPeriodDate.push(new Date(startDate));
        // while( (iteratorStartDate=(moment(specifyStartPeriodDate[specifyStartPeriodDate.length-1]).add(7, 'day'))) < moment(endDate)){
                // iteratorEndDate = iteratorStartDate;
        // iteratorEndDate =  moment(iteratorEndDate).set({
        //     'hours': specifyEndTime.get('hours'),
        //     'minute': specifyEndTime.get('minute'),
        //     'second': specifyEndTime.get('second'),
        //     'millisecond' :specifyEndTime.get('millisecond')
        // });
        while( (iteratorDate = (moment(specifyStartPeriodDate[specifyStartPeriodDate.length-1]).add(7, 'day'))) < moment(endDate)){
            iteratorStartDate = moment().set({
                'year': iteratorDate.get('year'),
                'month':iteratorDate.get('month'),
                'date': iteratorDate.get('date'),
                'hours': specifyStartTime.get('hours'),
                'minute': specifyStartTime.get('minute'),
                'second': specifyStartTime.get('second'),
                'millisecond' :specifyStartTime.get('millisecond')
            });
            iteratorEndDate =  moment().set({
                'year': iteratorDate.get('year'),
                'month':iteratorDate.get('month'),
                'date': iteratorDate.get('date'),
                'hours': specifyEndTime.get('hours'),
                'minute': specifyEndTime.get('minute'),
                'second': specifyEndTime.get('second'),
                'millisecond' :specifyEndTime.get('millisecond')
            });
            specifyStartPeriodDate.push(new Date(iteratorStartDate));
            specifyEndPeriodDate.push(new Date(iteratorEndDate));
        }
        let specifyPeriodDate = {};
        specifyPeriodDate['start'] = specifyStartPeriodDate;
        specifyPeriodDate['end'] = specifyEndPeriodDate;
        return specifyPeriodDate;
    }
    addRecycleEvent(PeriodDate, eventDate){
        let i;
        for( i=0 ; i <= PeriodDate.length-1; i++ ){
            addEvent();
        }
    }

    // addRecycleEvent(_account, eventData, calendarSchema){
    //     return Promise((resolve, reject)=>{
    //         this.eventList.push();
    //     })

    // }
    // getCheck(){

    // }
}

module.exports = Type;