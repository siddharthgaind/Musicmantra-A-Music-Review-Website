exports.googleAuthenticate = function (req, res, next) {
    req.session.token = req.user.token;
    res.redirect('/api');
};
exports.sessionToken = function (req, res, next) {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'cookie not set'
        });
    }
};


