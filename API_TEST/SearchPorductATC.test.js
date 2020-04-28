const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);
//wikwik
const itemSimple = [25679, 25687]
const itemConfig = [
    [27903, 36],
    [17987, "M"]
]
let cobaa = []

const mailWish = "testing02@thefthing.com"
const passWish = "Testing123"
let quoteId = null
var existItem = null

function sendApi(email, password) {
    hit = {
        "body": {
            "email": email,
            "password": password
        }
    }
}

describe('Add to Cart Testing', () => {
    it('Login', (done) => {
        sendApi(mailWish, passWish)
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

    it('Check My Cart: Count item in Cart', (done) => {
        chai.request(serverApi)
            .post('/getCart.php?')
            .set({
                "Authorization": token
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                existItem = res.body.result.count_item

                let cobaaa = res.body.result.item[0].item_id
                console.log(cobaaa)
                done();
            })
    })

    it('Add To Cart: Empty Size in Configurable product', (done) => {
        chai.request(serverApi)
            .post('/checkout/cart/add_cart_v3.php?device=ios')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product_id": itemConfig[0][0],
                    "qty": 1,
                    "size": ""
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.should.include({
                    "status_code": 202,
                    "response": "error",
                    "message": "Id " + itemConfig[0][0] + " is configurable product. Please fill it's attribute such as size or color."
                })
                done();
            })
    })

    it('Add To Cart: Empty Parameter', (done) => {
        chai.request(serverApi)
            .post('/checkout/cart/add_cart_v3.php?device=ios')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product_id": "",
                    "qty": 1
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.should.include({
                    "status_code": 202,
                    "response": "error",
                    "message": "Param data is empty. Please fill product id, qty and size if exist."
                })
                done();
            })
    })

    it('Add To Cart: Exceeds the existing stock ' + itemSimple[0], (done) => {
        chai.request(serverApi)
            .post('/checkout/cart/add_cart_v3.php?device=ios')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product_id": itemSimple[0],
                    "qty": 100
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.should.include({
                    "status_code": 202,
                    "response": "error",
                })
                done();
            })
    })


    for (let j of itemSimple) {
        it('Add To Cart: Simple Product: ' + j, (done) => {
            chai.request(serverApi)
                .post('/checkout/cart/add_cart_v3.php?device=ios')
                .set({
                    "Authorization": token
                })
                .send({
                    "body": {
                        "product_id": j,
                        "qty": 1
                    }
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.should.include({
                        "status_code": 200,
                        "response": "success",
                        "message": "Item added to cart"
                    })
                    done();
                })
        })
    }

    for (let i of itemConfig) {
        it('Add to Cart Positive : Add Config Product [' + i[0] + ',' + i[1] + ']', (done) => {
            chai.request(serverApi)
                .post('/checkout/cart/add_cart_v3.php?device=ios')
                .set({
                    "Authorization": token
                })
                .send({
                    "body": {
                        "product_id": i[0],
                        "qty": 1,
                        "size": i[1]
                    }
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.should.include({
                        "status_code": 200,
                        "response": "success",
                        "message": "Item added to cart"
                    })
                    quoteId = res.body.cart.cart_id
                    done();
                })
        })
    }
})

describe('My Cart', () => {
    it('My Cart: Count item in Cart', (done) => {
        chai.request(serverApi)
            .post('/getCart.php?')
            .set({
                "Authorization": token
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.result.should.include({
                    "count_item": existItem+4
                })
                done();
            })
    })

    // it('My Cart: Delete 1 Qty in 1 Product', (done) => {
    //     chai.request(serverApi)
    //         .post('/getCart.php?')
    //         .set({
    //             "Authorization": token
    //         })
    //         .end((err, res) => {
    //             should.not.exist(err);
    //             res.should.have.status(200);
    //             res.type.should.equal('application/json');
    //             res.body.should.be.a('object');
    //             res.should.be.json;
    //             res.body.result.should.include({
    //                 "count_item": existItem+4
    //             })
                
    //             done();
    //         })
    // })

    
})
