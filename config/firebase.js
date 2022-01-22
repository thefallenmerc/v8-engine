const firebaseAdmin = require('firebase-admin');

var serviceAccount = require(process.env.FIREBASE_ADMIN_SDK_JSON_PATH);

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_ADMIN_DATA_URL
});

module.exports = firebaseAdmin;