const CartReducer = (state, action) => {
 
  state.cart = state.cart || [];

  switch (action.type) {
  
    case "ADD_TO_CART":
      let { id, color, amount, product } = action.payload;
 
 
      let existingProduct = state.cart.find(
        (currentItem) => currentItem.id === id + color
      );
      if (existingProduct) {
        let updatedProduct = state.cart.map((currentElement) => {
          if (currentElement.id === id + color) {
            let newAmount = currentElement.amount + amount;
            if (newAmount >= currentElement.max) {
              newAmount = currentElement.max;
            }
            return {
              ...currentElement,
              amount: newAmount,
            };
          } else {
            return currentElement;
          }
        });
        return {
          ...state,
          cart: updatedProduct,
        };
      } else {
        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      }

  
    case "REMOVE_ITEM":
      let updatedCart = state.cart.filter(
        (currentElement) => currentElement.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCart,
      };
 
    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

   
    case "SET_DECREMENT":
      let updatedProductDecrement = state.cart.map((currentElement) => {
        if (currentElement.id === action.payload) {
          let decrementAmount = currentElement.amount - 1;
          if (decrementAmount <= 1) {
            decrementAmount = 1;
          }
          return {
            ...currentElement,
            amount: decrementAmount,
          };
        } else {
          return currentElement;
        }
      });
      return {
        ...state,
        cart: updatedProductDecrement,
      };

   
    case "SET_INCREMENT":
      let updatedProductIncrement = state.cart.map((currentElement) => {
        if (currentElement.id === action.payload) {
          let incrementAmount = currentElement.amount + 1;
          if (incrementAmount >= currentElement.max) {
            incrementAmount = currentElement.max;
          }
          return {
            ...currentElement,
            amount: incrementAmount,
          };
        } else {
          return currentElement;
        }
      });
      return {
        ...state,
        cart: updatedProductIncrement,
      };

   
    case "CART_ITEM_TOTAL_PRICE":
      let { total_item, total_price } = state.cart.reduce(
        (initialValue, currentElement) => {
          let { price, amount } = currentElement;
          initialValue.total_item += amount;
          initialValue.total_price += price * amount;
          return initialValue;
        },
        { total_item: 0, total_price: 0 }
      );
      return {
        ...state,
        total_item,
        total_price,
      };

    default:
      return state;
  }
};

export default CartReducer;
