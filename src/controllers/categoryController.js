import CategoryModel from "../models/categoryModel.js";
import { ObjectId } from "mongodb";
export async function listCategory(req, res) {
  try {
    const categories = await CategoryModel.find();
    res.render("pages/categories/list", {
      title: "Categories",
      categories: categories,
    });
  } catch (error) {
    console.log(error);
    res.send("Hiện tại không có sản phẩm nào!");
  }
}

export async function renderPageCreateCategory(req, res) {
  res.render("pages/categories/form", {
    title: " Create Categories",
    mode: "Create",
    category: {},
  });
}

export async function createCategory(req, res) {
  const { code, name, image } = req.body;
  try {
    await CategoryModel.create({
      code,
      name,
      image,
      createdAt: new Date(),
    });
    res.redirect("/categories");
    // res.send("tạo loại sản phẩm thành công! ");
  } catch (error) {
    console.log(error);
    res.send("tạo loại sản phẩm thành công! ");
  }
}

export async function renderPageUpdateCategory(req, res) {
  const { id } = req.params;
  const category = await CategoryModel.findOne({ _id: new ObjectId(id) });
  if (category) {
    res.render("pages/categories/form", {
      title: " Create Categories",
      mode: "Update",
      category: category,
    });
  } else {
    res.send("Hiện không có sản phẩm nào phù hợp! ");
  }
}
export async function updateCategory(req, res) {
  const { code, name, image, id} = req.body;
  try {
    await CategoryModel.updateOne(
      { _id: new ObjectId(id) },
      {
        code,
        name,
        image,
        updatedAt: new Date(),
      }
    );
    // res.send("cập nhật sản phẩm thành công! ");
    res.redirect("/categories");
    // res.send("tạo loại sản phẩm thành công! ");
  } catch (error) {
    console.log(error);
    res.send("cập nhật loại sản phẩm không thành công! ");
  }
}
