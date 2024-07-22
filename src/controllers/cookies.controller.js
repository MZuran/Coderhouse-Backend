class CookiesController {
    setCookie(req, res, next) {
        try {
            return res
                .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
                .json({ message: "Cookie will expire in one hour" });
        } catch (error) {
            return next(error);
        }
    }

    getCookies(req, res, next) {
        try {
            const cookies = req.cookies;
            const online = req.cookies.online;
            return res.json({ cookies, online });
        } catch (error) {
            return next(error);
        }
    }

    destroyCookie(req, res, next) {
        try {
            const { cookie } = req.params;
            return res
                .clearCookie(cookie)
                .json({ message: "cookie " + cookie + " removed" });
        } catch (error) {
            return next(error);
        }
    }

    setSignedCookie(req, res, next) {
        try {
            return res
                .cookie("role", "admin", { signed: true })
                .json({ message: "Cookie signed with user role" });
        } catch (error) {
            return next(error);
        }
    }

    getSignedCookies(req, res, next) {
        try {
            return res.json({ message: req.signedCookies });
        } catch (error) {
            return next(error);
        }
    }
}

const cookiesController = new CookiesController()
export const {setCookie, getCookies, destroyCookie, setSignedCookie, getSignedCookies} = cookiesController