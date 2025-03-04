import express from "express";
import { 
    listCategory,
    createCategory, 
    renderPageCreateCategory,
    renderPageUpdateCategory,
    updateCategory,
    renderPageDeleteCategory,
    deleteCategory,
    createCategoryByModal,
    
} from "../controllers/categoryController.js";
const router = express.Router();
router.get("/", listCategory);
router.get("/create", renderPageCreateCategory); 
router.post("/create", createCategory);
router.post("/createByModal", createCategoryByModal);

router.get("/update/:id", renderPageUpdateCategory); 
router.post("/update/:id", updateCategory);

router.get("/delete/:id", renderPageDeleteCategory); 
router.post("/delete", deleteCategory);
export default router;
