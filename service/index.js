var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const Razorpay = require('razorpay');


app.use(bodyParser.json(
    
));

app.post("/razorpay", async function (req, res) {
    var instance = new Razorpay({
        key_id:"xxxxxxxxxxxxxxxx", // Enter the Key ID generated from the Dashboard
        key_secret: "xxxxxxxxxxxxx", // Enter the Key SECRET generated from the Dashboard
      });
    var data = req.body;
    var options = {
        amount:data.amount,  // amount in the smallest currency unit
        currency: data.currency, 
        receipt: data.receipt
      };
      instance.orders.create(options, function(err, order) {
        res.send({orderID: order.id})
      });
})

module.exports = {
    handler: app
}
