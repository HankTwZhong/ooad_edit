import assert from 'assert';
import  Account from '../src/server/Account.js';

describe('Account Operation', function() {
  let acc;
  before(function(){
    acc = new Account('Hank', '1234');
  });

  describe('constructor', function() {
    it('should Have accoount and password', function() {
      assert.equal('Hank',acc.account);
      assert.equal('1234', acc.password);
    });
  });
});