import { useState, useReducer } from 'react';

const cartReducer = (state, action) => {

  switch (action.type) {
    // logica per aggiungere un prodotto
    case 'ADD_PRODUCT':
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_PRODUCT':
      // logica per rimuovere
      return state.filter((item) => {
        return item.name !== action.payload.name;
      });
    case 'UPDATE_QUANTITY_PLUS':
      return state.map((item) => {
        if (item.name === action.payload.name) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    case 'UPDATE_QUANTITY_MINUS':
      return state.map((item) => {
        if (item.name === action.payload.name) {
          const newQuantity = item.quantity - 1;
          if (newQuantity < 1) {
            return item; // non cambiare se diventerebbe < 1
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    default:
      return state;
  }

}

function App() {

  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const addedProducts = [];

  const [cart, dispatch] = useReducer(cartReducer, addedProducts);

  const totalPrice = cart.reduce((actualPrice, newItem) => {
    return actualPrice + (newItem.price * newItem.quantity);
  }, 0);

  return (
    <>
      <h1>Lista della spesa</h1>

      {products.map((product, index) => {
        return (
          <>
            <div key={index}>
              {product.name} - €{product.price.toFixed(2)}
            </div>
            <button onClick={() => dispatch({ type: 'ADD_PRODUCT', payload: product })}>aggiungi al carrello</button>
            <hr />
          </>
        )
      })}
      {cart.length === 0 && <p>Il carrello è vuoto</p>}
      <h2>Carrello</h2>
      {cart.map((item, index) => (
        <div key={item.name}>
          <div>
            {item.name} - €{item.price.toFixed(2)} x {item.quantity}
          </div>
          <button onClick={() => dispatch({ type: 'REMOVE_PRODUCT', payload: item })}>rimuovi dal carrello</button>
          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY_PLUS', payload: item })}>+</button>
          <button onClick={() => dispatch({ type: 'UPDATE_QUANTITY_MINUS', payload: item })}>-</button>
          <hr />
        </div>
      ))}
      <div>Totale da pagare: €{totalPrice.toFixed(2)}</div>

    </>
  )
}

export default App
