f (process.env.NODE_ENV !== 'development') {
    require('dotenv').config();
  }
const accountSid = process.env.ACCOUNT_SID;
const authoToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authoToken);
const axios = require('axios');
 
axios.get('https://jsonplaceholder.typicode.com/users')
  .then((res) => {
    if(res.status !== 200){
        //Message Body
        const msg = `Server is ${res.statusText}, code ${res.status}, ${res.config.url} on ${res.headers.date}`
        //send SMS
        client.messages.create({
            body: msg,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: process.env.MY_PHONE_NUMBER
            })
            .then(message => console.log(message.sid));
    }else{
        console.log(`Server is ${res.statusText}, code ${res.status}, ${res.config.url} on ${res.headers.date}`)
    }
  })
  .catch(function (error) {
    console.log(error);
  })

