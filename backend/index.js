const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const getProductsEndPoint = "http://20.244.56.144/test/companies/AMZ/categories/Phone/products?top=n&minPrice=p&maxPrice=q";

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

const exampleResponse = [
  {
      "productName": "Phone 11",
      "price": 6562,
      "rating": 4.89,
      "discount": 26,
      "availability": "yes"
  },
  {
      "productName": "Phone 12",
      "price": 3812,
      "rating": 4.19,
      "discount": 9,
      "availability": "yes"
  },
  {
      "productName": "Phone 14",
      "price": 8598,
      "rating": 4.18,
      "discount": 40,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 13",
      "price": 4794,
      "rating": 3.75,
      "discount": 34,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 4",
      "price": 2139,
      "rating": 3.73,
      "discount": 64,
      "availability": "yes"
  },
  {
      "productName": "Phone 4",
      "price": 7009,
      "rating": 3.69,
      "discount": 98,
      "availability": "yes"
  },
  {
      "productName": "Phone 12",
      "price": 5495,
      "rating": 3.39,
      "discount": 38,
      "availability": "yes"
  },
  {
      "productName": "Phone 11",
      "price": 9217,
      "rating": 3.14,
      "discount": 54,
      "availability": "out-of-stock"
  },
  {
      "productName": "Phone 7",
      "price": 1184,
      "rating": 2.95,
      "discount": 62,
      "availability": "yes"
  },
  {
      "productName": "Phone 1",
      "price": 9013,
      "rating": 2.63,
      "discount": 72,
      "availability": "yes"
  }
]

app.get("/categories/:categoryname/products", async (req, res) => {
  const n = parseInt(req.query.n, 10); 
  const page = parseInt(req.query.page || '1', 10); 
  const companyname = req.query.companyname;
  const categoryname = req.params.categoryname;
  const getProductsEndPoint = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=99999`;

  try {
    const response = await axios.get(getProductsEndPoint, {
      headers: {
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU0MDU4LCJpYXQiOjE3MTIxNTM3NTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImM2NDM2MDZjLTlmNTEtNDYyNy04MDIwLTQ5MGZmNDQzMjU5YSIsInN1YiI6ImFzMTQ1MEBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJjNjQzNjA2Yy05ZjUxLTQ2MjctODAyMC00OTBmZjQ0MzI1OWEiLCJjbGllbnRTZWNyZXQiOiJ5UU9JTUFlRFVFYlVueGR2Iiwib3duZXJOYW1lIjoiQW5hbnlhIE5pZ2FtIiwib3duZXJFbWFpbCI6ImFzMTQ1MEBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDAzMDEwOTk0In0.PGJTuneXi9gHGSpjOUXiAZnOqhjL18PQ0MptZGMBdA4" 
      }
    });

    if (response.data && Array.isArray(response.data)) {
      
      const productsWithId = response.data.map((product, index) => ({
        ...product,
        productId: index + 1 + (page - 1) * n 
      }));

      const paginatedProducts = productsWithId.slice((page - 1) * n, page * n);
      
      res.json({
        page,
        pageSize: n,
        totalProducts: productsWithId.length,
        products: paginatedProducts
      });
    } else {
      res.status(404).send('No products found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.get("/categories/:categoryname/products/:productid", async (req, res) => {
  const categoryname = req.params.categoryname;
  const productid = req.params.productid;
  console.log(categoryname);
  console.log(productid);
});


app.listen(port, () =>
  console.log(`Server is listeniing ${port}!`),
);