import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import CustomRouter from "./customRouter.js";
import sendEmail from "../utils/mailing.util.js";


class indexRouterClass extends CustomRouter{
    init() {
        this.use("/api", apiRouter);
        this.use("/", viewsRouter)

        this.create("/api/nodemailer", ["PUBLIC"], async (req, res, next) => {
            try {
                const { email, name} = req.body;
                await sendEmail({ to: email, name });
                return res.status(200).json({ message: "Email sent!" });
            } catch (error) {
                return next(error);
            }
        })
        
    }
}

const indexRouter = new indexRouterClass()

export default indexRouter.getRouter();
