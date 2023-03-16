let user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : '';
let cart = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : [];

export const initialState = {
  user: '' || user,
  isLogin: false,
  cart: [] || cart,
};

export const AuthReducer = (initialState, action) => {
  // console.log(action, 'ini actionnss');
  switch (action.type) {
    case 'SUCCESS_LOGIN':
      return {
        ...initialState,
        user: action.user,
        isLogin: true,
      };
    case 'FAILED_LOGIN':
      return {
        ...initialState,
        user: action.payload,
        isLogin: false,
      };
    case 'LOGOUT':
      return {
        user: '',
        isLogin: false,
        cart: [],
      };
    case 'ADD_CART':
      // console.log(action.cart, 'ini aksi di reducer')
      // console.log(action.cart, 'ini aksi kart di reducer')
      // console.log(action.cart.name, 'ini aksi kart name di reducer')
      // const item = action.cart.find(product => action.cart.name === )
      return {
        ...initialState,
        cart: action.cart,
      };
    case 'CHECKOUT_CART':
      return {
        ...initialState,
        cart: [],
      };
    case 'SIGN_UP':
      //   console.log(action, 'ini actionsss');
      return {
        ...initialState,
        isLogin: true,
        user: action.payload,
      };
    default:
      return {
        user: '',
        isLogin: false,
        cart: [],
      };
  }
};
