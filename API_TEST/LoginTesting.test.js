const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
// const mail = require('./SignUpTesting.test.js')
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);

var hit = null;
var token = null;

const mailInput = "testing02@thefthing.com"
const pass = "Testing123"

function sendApi(email, password) {
    hit = {
        "body": {
            "email": email,
            "password": password
        }
    }
}

describe('Login Testing', () => {
    it('Login: Empty Parameters', (done) => {
        sendApi("", "")
        chai.request(serverApi)
            .post('/customer/login.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "status_code": 202,
                    "response": "error",
                    "message": "Param data is empty"
                })
                done();
            })
    })

    it('Login Negative: Invalid Password', (done) => {
        sendApi("testing02@thefthing.com", "Testing321")
        chai.request(serverApi)
            .post('/customer/login.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "status_code": 202,
                    "response": "failed",
                    "message": "Invalid email or password."
                })
                done();
            })
    })

    it('Login Negative: Invalid Email/Format', (done) => {
        sendApi("testing02@the.com", "Testing123")
        chai.request(serverApi)
            .post('/customer/login.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "status_code": 202,
                    "response": "failed",
                    "message": "Invalid email or password."
                })
                done();
            })
    })

    it('Login Negative: Password Length/Format', (done) => {
        sendApi("testing02@thefthing.com", "testi123")
        chai.request(serverApi)
            .post('/customer/login.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "status_code": 400,
                    "response": "error",
                    "message": "Please enter 8 or more characters with a mix of numbers, lower case and upper case"
                });
                done();
            })
    })

    it('Login Negative: Account not Confirmed', (done) => {
        sendApi("autotest.na@asdauto.com", "Testing123")
        chai.request(serverApi)
            .post('/customer/login.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "status_code": 202,
                    "response": "failed",
                    "message": "Please, activate your account by clicking confirmation button sent to your email address."
                });
                done();
            })
    })

    it('Login Postive', (done) => {
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
                const token = res.body.token

                done();
            })
    })
    
})