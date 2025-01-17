import CategoryModel from "../models/categoryModel.js";

const data = [
    {
        code: "AN_001",
        name: "Áo nữ",
        image: "binh-hoa-sinh-nhat-lan-ho-diep.jpg",
        searchString: "ao nu",
        createdAt: new Date(),
    },
    {
        code: "MA_001",
        name: "Máy ảnh",
        image: "binh-hoa-sinh-nhat.jpg",
        searchString: "may anh",
        createdAt: new Date(),
    },
    {
        code: "GN_001",
        name: "Giày nam",
        image: "gio-hoa-sinh-nhat-tang-ban.jpg",
        searchString:"giay nam",
        createdAt: new Date(),
    },
    {
        code: "MP_001",
        name: "Mỹ phẩm",
        image: "h_gioi_thieu.jpg",
        searchString:"my pham",
        createdAt: new Date(),
    },
]
export default async function categorySeeder(){
     await CategoryModel.deleteMany()
     await CategoryModel.insertMany(data)
}