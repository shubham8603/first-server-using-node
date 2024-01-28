
const path = require('path');


exports.getContactUs=(req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'contactus.html'));
}

exports.postContactus = (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
}