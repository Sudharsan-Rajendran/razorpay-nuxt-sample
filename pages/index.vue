<template>
  <div>
      <b-container>
        <div style="margin-top: 2em;">
          <b-card
            title="Shoe"
            img-src="nike.jpeg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <span><p>300 <span>&#8377;</span></p></span>    
            </b-card-text>

            <b-button href="#" variant="primary" @click="razorpayPayment()">Buy</b-button>
          </b-card>
        </div>
      </b-container>
  </div>
  

</template>

<script>
export default {
 head () {
  return{
    title: `Sample Razorpay Payment`,

    script: [
    { src: "https://checkout.razorpay.com/v1/checkout.js", body: true }
    ],
  }
 },

 methods: {

  razorpayPayment:function (){
                var data = {
                amount: "50000",  // amount in the smallest currency unit
                currency: "INR",
                receipt: "SDSDSVV23"
                };

                this.$axios
              .$post(`/razorpay`,data)
              .then((response) => {
                console.log('response',response);
                var options = {
                    "key": "xxxxxxxxxxxxxx", // Enter the Key ID generated from the Dashboard
                    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "CAMPAIGN",
                    "description":"CAMPAIGN DEC",
                    "order_id": response.orderID,
                    "callback_url":"https://www.youtube.com/",
                    "redirect": false,
                    "theme": {
                        "color": "red"
                    },
                };
                
                var rzp1 = new Razorpay(options);
                rzp1.on('payment.failed', function (response){
                    var redirect_url = "https://www.youtube.com/"
                    console.log("unsuccessful url",redirect_url)
                    window.location.replace(redirect_url);
                });
                    rzp1.open();
                // window.location.replace(response);
              })
              .catch((error) => {
                console.log("Error ", error);
              });
            },
 },


}
</script>
