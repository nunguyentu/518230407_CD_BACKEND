import ProductModel from "../models/productModel.js";
import CategoryModel from "../models/categoryModel.js";
const data = [
    {
        code: "ATD_001",
        name: "Áo Nam",
        price: 1000000,
        images: ["binh-hoa-sinh-nhat-lan-ho-diep.jpg"],
        searchString: "ao nam, ao thun tay dai nam ",
        size: ["S", "M", "L"],
        colors: ["red", "green"],
        active: true,
        description: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        imfomation: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        categoryCode: "A_001",
        createdAt: new Date(),
    },
     {
        code: "MA_001",
        name: "Máy ảnh cơ",
        price: 2000000,
        images: ["binh-hoa-sinh-nhat-lan-ho-diep.jpg"],
        searchString: "may anh",
        size: ["S", "M", "L","XL"],
        colors: [ "green", "yellow","white"],
        active: true,
        description: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        imfomation: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        categoryCode: "MA_001",
        createdAt: new Date(),
    },
    {
        code: "GIAY_001",
        name: "Giay nam",
        price: 3000000,
        images: ["binh-hoa-sinh-nhat-lan-ho-diep.jpg"],
        searchString: "giay nam",
        sizes: ["S", "M", "L"],
        colors: ["white","black"],
        active: true,
        description: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        imfomation: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        categoryCode: "G_001",
        createdAt: new Date(),
    },
    {
        code: "MP_001",
        name: "Áo Nam",
        price: 5000000,
        images: ["binh-hoa-sinh-nhat-lan-ho-diep.jpg"],
        searchString: "my pham",
        sizes: ["M", "L"],
        colors: ["green", "yellow"],
        active: true,
        description: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        imfomation: "Technology has transformed the way we live, work, and communicate. With the rise of the internet and smartphones, people can now connect instantly, access vast amounts of information, and complete tasks more efficiently. While these advancements offer many benefits, they also present challenges, such as privacy concerns and digital addiction. Therefore, it is essential to use technology wisely and find a balance between the digital and real world.",
        categoryCode: "MP_001", 
        createdAt: new Date(),
    },

]
export default async function categorySeeder(){
    await ProductModel.deleteMany()
       const categories = await CategoryModel.find({})
       let writeProduct = []
    for(let product in data ){
        const {categoryCode, ...dataOther} = data[product]
        const category = categories.find(categoryItem=> {
            return categoryItem.code =  categoryCode

        })
        writeProduct.push({
            categoryId: !!category ? category._id : null,
            ...dataOther
        })
    }
    await ProductModel.insertMany(writeProduct)

}