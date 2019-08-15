const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/register', auth.optional, (req, res, next) => {
    //const user = req.body;
    const {body: {user}} = req;

    if(!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required',
            }
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            }
        });
    }

    const finalUser = new Users(user);

    finalUser.setPassword(user.password);

    return finalUser.save()
    .then( () => res.json({user: finalUser.toAuthJSON()}));

})

router.post('/login', auth.optional, (req, res, next) => {
    const {body: {user}} = req;

    if(!user.username) {
        return res.status(422).json({
            errors: {
                username: 'is required'
            }
        });
    }
    
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required'
            }
        });
    }

    return passport.authenticate('local', {session: false}, (err, passportUser, info) => {
        if(err) return next(err);

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.set('Access-Control-Allow-Headers', 'content-type, allow');
            res.set('Access-Control-Allow-Credentials', 'true');
            res.cookie('auth-token', user, {httpOnly: false, maxAge: 90000});
            res.cookie('tesasdfasdf', 'tesadsfasdf', {httpOnly: false, maxAge: 90000});
            next();
            //return res.json({user: user.toAuthJSON()});
        }
        return res.status(400);
    })(req, res, next);
});

router.get('/current', auth.required, (req, res, next) => {
    const {payload: {id}} = req;

    return Users.findById(id)
      .then((user) => {
          if(!user) {
              return res.sendStatus(400);
          }

          return res.json({user: user.toAuthJSON()});
      })
})

router.get('/isLoggedIn', auth.optional, (req, res, next) => {
    console.log(req.cookies);
    return res.sendStatus(200);
})

module.exports = router;