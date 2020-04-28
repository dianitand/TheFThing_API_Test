const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
// const mail = require('./SignUpTesting.test.js')
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);