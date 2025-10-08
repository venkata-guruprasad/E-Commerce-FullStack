import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = { items: [] };

function reducer(state, action) {
  switch(action.type){
    case 'ADD':
      {
        const exists = state.items.find(i => i.id === action.payload.id);
        if(exists){
          return {
            ...state,
            items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: i.qty + (action.payload.qty || 1) } : i)
          };
        }
        return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] };
      }
    case 'REMOVE':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) };
    case 'UPDATE_QTY':
      return { ...state, items: state.items.map(i => i.id === action.payload.id ? { ...i, qty: action.payload.qty } : i) };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, initialState);
  const add = (product, qty=1) => dispatch({ type: 'ADD', payload: { ...product, qty }});
  const remove = id => dispatch({ type: 'REMOVE', payload: id});
  const updateQty = (id, qty) => dispatch({ type: 'UPDATE_QTY', payload: { id, qty } });
  const clear = () => dispatch({ type: 'CLEAR' });
  const total = state.items.reduce((s,i)=> s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, add, remove, updateQty, clear, total }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){
  return useContext(CartContext);
}
