import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { useEffect } from "react";



const inter = Inter({ subsets: ["latin"] });

const list = {
  "page": 1,
  "pageSize": 10,
  "totalProducts": 10,
  "products": [
      {
          "productName": "Phone 11",
          "price": 6562,
          "rating": 4.83,
          "discount": 26,
          "availability": "yes",
          "productId": 1
      },
      {
          "productName": "Phone 13",
          "price": 4794,
          "rating": 4.6,
          "discount": 34,
          "availability": "yes",
          "productId": 2
      },
      {
          "productName": "Phone 4",
          "price": 5906,
          "rating": 4.41,
          "discount": 79,
          "availability": "out-of-stock",
          "productId": 3
      },
      {
          "productName": "Phone 4",
          "price": 7009,
          "rating": 4.41,
          "discount": 98,
          "availability": "yes",
          "productId": 4
      },
      {
          "productName": "Phone 4",
          "price": 2139,
          "rating": 4.1,
          "discount": 64,
          "availability": "yes",
          "productId": 5
      },
      {
          "productName": "Phone 7",
          "price": 1951,
          "rating": 3.61,
          "discount": 14,
          "availability": "yes",
          "productId": 6
      },
      {
          "productName": "Phone 1",
          "price": 9013,
          "rating": 3.47,
          "discount": 72,
          "availability": "yes",
          "productId": 7
      },
      {
          "productName": "Phone 12",
          "price": 3812,
          "rating": 2.91,
          "discount": 9,
          "availability": "yes",
          "productId": 8
      },
      {
          "productName": "Phone 7",
          "price": 1184,
          "rating": 2.89,
          "discount": 62,
          "availability": "out-of-stock",
          "productId": 9
      },
      {
          "productName": "Phone 1",
          "price": 4931,
          "rating": 2.8,
          "discount": 67,
          "availability": "out-of-stock",
          "productId": 10
      }
  ]
}

const Search = async()=>{
  try {
    const response = await axios.get(`http://localhost:3000/categories/Phone/products`, {
      companyname : "AMZ",
    });
    console.log(response.data);
   
  } catch (error) {
    console.error('Error', error);
  }
  
}


export default function Home() {
  
  const [products, setProducts] = useState(list.products);

  const sortProducts = (criterion: string) => {
    let sortedProducts: SetStateAction<{ productName: string; price: number; rating: number; discount: number; availability: string; productId: number; }[]> = [];
    if (criterion === 'price') {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else if (criterion === 'rating') {
      sortedProducts = [...products].sort((a, b) => b.rating - a.rating);
    }
    setProducts(sortedProducts);
  };

  
  useEffect(() => {
    sortProducts('price'); 
  }, []);


  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
  };

  const titleStyle = {
    fontSize: '2rem',
    color: '#333',
    marginBottom: '20px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const listItemStyle = {
    border: '1px solid #ddd',
    marginTop: '-1px',
    backgroundColor: 'black',
    padding: '12px',
    textAlign: 'left',

  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Products Page</h1>
      <button style={buttonStyle} onClick={() => sortProducts('price')}>Sort by Price</button>
      <button style={buttonStyle} onClick={() => sortProducts('rating')}>Sort by Rating</button>
      <button style={buttonStyle} onClick={() => Search()}>Search</button>
      <ul style={listStyle}>
        {products.map((product) => (
          <li key={product.productId} style={listItemStyle}>
            <h2>{product.productName}</h2>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating} Stars</p>
            <p>Discount: {product.discount}%</p>
            <p>Availability: {product.availability === "yes" ? "In stock" : "Out of stock"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

