const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

const getProductsEndPoint = "http://20.244.56.144/test/companies/AMZ/categories/Phone/products?top=n&minPrice=p&maxPrice=q";

app.use(bodyParser.json());
app.use(cors());
const port = 3000;

let storedResponse;

app.get("/categories/:categoryname/products", async (req, res) => {
  const n = parseInt(req.query.n, 10); 
  const page = parseInt(req.query.page || '1', 10); 
  const companyname = req.query.companyname;
  const categoryname = req.params.categoryname;
  const getProductsEndPoint = `http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=99999`;

  try {
    const response = await axios.get(getProductsEndPoint, {
      headers: {
        'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTU4NDI1LCJpYXQiOjE3MTIxNTgxMjUsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImI3MTZlNTk2LTY0ZGEtNDE2OS05YjM0LWY1MmE1MjBkMGQ2NCIsInN1YiI6ImFzMTQ1MEBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiJiNzE2ZTU5Ni02NGRhLTQxNjktOWIzNC1mNTJhNTIwZDBkNjQiLCJjbGllbnRTZWNyZXQiOiJJTWlkcEdERXBVSXFTZEZnIiwib3duZXJOYW1lIjoiQW5hbnlhIE5pZ2FtIiwib3duZXJFbWFpbCI6ImFzMTQ1MEBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDAzMDEwOTk0In0.F1fyMaduesjsDSoG5vFrc9AGuFgMg7ys7lpwdwCLuXQ" 
      }
    });

    if (response.data && Array.isArray(response.data)) {
      
      const productsWithId = response.data.map((product, index) => ({
        ...product,
        productId: index + 1 + (page - 1) * n 
      }));

      const paginatedProducts = productsWithId.slice((page - 1) * n, page * n);
      storedResponse = paginatedProducts;
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
  console.log(storedResponse);
  const product = storedResponse.find(p => p.productId == Number(productid));

  if (product) {
    res.json(product);
  } else {
    res.status(404).send("Product not found");
  }
  console.log(categoryname);
  console.log(productid);
});



app.listen(port, () =>
  console.log(`Server is listeniing ${port}!`),
);