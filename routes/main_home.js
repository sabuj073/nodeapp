import cors from "cors";
import express from "express";
import db from "../database.js";
import SSLCommerz from "sslcommerz-nodejs";


let settings = {
    isSandboxMode: true, //false if live version
    store_id: "kstor605acb79a9566",
    store_passwd: "kstor605acb79a9566@ssl"
}

let sslcommerz = new SSLCommerz(settings);


const home_router = express.Router();
home_router.use(cors());
home_router.use(express.json());

home_router.post("/getSLider", (req, res) => {
  const type = req.body.type;
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("SELECT * FROM `slider1` where type=?", [type], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get_cat", (req, res) => {
  const key = req.body.key;
  const just_id = req.body.area_id;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `category` where area_id=? and type='category'",
      [just_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});


home_router.post("/get_service_cat", (req, res) => {
  const key = req.body.key;
  const just_id = req.body.area_id;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `category` where area_id=? and type='service_category'",
      [just_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get_cat-all", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("SELECT * FROM `category`", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get-product-all", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `product`,category WHERE product.product_cat = category.cat_id",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/product_details", (req, res) => {
  const key = req.body.key;
  const slug = req.body.slug;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `product` where product_slug=?",
      [slug],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get_cat_with_products", (req, res) => {
  const key = req.body.key;
  const just_id = req.body.area_id;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT DISTINCT cat_title, cat_id,cat_banner,cat_banner_2,cat_slug,alt FROM category AS c INNER JOIN product AS p ON p.product_cat  = c.cat_id and c.area_id =? and p.area_id =? and p.status=1",
      [just_id, just_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get_category_products", (req, res) => {
  const key = req.body.key;
  const just_id = req.body.area_id;
  const cat_id = req.body.cat_id;
  const vendor_id = req.body.vendor_id;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `product` WHERE product.product_cat = ? and product.area_id = ? AND product.vendor_id = ? and product.status=1 ",
      [cat_id, just_id,vendor_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get_sub_cat", (req, res) => {
  const cat_id = req.body.cat_id;
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `sub_category` where cat_id=?",
      [cat_id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});


home_router.post("/checkout", (req, res) => {
  const key = req.body.key;
  const items = req.body.items;
  const total_amount = req.body.total_amount;
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const user_id =  req.body.user_id;
  const district = req.body.district;
  const address = req.body.address;
  const delivery_charge = req.body.delivery_charge;
  const thana = req.body.thana;
  const area = req.body.area;
  const note = req.body.note;
  const payment_method="Online Payment";
  const payment_status ="Pending";
  const delivery_status = "Pending";
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {

    db.query(
      "INSERT INTO `orders` (`user_id`, `name`, `email`, `number`, `address`, `total_amount`, `payment_method`, `payment_status`, `status`, `vendor_id`, `discount`, `delivery_charge`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [user_id,name,email,phone,address,total_amount,payment_method,payment_status,delivery_status,1,0,delivery_charge],
      (err, result) => {
        const order_id = result.insertId;
        for(var i = 0 ; i<items.length ;i++){
          console.log(items[i]);
          db.query(
            "INSERT INTO `order_details` (`order_id`, `product_id`, `product_name`, `product_image`, `product_qty`,unit_price,total_price) VALUES (?, ?, ?, ?, ?,?,?);",
            [order_id,items[i].id,items[i].en_product_name,items[i].product_image,items[i].quantity,items[i].price,items[i].itemTotal],
            (err, result) => {
            }
          );
        }
      }
    );
  }

  let post_body = {};
  post_body['total_amount'] = total_amount;
  post_body['currency'] = "BDT";
  post_body['tran_id'] = "12345";
  post_body['success_url'] = "http://localhost:3000/success";
  post_body['fail_url'] = "http://localhost:3000/fail";
  post_body['cancel_url'] = "http://localhost:3000/cancel";
  post_body['emi_option'] = 0;
  post_body['cus_name'] = "test";
  post_body['cus_email'] = "test@test.com";
  post_body['cus_phone'] = "01700000000";
  post_body['cus_add1'] = "customer address";
  post_body['cus_city'] = "Dhaka";
  post_body['cus_country'] = "Bangladesh";
  post_body['shipping_method'] = "NO";
  post_body['multi_card_name'] = ""
  post_body['num_of_item'] = 1;
  post_body['product_name'] = "Test";
  post_body['product_category'] = "Test Category";
  post_body['product_profile'] = "general";
  sslcommerz.init_transaction(post_body).then(response => {
      console.log(response.GatewayPageURL);
      res.send(response.GatewayPageURL);
  }).catch(error => {
      console.log(error);
      res.send(error);
  })



});


home_router.post("/get_sub_cat_all", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * FROM `sub_category`,category WHERE sub_category.cat_id = category.cat_id",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/delete-cat", (req, res) => {
  const id = req.body.id;
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "DELETE FROM `category`  WHERE  cat_id = ?",[id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/delete-sub-cat", (req, res) => {
  const id = req.body.id;
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "DELETE FROM `sub_category`  WHERE  sub_cat_id = ?",[id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});




home_router.post("/get_brand", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("SELECT * FROM `brands`", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});


home_router.post("/get_user", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("SELECT * from `user`", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});




home_router.post("/create-sub-category", (req, res) => {
  const key = req.body.key;
  const sub_category_name= req.body.sub_category_name;
  const sub_category_bangla= req.body.sub_category_bangla;
  const category= req.body.category;
  const slug= req.body.slug;
  const meta_title= req.body.meta_title;
  const meta_description= req.body.meta_description;
  const category_image=req.body.category_image;
  const category_icon=req.body.category_icon;

if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("INSERT INTO `sub_category` (`cat_id`, `sub_cat_name`, `sub_category_bangla`, `sub_cat_slug`, `meta_title`, `meta_description`, `category_image`, `category_icon`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [category,sub_category_name,sub_category_bangla,slug,meta_title,meta_description,category_image,category_icon], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/create-vendor", (req, res) => {
  const key = req.body.key;
  const company_name= req.body.company_name;
  const dealer_name= req.body.dealer_name;
  const father_name= req.body.father_name;
  const mother_name= req.body.mother_name;
  const email= req.body.email;
  const phone= req.body.phone;
  const NID=req.body.NID;
  const permanent_address=req.body.permanent_address;
  const present_address = req.body.present_address;
  const local_categories=req.body.local_categories;
  const local_area=req.body.local_area;
  const local_thana=req.body.local_thana;
  const local_district=req.body.local_district;
  const provider_photo=req.body.provider_photo;
  const nid_photo=req.body.nid_photo;
  const trade_photo=req.body.trade_photo;
  const categoryCommission=req.body.categoryCommission;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("INSERT INTO `vendor` (`shop_name`, `vendor_name`, `father_name`, `mother_name`, `email`, `mobile_number`, `nid_number`, `permanent_address`, `present_address`, `provider_photo`, `upload_nid`, `upload_trade_license`, `district`, `thana`, `area`, `product_categories`, `commision`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [company_name,dealer_name,father_name,mother_name,email,phone,NID,permanent_address,present_address,provider_photo,nid_photo,trade_photo,local_district,local_thana,local_area,local_categories,categoryCommission,], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/get-vendor", (req, res) => {
  const key = req.body.key;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query("SELECT * FROM `vendor`", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/make-vendor-deactive",(req,res)=> {
  const key = req.body.key;
  const id = req.body.id;
  db.query("UPDATE vendor set status=0 where vendor_id=?",[id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

home_router.post("/make-vendor-active",(req,res)=> {
  const key = req.body.key;
  const id = req.body.id;
  db.query("UPDATE vendor set status=1 where vendor_id=?",[id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

home_router.post("/make-vendor-delete",(req,res)=> {
  const key = req.body.key;
  const id = req.body.id;
  db.query("DELETE from vendor where vendor_id=?",[id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
})

home_router.post("/register", (req, res) => {
  const key = req.body.key;
  const name = req.body.name;
  const number = req.body.number;
  const password = req.body.password;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "INSERT INTO `user` (`name`, `number`, `password`) VALUES (?,?, SHA1(?));",
      [name, number, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.post("/login", (req, res) => {
  const key = req.body.key;
  const number = req.body.number;
  const password = req.body.password;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * from `user` where `number`=? and `password`=sha1(?)",
      [number, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});





home_router.post("/get-order-count", (req, res) => {
    db.query(
      "SELECT count(*) as count,status FROM `orders` GROUP BY status",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
});

home_router.post("/admin-login", (req, res) => {
  const key = req.body.key;
  const number = req.body.number;
  const password = req.body.password;
  if (key === "7fbaf493e3fe38a48934d93a3168926018adb657") {
    db.query(
      "SELECT * from `admin` where `email`=? and `password`=sha1(?)",
      [number, password],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  } else {
    res.send("Invalid Key");
  }
});

home_router.get("/pay", (req, res) => {
 
});




export default home_router;
