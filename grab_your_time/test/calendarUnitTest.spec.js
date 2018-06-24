import assert from 'assert';
import Account from '../src/server/Account.js';
import Calendar from '../src/server/Calendar.js';
import Type from '../src/server/Type.js';
import Event from '../src/server/Event.js';

describe('Calendar Operation', function() {
  let acc;
  let cal;
  beforeEach(function(){
    acc = new Account("Hank","1234")
    let initTypeList = [];
    cal = new Calendar(initTypeList);
  });

  describe('#addType', function(){
    it('it should show add Type in typelist of calendar', function(){
      let expectTypeList = [{"eventList": [],"typeName": "STV"}]
      let type = new Type('STV',[]);
      cal.addType(acc.account, type);
      assert.deepEqual(expectTypeList, cal.getTypeList());
      cal.deleteType(acc.account, type.typeName);
    })
  })

  describe('#getTypeList()', function() {
    it('it should same with assignt element', function() {
      let expectTypeList  = [];
      assert.deepEqual(expectTypeList, cal.getTypeList());
    });
  });

  describe('#deleteType', function(){
    it('it should show add Type in typelist of calendar', function(){
      let expectTypeList = [{"eventList": [],"typeName": "STV"}]
      let type = new Type('STV',[]);
      cal.addType(acc.account, type);
      cal.deleteType(acc.account, type.typeName);
      assert.deepEqual([], cal.getTypeList());
    })
  })
});