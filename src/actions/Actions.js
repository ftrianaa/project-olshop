export const LoginUser = (dispatch, payloadLogin) => {
  dispatch({
    type: 'SUCCESS_LOGIN',
    user: payloadLogin,
  });
  localStorage.setItem('user', JSON.stringify(payloadLogin));
};
//^ itu di atas semua action, isinya type dan payload
export const LogoutUser = dispatch => {
  dispatch({
    type: 'LOGOUT',
  });
  localStorage.setItem('user', JSON.stringify(''));
  // localStorage.setItem('cart', JSON.stringify([]));
};

export const AddCart = (dispatch, payloadCart) => {
  // console.log(payloadCart, "ini Add Cart ACtion");
  dispatch({
    type: 'ADD_CART',
    cart: payloadCart,
    // cart: {
    //     name: payloadCart.name,
    //     quantity: payloadCart.quantity
    // }
  });
  // console.log(payloadCart, "ini Add Cart setelah ACtion");

  localStorage.setItem('cart', JSON.stringify(payloadCart));

  // console.log(payloproductdCart, "ini setelah set");
  return payloadCart;
};

export const Checkout = dispatch => {
  dispatch({
    type: 'CHECKOUT_CART',
  });
  localStorage.setItem('cart', JSON.stringify([]));
};

export const SignUp = (dispatch, payloadSignUp) => {
  const userData = {
    email: payloadSignUp.email,
    name: payloadSignUp.name,
    birthdate: payloadSignUp.birthdate,
  };
  dispatch({
    type: 'SIGN_UP',
    payload: payloadSignUp,
  });
  localStorage.setItem('user', JSON.stringify(userData));
};

export const AddPromo = (dispatch, payloadDiscount) => {
  // console.log(payloadDiscount, 'ini discount di actionss');
  dispatch({
    type: 'ADD_PROMO',
    discount: payloadDiscount,
  });
};
