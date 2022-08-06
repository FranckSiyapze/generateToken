// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
let Agora = require("agora-access-token");
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!'
    });
});

router.get('/test', function (req, res) {
    res.json({
        status: 'API Test Its Working',
        message: 'Welcome !'
    });
});
router.post('/generateToken', function (req, res) {
    ///console.log(req.body);
    const appID = "2ebd5aad591a42bc85aaae36dc754618";
    const appCertificate = "abc7fdb9e6b94a78a1e4a36000c3631a";
    const expirationTimeInSeconds = 3600;
    const uid = Math.floor(Math.random() * 100000);
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