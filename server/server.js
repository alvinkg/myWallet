// got from stripe payment site all these api ids
//stripe: sk_test_51MaAFYCrLBlkadCQNzzoA8L3fFcOGg4roLXdrMumS0cToWkCjfyu4sqFdHlEGbYaV7vq0OrGLu570U4Fc9fmmIDo0008NC10g7
//  sk_test_51LOGYxLNZCIg5vWkwJW1jzSolPFD4cWkFWYN4PjCrltSDpKqxGel1vxOu8BhsCvief8GJwqWTCEYI2xvnWXRAdSz00TVN5qU4I
//coffee: price_1MhvmWCrLBlkadCQnX5SD9uc
//sunglasses: price_1Mhvo5CrLBlkadCQwMSBWLVx
//camera: price_1MhvoMCrLBlkadCQbVvQE2ki
// burger: price_1NuDVZLNZCIg5vWkMmjHf5ik
// ice cream: price_1NuDThLNZCIg5vWkHZ1Hzptx
// pizza: price_1NuDT6LNZCIg5vWkAXp53eKK
// water: price_1NuDSPLNZCIg5vWkYHPC6wsv
// salad: price_1NuDYuLNZCIg5vWkn2DPpmQa
// kebab: price_1NuDYfLNZCIg5vWkmLydG9RL
// Top Up $10: price_1NuDasLNZCIg5vWknF9Q92ll
// Top Up $50: price_1NuDafLNZCIg5vWkeh7EuqsT
// Top Up Wallet: price_1NuQSCLNZCIg5vWkg2gECJZQ
// cola: price_1NuDYRLNZCIg5vWkuj9bilBe
// https://redpillsage.com/media/.png
// 2023-09-18 10:47:51.379731

const express = require('express');
var cors = require('cors');
// should use os to hide the secret key
const stripe = require('stripe')('sk_test_51LOGYxLNZCIg5vWkwJW1jzSolPFD4cWkFWYN4PjCrltSDpKqxGel1vxOu8BhsCvief8GJwqWTCEYI2xvnWXRAdSz00TVN5qU4I');

const app = express();
app.use(cors());
app.use(express.static("public")) //recommended by stripe
app.use(express.json());
// We are going to post to the checkout route
app.post("/checkout", async (req, res) => {
    try {
        // console.log('req.items:', req)
        // format the line items as req by stripe
        const items = req.body.items;
        console.log('items:', items)
        let lineItems = [];
        items.forEach((item) => {
            // console.log('item:', item);
            if (item.id !== 1000) {
                lineItems.push(
                    {
                        price: item.sid,
                        quantity: item.quantity
                    }
                )
            }
            else {
            lineItems = [
                {
                    price_data: {
                        currency: 'sgd',
                        product_data: {
                            name: item.name
                        },
                        unit_amount: item.priceInCents
                    },
                    quantity: item.quantity
                },
            ]
            }
        });            
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/wallet",
            cancel_url: "http://localhost:3000/cancel"
        });
        // send above session to frontend for user to checkout with stripe
        console.log('session url:', session.url)
        res.send(JSON.stringify({
            url: session.url
        })
        )
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});
    // });
    // let lineItems = [
    //     {
    //         price_data: {
    //             currency: 'sgd',
    //             product_data: {
    //                 name: 'donkey'
    //             },
    //             unit_amount: 1000
    //         },
    //         quantity: 1
    //     },
    //     { price: 'price_1NuDSPLNZCIg5vWkYHPC6wsv', quantity: 1 }
    // ]
    // create payment session with above line items




// startup server to listen
app.listen(4000, ()=> console.log("listening on port 4000"))