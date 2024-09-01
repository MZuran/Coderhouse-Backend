import { getTokenFromReq } from "../utils/token.util.js";

import {
    paginateService,
    readOneService,
} from "../services/products.service.js"

class ProductsViewController {
    async productsView(req, res, next) {
        try {
            let { page, category } = req.query;
            if (!page) { page = 1 }

            const { role, _id } = getTokenFromReq(req,res)

            let query = {}
            if (category) { query.category = category }
            if (role === 2) { query.supplier_id = { $ne: _id }}

            const productList = await paginateService(query, { limit: 4, page: page });

            const queryString = category ? `category=${category}&` : "";

            return res.render("products-paginated",
                {
                    title: "PRODUCTS",
                    products: productList.docs,
                    data: productList,
                    page: page,
                    prevPage: JSON.parse(page) - 1,
                    nextPage: JSON.parse(page) + 1,
                    queryString
                });

        } catch (error) {
            next(error)
        }
    }

    async productsViewMine(req, res, next) {
        try {
            let { page, category } = req.query;
            if (!page) { page = 1 }

            const { role, _id } = getTokenFromReq(req,res)

            let query = {}
            if (category) { query.category = category }
            if (role === 2) { query.supplier_id = _id }

            const productList = await paginateService(query, { limit: 4, page: page });

            const queryString = category ? `category=${category}&` : "";

            return res.render("products-paginated",
                {
                    title: "PRODUCTS",
                    products: productList.docs,
                    data: productList,
                    page: page,
                    prevPage: JSON.parse(page) - 1,
                    nextPage: JSON.parse(page) + 1,
                    queryString
                });

        } catch (error) {
            next(error)
        }
    }

    async productsViewOne(req, res, next) {
        try {
            const { nid } = req.params;
            const one = await readOneService(nid);
            return res.render("details", { title: "DETAILS", product: one });
        } catch (error) {
            return next(error);
        }
    }

    async addProductsForm(req, res, next) {
        try {
            return res.render("add-product", { title: "ADD PRODUCTS" });
        } catch (error) {
            return next(error);
        }
    }

    async editOneProduct(req, res, next) {
        try {
            const { nid } = req.params;
            const one = await readOneService(nid);
            return res.render("edit-product", { title: "DETAILS", product: one });
        } catch (error) {
            return next(error);
        }
    }
}

const productsViewController = new ProductsViewController()
export const { productsView, productsViewOne, addProductsForm, productsViewMine, editOneProduct } = productsViewController