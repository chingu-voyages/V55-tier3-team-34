import {Router , Response , Request , NextFunction} from "express";
import passport from "passport";
import {ensureAuthenticated} from "../middleware/auth.middleware";
import config from "../config/config";


const router = Router()

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

router.post('/logout', ensureAuthenticated, (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
        if(err) return next(err)
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.json({ message: 'Logout successful' });
        });
    })
})
export  default router
