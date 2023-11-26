import express from "express"
import { isWholeseller, requireSignIn } from "../middlewares/authMiddleware.js"
import { createProductController, deleteProductController, getProductController, getsingleProductController, productFilterController, productPhotoController, searchProductController, updateProductController } from "../controllers/productController.js"
import formidable from "express-formidable"
 
const router = express.Router()

router.post('/create-Product',requireSignIn, formidable(), createProductController)
router.put('/update-Product/:pid',requireSignIn, isWholeseller, formidable(), updateProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:slug', getsingleProductController)

router.get("/product-photo/:pid", productPhotoController);

router.delete("/delete-product/:pid", deleteProductController);

router.post("/product-filters",productFilterController)

router.get("/search/:keyword",searchProductController)


export default router