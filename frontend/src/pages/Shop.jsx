import { useState, useEffect } from "react";
import Cart from "../components/Cart/Cart";
import Card from "../components/Card/Card1";
import axios from "axios";

import './Shop.css';

// const baseUrl = "https://konvergentgroup.com/braek"
const baseUrl = "http://localhost:5000"

// destructure data imported from db to getData
// const { getData } = require("./db/db");
//returned from getData is instantiated in foods obj
// const food = getData();

// const tele = window.Telegram.WebApp;

function Shop() {
  // initialize state of cart items
  const [cartItems, setCartItems] = useState([]);
  const [productsList, setProductsList] = useState([]);

  const fetchProducts = async () => {
    const data = await axios.get(`${baseUrl}/products`, { mode: 'cors' });
    const { products } = data.data
    setProductsList(products);
    console.log('products:', products)
  }

  useEffect(() => {
    fetchProducts();
  },[])

  // turn on the telegram app when mounted
//   useEffect(() => {
//     tele.ready();
//   });

  // onAdd is passed food obj
  const onAdd = (productsList) => {
    // exist obj is returned fm find() that checks if x.id matches food.id passed
    const exist = cartItems.find((x) => x.id === productsList.id);
    if (exist) {
      // increment exist.quantity += 1
      setCartItems(
        cartItems.map((x) =>
          x.id === productsList.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      );
    }
    else {
      // init exist.quantity == 1
      setCartItems([...cartItems, { ...productsList, quantity: 1 }]);
    }
  };
  // reverse of onAdd()
  const onRemove = (productsList) => {
    const exist = cartItems.find((x) => x.id === productsList.id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(x => x.id !== productsList.id));
      console.log('remove:', productsList.id)
    } else {
      setCartItems(
        cartItems.map(x =>
          x.id === productsList.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };
  
  // sets MainButton.text && shows MainButton
//   const onCheckout = () => {
//     tele.MainButton.text = "Pay : )";
//     tele.MainButton.show();
//   };

  //TODO: Need to set MainButton.onClick() to call tele.sendInvoice()
  // console.log('cart items:', cartItems)
  const onCheckout = async () => {
    await fetch('http://localhost:4000/checkout', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ items: cartItems })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.url) {
        window.location.assign(response.url);
    }
  })
}

  return (
    <div className="shop">
      <h1 className='heading'>Braek Shop</h1>
      {/* props mtds passed from App to Cart component */}
      <Cart cartItems={cartItems}
        onCheckout={onCheckout} 
      /> 
      
      <div className='cards__container'>
        {/* mapping each food item to a card */}
          {productsList.map(
            (product) => {
              return (
                <Card key={product.id} product={product}  onAdd={onAdd} onRemove={onRemove} />
              );
          })}
        </div>
    </div>
  );
}

export default Shop;
// Good references
// https://prog.world/creation-of-telegram-web-apps-and-interaction-with-them-in-telegram-bots/

