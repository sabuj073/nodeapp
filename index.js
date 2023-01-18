import cors from "cors";
import express from "express";
import db from "./database.js";
import home_router from "./routes/main_home.js";

 //const hostname = "localhost";
const hostname = "128.199.16.23";
const port = "5000";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/main_home", home_router);

///////////////////Info////////////////////////////////
app.get("/getinfo", (req, res) => {
  db.query("SELECT * FROM `info`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
///////////////////Info////////////////////////////////

///////////////////Home1 Slider////////////////////////////////

app.post("/getSLider1", (req, res) => {
  const type = req.body.type;
  db.query("SELECT * FROM `slider1` where type=?", [type], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/send-customer-sms", (req, res) => {
  const name = req.body.name;
  const number = req.body.phone;
  const msg = req.body.message;
  console.log(req.body);
  db.query(
    "INSERT INTO `customer_sms` (`name`, `number`, `msg`) VALUES (?, ?, ?);",
    [name, number, msg],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

///////////////////Home1 Slider////////////////////////////////

///////////////////Meta Tag////////////////////////////////
app.post("/get-meta", (req, res) => {
  const type = req.body.type;
  db.query("SELECT * FROM meta_tag where page=?", [type], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
///////////////////Meta Tag////////////////////////////////

///////////////////Area Setup////////////////////////////////

///////////////////Distric////////////////////////////////

app.post("/get-district", (req, res) => {
  db.query("SELECT * FROM `district`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/get-total-order", (req, res) => {
  db.query("SELECT * FROM `orders`", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});


app.post("/get-new-order", (req, res) => {
  db.query("SELECT * FROM `orders` where status='Pending'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/get-picked-order", (req, res) => {
  db.query("SELECT * FROM `orders` where status='Picked Up'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/get-residual-order", (req, res) => {
  db.query("SELECT * FROM `orders` where status='Residual'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/get-cancel-order", (req, res) => {
  db.query("SELECT * FROM `orders` where status='Cancel'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/get-complete-order", (req, res) => {
  db.query("SELECT * FROM `orders` where status='Complete'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});




app.post("/create-district", (req, res) => {
  const name = req.body.name;
  const bn  = req.body.name_bn
  db.query(
    "INSERT INTO `district` (`district_name`,bn_district_name) VALUES (?,?)",
    [name,bn],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/delete-district", (req, res) => {
  const id = req.body.id;
  db.query(
    "DELETE FROM `district` WHERE district_id=?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/update-district", (req, res) => {
  const district_id = req.body.district_id;
  const district_name = req.body.district_name;
  const district_name_bn = req.body.district_name_bn;
  db.query(
    "UPDATE district set district_name=?,bn_district_name=? where district_id=?",
    [district_name,district_name_bn,district_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

///////////////////Distric////////////////////////////////

///////////////////Thana////////////////////////////////
app.post("/get-thana-area", (req, res) => {
  const type = req.body.type;
  db.query(
    "SELECT * FROM thana,district WHERE district.district_id = thana.district_id GROUP BY thana.thana_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/get-thana", (req, res) => {
  const type = req.body.type;
  db.query("SELECT * FROM thana where district_id=?", [type], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create-thana", (req, res) => {
  const district_id = req.body.district_id;
  const thana_name = req.body.thana_name;
  const thana_name_bn = req.body.thana_name_bn;
  db.query(
    "INSERT INTO `thana` (`district_id`, `thana_name`,bn_thana_name) VALUES (?,?,?);",
    [district_id, thana_name,thana_name_bn],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/delete-thana", (req, res) => {
  const thana_id = req.body.thana_id;
  db.query("DELETE FROM thana where thana_id=?", [thana_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/update-thana", (req, res) => {
  const thana_id = req.body.thana_id;
  const district_id = req.body.district_id;
  const thana_name = req.body.thana_name;
  const bn_thana_name = req.body.bn_thana_name;
  db.query(
    "UPDATE thana set district_id=?,thana_name=?,bn_thana_name=? where thana_id=?",
    [district_id, thana_name,bn_thana_name,thana_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

///////////////////Thana////////////////////////////////

///////////////////Area////////////////////////////////

app.post("/get-area", (req, res) => {
  const type = req.body.type;
  db.query("SELECT * FROM area where thana_id=?", [type], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/get-area-all", (req, res) => {
  const type = req.body.type;
  db.query(
    "SELECT * FROM `area`,thana,district WHERE area.thana_id = thana.thana_id and thana.district_id = district.district_id GROUP BY area.area_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-area", (req, res) => {
  const district_id = req.body.district_id;
  const thana_id = req.body.thana_id;
  const area_name = req.body.area_name;
  const category = req.body.category;
  const delivery_charge = req.body.delivery_charge;
  const over_delivery_fee = req.body.over_delivery_fee;
  const area_name_bengali = req.body.area_name_bengali;

  db.query(
    "INSERT INTO `area` (district_id,`thana_id`, `area_name`,categories,delivery_charge,over_delivery_charge,bn_area_name) VALUES (?,?,?,?,?,?,?);",
    [
      district_id,
      thana_id,
      area_name,
      category,
      delivery_charge,
      over_delivery_fee,
      area_name_bengali
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/create-category", (req, res) => {
  const categoryIcon = req.body.categoryIcon;
  const categoryImage = req.body.categoryImage;
  const category_name = req.body.category_name;
  const category_bangla = req.body.category_bangla;
  const slug = req.body.slug;
  const meta_title = req.body.meta_title;
  const meta_description = req.body.meta_description;
  const category_banner_1= req.body.category_banner_1;
  const category_banner_2= req.body.category_banner_2;
  const area_id = req.body.area_id;

  db.query(
    "INSERT INTO `category` (cat_icon,cat_image, `cat_title`,bn_cat_title,cat_slug,meta_title,meta_description,area_id,cat_banner,cat_banner_2) VALUES (?,?,?,?,?,?,?,?,?,?);",
    [
      categoryIcon,
      categoryImage,
      category_name,
      category_bangla,
      slug,
      meta_title,
      meta_description,
      area_id,
      category_banner_1,
      category_banner_2
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/delete-area", (req, res) => {
  const area_id = req.body.area_id;
  db.query("DELETE FROM area where area_id=?", [area_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/update-area", (req, res) => {
  const area_id = req.body.area_id;
  const district_id = req.body.district_id;
  const thana_id = req.body.thana_id;
  const area_name = req.body.area_name;
  const area_name_edit_bn = req.body.area_name_edit_bn;
	const delivery_charge_edit = req.body.delivery_charge_edit;
	const over_delivery_fee_edit = req.body.over_delivery_fee_edit;
  db.query(
    "UPDATE area set district_id=?,thana_id=?,area_name=?,bn_area_name=?,delivery_charge=?,over_delivery_charge=? where area_id=?",
    [district_id, thana_id, area_name,area_name_edit_bn,delivery_charge_edit,over_delivery_fee_edit,area_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});


// Category Wise Vendors
app.post("/get-vendors-by-category", (req, res) => {
  const cat_id = req.body.slug;
  db.query("SELECT * FROM `vendor_category`,vendor,category WHERE vendor_category.v_vendor_id=vendor.vendor_id and vendor_category.v_category_id=category.cat_id and category.cat_slug=?", [cat_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



// Category Wise Vendors

///////////////////Area////////////////////////////////

///////////////////Area Setup////////////////////////////////

app.listen(port, hostname, () => {
  console.log("Yey, your server is running on " + hostname + " port " + port);
});
