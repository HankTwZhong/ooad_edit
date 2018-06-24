import assert from 'assert';
import Type from '../src/server/Type.js';
import fakeDB from '../src/utils/fakeDB';
import Event from '../src/server/Event';

describe('event Operation', function() {
  let type;
  before(function(){
     type = new Type("OOAD",[]);
  });
  describe('#add Event', function(){
    it('it should show add event in eventList of type', function(done){
      let expectData = {
        _id : '8081' ,
        title : 'OOAD',
        start : '2018-05-10T05:33:00.000Z',
        end : '2018-05-10T05:59:00.000Z',
        desc : 'coding'
      }
      type.addEvent('Hank', expectData, fakeDB).then((result)=>{
        assert.equal(expectData._id,result[0]._id)
        assert.equal(expectData.title,result[0].title)
        assert.equal(expectData.start,result[0].start)
        assert.equal(expectData.end,result[0].end)
        assert.equal(expectData.desc,result[0].desc)
        done()
      }).catch(result => {
        done('something wrong')
      });
    })
  })
  describe('deleteEvent', function(){
    it('it should show empty eventList when deleteEvent', function(){
      let expectId = '8081'
      type.deleteEvent('Hank',expectId,fakeDB);
      assert.deepEqual([], type.eventList);
    })
  })
  describe.only('#getRangeTime', function(){
    it('it should get Range Of Time From Condition', function(){
      let expectData = {
        _id : '8081' ,
        title : 'OOAD',
        start : '2018-05-10T05:33:00.000Z',
        end : '2018-06-27T05:59:00.000Z',
        desc : 'coding'
      }
      // let strDate = type.getRangeTime(expectData);
      // console.log(strDate);
      // console.log(type.getMonday());
      // console.log(type.getWeekDay(2));
      // console.log(type.getWeekDayofSpecifyMonth(5,7));
      type.getSpecifyPeriodDate(expectData);
      // type.addEventWithCycle();
      // type.addEvent('Hank', expectData, fakeDB).then((result)=>{
      //   assert.equal(expectData._id,result[0]._id)
      //   assert.equal(expectData.title,result[0].title)
      //   assert.equal(expectData.start,result[0].start)
      //   assert.equal(expectData.end,result[0].end)
      //   assert.equal(expectData.desc,result[0].desc)
      //   done()
      // }).catch(result => {
      //   done('something wrong')
      // });
    })
  })
});
