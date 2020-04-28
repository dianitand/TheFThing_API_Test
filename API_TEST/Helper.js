const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);

const mailInput = "testing02@thefthing.com"
const pass = "Testing123"
const token = null

function sendApi(email, password) {
    hit = {
        "body": {
            "email": email,
            "password": password
        }
    }
}

it('Login Postive', (done) => {
    let token = null
    sendApi(mailInput, pass)
    chai.request(serverApi)
        .post('/customer/login.php')
        .send(hit)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.type.should.equal('application/json');
            res.body.should.be.a('object');
            res.should.be.json;
            res.body.result.response.should.eql('success');
            res.body.should.include.keys(
                'token'
            );
            token = res.body.token
            done();
        })
})
