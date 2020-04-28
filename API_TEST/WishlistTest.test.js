const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const serverApi = 'https://wikwik-store.thefthing.com/app_mobile_stable/v2'
chai.use(chaiHttp);

let itemCount = 0
let token = null
let wishlistId = []

//wikwik
const itemSimple = [25679, 25687]
const itemConfig = [
    [27903, 586],
    [26712, 586]
]
const item = 16111
const mailWish = "testing02@thefthing.com"
const passWish = "Testing123"

function sendApi(email, password) {
    hit = {
        "body": {
            "email": email,
            "password": password
        }
    }
}

describe('Wishlist Testing', () => {
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

    it('Wishlist Positive : No item in Wishlist', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=get-wishlist')
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
                    'totalPage': 0,
                    'currentPage': 0
                });
                res.body.status.should.include({
                    "response": "success",
                    "message": "Item from wishlist is empty",
                    "code": 200
                })
                done()
            })
    })

    it('Wishlist Negative : Empty Product-id', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=add-wishlist')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product-id": "",
                    "id-size": "40"
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "response": "error",
                    "message": "Your params data is empty",
                    "code": 202
                })
                done();
            })
    })

    it('Wishlist Negative : Invalid Product-id', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=add-wishlist')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product-id": "89asd",
                    "id-size": ""
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 202,
                    "response": "error",
                    "message": "Cannot specify product."
                })
                done();
            })
    })

    it('Wishlist Negative : Add Item (No Size)', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=add-wishlist')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product-id": itemConfig[0][0],
                    "id-size": ""
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 202,
                    "response": "failed",
                    "message": "Please choose item size."
                })
                done();
            })
    })

    it('Wishlist Negative : Invalid id-size', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=add-wishlist')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "product-id": item,
                    "id-size": "503"
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "code": 202,
                    "response": "failed",
                    "message": "Attribute size-id for it configurabel product (" + item + ") is not match. Please choose one from list attributes below",
                })
                done();
            })
    })

    for (let j of itemConfig) {
        it('Wishlist Positive : Add Config Product [' + j[0] +','+ j[1] + ']', (done) => {
            console.log(j[0])
            chai.request(serverApi)
                .post('/wishlist.php?action=add-wishlist')
                .set({
                    "Authorization": token
                })
                .send({
                    "body": {
                        "product-id": j[0],
                        "id-size": j[1]
                    }
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.status.should.include({
                        "code": 200,
                        "response": "success",
                        "message": "Item added to wishlist"
                    })
                    
                    itemCount += 1
                    done();
                })
        })
    }

    for (let i of itemSimple) {
        it('Wishlist Positive : Add Simple Product [' + i + ']', (done) => {
            chai.request(serverApi)
                .post('/wishlist.php?action=add-wishlist')
                .set({
                    "Authorization": token
                })
                .send({
                    "body": {
                        "product-id": i,
                        "id-size": ""
                    }
                })
                .end((err, res) => {
                    should.not.exist(err);
                    res.should.have.status(200);
                    res.type.should.equal('application/json');
                    res.body.should.be.a('object');
                    res.should.be.json;
                    res.body.status.should.include({
                        "code": 200,
                        "response": "success",
                        "message": "Item added to wishlist"
                    })

                    wishlistId.push(res.body.wishlist_id)
                    console.log(res.body.wishlist_id)
                    itemCount += 1
                    done();
                })
        })
    }

    it('Wishlist Positive : Count items wishlist = 4', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=get-wishlist')
            .set({
                "Authorization": token
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.wishlist.should.be.a('array');
                res.body.wishlist.should.have.length(4)
                done();
            })
    })

    it('Wishlist Positive : Delete', (done) => {
        console.log(wishlistId)
        chai.request(serverApi)
            .post('/wishlist.php?action=delete-wishlist')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "id-wishlist": wishlistId[0],
                }
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "response": 'success',
                    "message": 'Item deleted from wishlist',
                    "code": 200
                })
                itemCount -= 1
                done();
            })
    })

    it('Wishlist Positive : Count items wishlist (After Deleting) = 3', (done) => {
        chai.request(serverApi)
            .post('/wishlist.php?action=get-wishlist')
            .set({
                "Authorization": token
            })
            .end((err, res) => {
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.wishlist.should.be.a('array');
                res.body.wishlist.should.have.length(3)
                done();
            })
    })

    it('Add to Cart by Wishlist', (done) => {
        chai.request(serverApi)
            .post('/moveAllWishlistById.php')
            .set({
                "Authorization": token
            })
            .send({
                "body": {
                    "wishlist-id": wishlistId[1],
                    "action": "add-onebyone-to-cart"
                }
            })
            .end((err, res) => {
                console.log(res.body)
                should.not.exist(err);
                res.should.have.status(200);
                res.type.should.equal('application/json');
                res.body.should.be.a('object');
                res.should.be.json;
                res.body.status.should.include({
                    "response": "success",
                    "message": "Success Add item to cart",
                    "code": 200
                })

                done();
            })
    })
})