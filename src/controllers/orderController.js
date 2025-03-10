import OrderModel from "../models/orderModel.js"; 
import ProductModel from "../models/productModel.js"; 
import { prepareOrderItems } from "../ultils/order.js"; 

import { ObjectId } from "mongodb";

const sortObjects = [
  { code: "name_DESC", name: "Tên giảm dần" },
  { code: "name_ASC", name: "Tên tăng dần" },
  { code: "code_DESC", name: "Mã giảm dần" },
  { code: "code_ASC", name: "Mã tăng dần" },
];
const sizes = ["S", "M", "L","XL"]
const colors = ["red", "green", "yellow","white","black"]
export async function listOrder(req, res) {
  const search = req.query?.search;
  const pageSize = !!req.query.pageSize ? parseInt(req.query.pageSize) : 5; // 5
  const page = !!req.query.page ? parseInt(req.query.page) : 1;
  const skip = (page - 1) * pageSize;
  let sort = !!req.query.sort ? req.query.sort : null;
  let filters = {
    deletedAt: null,
  };
  if (search && search.length > 0) {
    filters.orderNo =  search 
  }
  if(!sort){
  sort = {createdAt: -1}
  }else{
    const sortArray = sort.split('_')
    sort ={ [sortArray[0]] : sortArray[1] === "ASC" ? 1: -1 }
  }
  try {
    const countOrders = await OrderModel.countDocuments(filters);
    const orders = await OrderModel.find(filters).populate("orderItems.product", "name code").skip(skip).limit(pageSize).sort(sort)
    // res.send(orders)
    res.render("pages/orders/list", {
      title: "Order",
      orders: orders,
      countPagination: Math.ceil(countOrders / pageSize),
      pageSize,
      page,
      sort,
      sortObjects,
    });
  // res.send({countOrders, orders})
  } catch (error) {
    console.log(error);
    res.send("Hiện tại không có order nào!");
  }
}

export async function renderPageSimulateCreateOrder(req, res) {
  const products = await ProductModel.find({deletedAt: null}, "code name price sizes colors")

  res.render("pages/orders/form", {
    title: " Create Orders",
    mode: "Create",
    order: {},
    products: products,
    err:{}
  });
}

export async function createOrder(req, res) {
  const { discount,orderItems,billingAddress } = req.body
  let subTotal = 0, total = 0, numericalOrder = 1 
  const lastOrder = await OrderModel.findOne().sort({ createdAt: -1})
  
  if(lastOrder){
    numericalOrder = lastOrder.numericalOrder + 1;
  }
  const orderNo = "order-" + numericalOrder
   
  if(orderItems.length > 0) {
    for(let orderItem of orderItems){
      subTotal += (orderItem.quantity * orderItem.price)
    }
  }
  total = subTotal * (100 - discount) / 100
  try {
  const rs = await OrderModel.create({
      orderNo: orderNo,
      discount: discount,
      total: total,
      status: "created",
      orderItems: orderItems,
      numericalOrder: numericalOrder,
      createdAt: new Date(),
      billingAddress:billingAddress
    })
    res.send(rs)
  } catch (error) {
    console.log("err", error)
  }
}


export async function simulatorCreateOrder(req, res) {
 
  const { discount,itemSelect,quantity,itemColor,itemSize, itemPrice,
    billingName,billingEmail,billingPhoneNumber,billingAddress: address,billingDistrict,billingCity } = req.body
  let subTotal = 0, total = 0, numericalOrder = 1 
  const lastOrder = await OrderModel.findOne().sort({ createdAt: -1})
  
  if(lastOrder){
    numericalOrder = lastOrder.numericalOrder + 1;
  }
  const orderNo = "order-" + numericalOrder
   

  const billingAddress = {
    name: billingName,
    email: billingEmail,
    phoneNumber: billingPhoneNumber,
    address: address,
    district:billingDistrict,
    city: billingCity,
  } 
  const orderItems = prepareOrderItems({
    itemSelect: itemSelect,
    quantity: quantity,
    itemPrice: itemPrice,
    itemColor: itemColor,
    itemSize: itemSize,
  })
  if(orderItems.length > 0) {
    for(let orderItem of orderItems){
      subTotal += (orderItem.quantity * orderItem.price)
    }
  }
  total = subTotal * (100 - discount) / 100
  
  try {
  const rs = await OrderModel.create({
      orderNo: orderNo,
      discount: parseFloat(discount),
      total: total,
      status: "created",
      orderItems: orderItems,
      numericalOrder: numericalOrder,
      createdAt: new Date(),
      billingAddress:billingAddress
    })
    res.redirect("/orders");
  } catch (error) {
    console.log("err", error)
  }
}

