import {Router , Response , Request , NextFunction} from "express";
import passport from "passport";
import {ensureAuthenticated} from "../middleware/auth.middleware";
import config from "../config/config";
import bcrypt from 'bcrypt';
import { userRepository } from '../repositories/user.repository';


const router = Router()

router.post('/signup', (req: Request, res: Response) => {
  const { email, password, firstname, lastname } = req.body;

  userRepository().findUserByEmail(email)
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      bcrypt.hash(password, 10)
        .then(hashedPassword => {
          userRepository().createUser({
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
router.get('/github', passport.authenticate('github', { scope: ['user:email']}))
router.get("/github/callback", passport.authenticate('github', {
    failureRedirect: config.failureRedirect,
    successRedirect: config.successRedirect,
}))
router.get('/me', ensureAuthenticated, (req: Request, res: Response) => {
    res.status(200).json({
        data: req.user
    })
})


router.post('/login', (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('local', (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});


router.post('/logout', ensureAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if(err) return next(err)
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout successful' });
        });
    })
})
export default router
