/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

let chaiHttp = require('chai-http');
let chai = require('chai');
let assert = chai.assert;
let server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    
    suite('GET /api/stock-prices => stockData object', () => {
      
      test('1 stock', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'price');
          assert.property(res.body, 'likes');
          assert.isString(res.body.stock);
          assert.isString(res.body.price);
          assert.isNumber(res.body.likes);
          done();
        });
      });
      
      test('1 stock with like', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'price');
          assert.property(res.body, 'likes');
          assert.isString(res.body.stock);
          assert.isString(res.body.price);
          assert.isNumber(res.body.likes);
          assert.equal(res.body.likes, 1);
          done();
        });
      });
      
      test('1 stock with like again (ensure likes arent double counted)', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, 'stock');
          assert.property(res.body, 'price');
          assert.property(res.body, 'likes');
          assert.isString(res.body.stock);
          assert.isString(res.body.price);
          assert.isNumber(res.body.likes);
          assert.equal(res.body.likes, 1);
          done();
        });
      });
      
      test('2 stocks', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', stock: 'msft' })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'stock');
          assert.property(res.body[0], 'price');
          assert.property(res.body[0], 'rel_likes');
          assert.isString(res.body[0].stock);
          assert.isString(res.body[0].price);
          assert.isNumber(res.body[0].rel_likes);
          done();
        });
      });
      
      test('2 stocks with like', (done) => {
        chai.request(server)
        .get('/api/stock-prices')
        .query({ stock: 'goog', stock: 'msft', like: true })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'stock');
          assert.property(res.body[0], 'price');
          assert.property(res.body[0], 'rel_likes');
          assert.isString(res.body[0].stock);
          assert.isString(res.body[0].price);
          assert.isNumber(res.body[0].rel_likes);
          done();
        });
      });
      
    });

});
