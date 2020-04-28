const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);

var token = null

describe('Positive Transaction Testing', () => {
  it('Login', (done) => {
    chai.request(serverApi)
      .post('/customer/login.php')
      .send({
        "body": {
          "email": "testing02@thefthing.com",
          "password": "Testing123"
        }
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.should.be.json;
        res.body.result.status_code.should.eql(200);
        res.body.result.response.should.eql('success');
        res.body.should.include.keys(
          'token'
        );

        token = res.body.token
        console.log(token)

        done();
      })
  })

  it('Check Customer', (done) => {
    chai.request(serverApi)
      .post('/customer/info.php')
      .set({
        "Authorization": token
      })
      .end((err, res) => {
        should.not.exist(err);
        res.should.have.status(200);
        res.type.should.equal('application/json');
        res.body.should.be.a('object');
        res.should.be.json;
        res.body.status.code.should.eql(200)
        res.body.status.response.should.eql("success")
        res.body.userData.should.include({
          'email':'testing02@thefthing.com',
          'customer-id': '24417'
        })

        body = res.body.userData
        console.log(body)

        done();
      })
  })

})