const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const serverApi = 'https://store.thefthing.com/app_mobile_stable'
chai.use(chaiHttp);

var hit = null;
var token = null;
var mail = 'autotest5@asdauto.com';

function sendApi(email, gender, fname, lname, pwd, dob, phone) {
    hit = {
        "body": {
            "email": email,
            "gender": gender,
            "fname": fname,
            "lname": lname,
            "pwd": pwd,
            "dob": dob,
            "phone": phone
        }
    }
}

describe('SignUp Testing', () => {
    it('SignUp Negative : Invalid Phone Format', (done) => {
        sendApi(mail, "1", "Dianita", "Testing", "Testing123", "12-12-2012", "0896-0653-5286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "error",
                });
                done();
            })
    })

    it('SignUp Negative : Invalid DOB Format', (done) => {
        sendApi(mail, "1", "Dianita", "Testing", "Testing123", "12-12-201a", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "Input date of Birthday is not allowed (format d-m-y/e.x, 25-01-2018)."
                });
                done();
            })
    })

    it('SignUp Negative : Password Empty', (done) => {
        sendApi(mail, "1", "Dianita", "Testing", "", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "Your password is not found!"
                });
                done();
            })
    })

    it('SignUp Negative : Invalid Password Format', (done) => {
        sendApi(mail, "1", "Dianita", "Testing", "testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "Please enter 8 or more characters with a mix of numbers, lower case and upper case!"
                });
                done();
            })
    })

    it('SignUp Negative : Empty First Name', (done) => {
        sendApi(mail, "1", "", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "first name is not found"
                })
                done();
            })
    })

    it('SignUp Negative : Invalid First Name Format', (done) => {
        sendApi(mail, "1", "Dian1t4", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "error",
                    "message": "Input data first name is not allowed!"
                })
                done();
            })
    })

    it('SignUp Negative : Empty Last Name', (done) => {
        sendApi(mail, "1", "Dianita", "", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "last name is not found"
                })
                done();
            })
    })

    it('SignUp Negative : Invalid Last Name Format', (done) => {
        sendApi(mail, "1", "Dianita", "Test1ng", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "error",
                    "message": "Input data last name is not allowed!"
                })
                done();
            })
    })

    it('SignUp Negative : Invalid Gender Format', (done) => {
        sendApi(mail, "w", "Dianita", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "error",
                    "message": "Input data gender is not allowed!"
                })
                done();
            })
    })

    it('SignUp Negative : Email Empty', (done) => {
        sendApi("", "1", "Dianita", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "Your email is not found"
                })
                done();
            })
    })

    it('SignUp Negative : Invalid Email Format', (done) => {
        sendApi("dianita", "1", "Dianita", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 400,
                    "response": "failed",
                    "message": "Your email is not allowed!"
                })
                done();
            })
    })

    it('SignUp Negative : Existed Email', (done) => {
        sendApi("testing02@thefthing.com", "1", "Dianita", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 202,
                    "response": "failed",
                    "message": "This email account already exist. Please try another email"
                })
                done();
            })
    })

    it('SignUp Postive', (done) => {
        sendApi(mail, "1", "Dianita", "Testing", "Testing123", "12-12-2012", "089606535286")
        chai.request(serverApi)
            .post('/customer/signup.php')
            .send(hit)
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 200,
                    "response": "success",
                    "message": "Please check your email for account confirmation instruction"
                });
                done();
            })
    })
})