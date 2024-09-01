class HomeController {
     async homePage(req, res, next) {
        try {
            return res.render("welcome", { title: "WELCOME" });
        } catch (error) {
            next(error)
        }
    }
}

const homeControllerInstance = new HomeController()
export const { homePage } = homeControllerInstance