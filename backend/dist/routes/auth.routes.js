"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const config_1 = __importDefault(require("../config/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_repository_1 = require("../repositories/user.repository");
const router = (0, express_1.Router)();
router.post('/signup', (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    (0, user_repository_1.userRepository)().findUserByEmail(email)
        .then(existingUser => {
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        bcrypt_1.default.hash(password, 10)
            .then(hashedPassword => {
            (0, user_repository_1.userRepository)().createUser({
                email,
                password: hashedPassword,
                firstname,
                lastname,
            })
                .then(user => {
                res.status(201).json({ message: 'User created successfully', user });
            })
                .catch(err => {
                console.error('Error creating user:', err);
                res.status(500).json({ error: 'Failed to create user' });
            });
        })
            .catch(err => {
            console.error('Error hashing password:', err);
            res.status(500).json({ error: 'Failed to hash password' });
        });
    })
        .catch(err => {
        console.error('Error checking for existing user:', err);
        res.status(500).json({ error: 'Failed to check existing user' });
    });
});
//todo: refactoring
router.get('/github', passport_1.default.authenticate('github', { scope: ['user:email'] }));
router.get("/github/callback", passport_1.default.authenticate('github', {
    failureRedirect: config_1.default.failureRedirect,
}), (req, res) => {
    res.redirect(config_1.default.successRedirect);
});
router.get('/me', auth_middleware_1.ensureAuthenticated, (req, res) => {
    res.status(200).json({
        data: req.user
    });
});
router.post('/login', (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user)
            return res.status(401).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err)
                return next(err);
            return res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
});
router.post('/logout', auth_middleware_1.ensureAuthenticated, (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout successful' });
        });
    });
});
exports.default = router;
