const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload),
    };
  }
  // if (action.type === "INCREASE") {
  //   let tempCart = state.cart.map(cartItem => {
  //     if (cartItem.id === action.payload) {
  //       return { ...cartItem, amount: cartItem.amount + 1git };
  //     }
  //     return cartItem;
  //   });
  //   return {
  //     ...state,
  //     cart: tempCart,
  //   };
  // }
  // if (action.type === "DECREASE") {
  //   let tempCart = state.cart
  //     .map(cartItem => {
  //       if (cartItem.id === action.payload) {
  //         return { ...cartItem, amount: cartItem.amount - 1 };
  //       }
  //       return cartItem;
  //     })
  //     .filter(cartItem => cartItem.amount !== 0);
  //   return {
  //     ...state,
  //     cart: tempCart,
  //   };
  // }
  if (action.type === "GET_TOTALS") {
    let { total, allAmount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.allAmount += amount;
        cartTotal.total += price * amount;
        return cartTotal;
      },
      { total: 0, allAmount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, allAmount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    let tempCart = state.cart
      .map(cartItem => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.type === "inc") {
            return { ...cartItem, amount: cartItem.amount + 1 };
          }
          if (action.payload.type === "dec") {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
        }
        return cartItem;
      })
      .filter(cartItem => cartItem.amount !== 0);
    return { ...state, cart: tempCart };
  }
  throw new Error("no matching action type");
};

export default reducer;
