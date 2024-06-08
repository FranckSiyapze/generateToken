// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let Agora = require("agora-access-token");
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});
const nocache = (req,resp,next)=>{
    resp.header('Cache-Control','private,no-cache,no-store,must-revalidate');
    resp.header('Expires','-1');
    resp.header('Pragma','no-cache');
    next();
}

router.get('/test', function (req, res) {
    res.json({
        status: 'API Test Its Working',
        message: 'Welcome !'
    });
});

router.post('/sendWhatMessage',nocache, function (req, res) {
    const { body } = req.body;
    if (!body) {
        return res.status(400).json({status: 400, message: 'Missing required parameters' });
    }
    client.messages
      .create({
         from: 'whatsapp:+14155238886',
         body: body,
         to: 'whatsapp:+13435581078'
       })
      .then(message => res.json({
        status: message.status,
        message: 'Send'
    })
);
      
});
router.post('/generateToken',nocache, function (req, res) {
    ///console.log(req.body);
    res.header('Acess-Control-Allow-Origin','*');
    const appID = "b87ad04386734ecf8322d949023bb32a";
    const appID1 = "2ebd5aad591a42bc85aaae36dc754618";
    const appCertificate = "87d421f4b2754616a37b5e14cbbd2c0b";
    const appCertificate1 = "abc7fdb9e6b94a78a1e4a36000c3631a";
    const expirationTimeInSeconds = 3600;
    const uid = 0;
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    res.json({
        uid: uid,
        token: token,
    });
});
// Export API routes
module.exports = router;