'use strict'

const fs = require('fs');
const passport = require('passport');
const passportSaml = require('passport-saml');

const savedUsers = [];

passport.serializeUser((expressUser, done) => {
    done(null, expressUser);
});

passport.deserializeUser((expressUser, done) => {
    done(null, expressUser);
});

// SAML strategy for passport -- Single IPD
const strategy = new passportSaml.Strategy(
    {
        issuer: process.env.ISSUER_SAML,
        protocol: 'https://',
        path:'/login/callback',
        entryPoint: process.env.ENTRY_SAML,
        cert: fs.readFileSync(process.env.PATH_CERT_SAML, {encoding:'utf8', flag:'r'})
    },
    (expressUser, done) => {
        if (!savedUsers.includes(expressUser)) {
            savedUsers.push(expressUser);
        }

        return done(null, expressUser);
    }
);

passport.use(strategy);

module.exports = passport;