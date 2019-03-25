const  util = require('util'),
       url = require('url');

class TokensController {

    constructor(router) {
        //Check referer
        router.use(this.refererCheck.bind(this));

        router.get('/csrf', this.getCsrfToken.bind(this));
    }

    refererCheck(req, res, next) {
        var referer = url.parse(req.headers.referer);
        console.log('Referer: ' + req.headers.referer);
        if (referer.host !== 'localhost' && referer.port !== '3000') {
            throw new Error('Invalid request');
        }
        next();
    }

    getCsrfToken(req, res) {
        console.log('*** getCsrfToken');
        res.json({ csrfToken: res.locals._csrf });
    }
}

module.exports = TokensController;