export async function updateStatusDeliveringOrder(req, res) {
 
  const { status, orderId } = req.body
  const currentOrder = await OrderModel.findOne({ _id: new ObjectId(orderId) },)
  try {
  
    if(currentOrder){
      const rs = await OrderModel.updateOne(
        { _id: new ObjectId(orderId) },
     {
       status: "delivering",
       updatedAt: new Date(),
     })
     res.send({
     success: true,
    
  });
    }else{
      res.send({
        success: false,
        message: "Không tồn tại order này!",
      });
    }
   
  } catch (error) {
    console.log("err", error)
    res.send({
      success: false,
      message: "Thay đổi trạng thái không thành công: "+ currentOrder.orderNo,
    });
  }
}
// export async function renderPageUpdateProduct(req, res) {
//   try {
//     const categories = await CategoryModel.find({ deletedAt: null })
//     const { id } = req.params;
//     const product = await ProductModel.findOne({ _id: new ObjectId(id), deletedAt: null })
//     if (product) {
//       console.log("product", product,categories)
//       res.render("pages/products/form", {
//         title: " Update Product",
//         mode: "Update",
//         product: product,
//         sizes: sizes,
//         colors: colors,
//         categories: categories,
//         err: {}
//       });
//     } else {
//       res.send("Hiện không có sản phẩm nào phù hợp! ");
//     }
//   } catch (error) {
//     res.send("Trang web này không tồn tại!");
//   }
// }
// export async function updateProduct(req, res) {
//   const { ...data } = req.body;
//   const { id } = req.params;
//   console.log({})
//   try {
//     const category =   await CategoryModel.findOne({ code: data.code , deletedAt: null})
//     if(category){
//       throw("code")
//     }
//     await CategoryModel.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         ...data,
//         updatedAt: new Date(),
//       }
//     );
//     // res.send("cập nhật sản phẩm thành công! ");
//     res.redirect("/categories");
//     // res.send("tạo loại sản phẩm thành công! ");
//   } catch (error) {
//     const err = {}
//     if(error === "code"){
//       err.code = "Mã sản phẩm này đã tồn tại"
//     }
//     if (error.name === "ValidationError") {
//       Object.keys(error.errors).forEach((key) => {
//         err[key] = error.errors[key].message
//       })
//     }
//     console.log("err", err)

//     res.render("pages/categories/form", {
//       title: " Update Categories",
//       mode: "Update",
//       category: { ...data, _id: id},
//       err
//     });
//   }
// }
// export async function renderPageDeleteProduct(req, res) {
//   try {
//     const { id } = req.params;
//     const category = await CategoryModel.findOne({_id: new ObjectId(id), deletedAt: null,});
//     if (category) {
//       res.render("pages/categories/form", {
//         title: " Create Categories",
//         mode: "Delete",
//         category: category,
//         err: {}
//       });
//     } else {
//       res.send("Hiện không có sản phẩm nào phù hợp! ");
//     }
//   } catch (error) {
//     console.log(error);
//     res.send("Trang web này không tồn tại!");
//   }
// }
// export async function deleteProduct(req, res) {
//   const { id } = req.body;
//   try {
//     await CategoryModel.updateOne(
//       { _id: new ObjectId(id) },
//       {
//         deletedAt: new Date(),
//       }
//     );
//     // res.send("cập nhật sản phẩm thành công! ");
//     res.redirect("/categories");
//     // res.send("tạo loại sản phẩm thành công! ");
//   } catch (error) {
//     console.log(error);
//     res.send("Xóa loại sản phẩm không thành công! ");
//   }
// }
