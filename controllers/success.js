
const path = require('path');

exports.getsuccess=(req, res) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'success.html'));
}