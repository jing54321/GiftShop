/*
import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {productListReducer} from './reducers/productReducer'

const reducers = {
  productList : productListReducer,
}
const initialState = {}
const middleware = [thunk]

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: middleware
}) 

//reference : https://cloudsek.com/how-to-progressively-migrate-to-redux-toolkit/
*/
//old version....
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {productListReducer} from './reducers/productListReducer'
import {productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer} from './reducers/productDetailsReducer'
import {cartReducer} from './reducers/cartReducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer,userListReducer,userDeleteReducer,userUpdateReducer } from './reducers/userReducer';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducers'
 
const reducer = combineReducers({
  productList : productListReducer,
  productDetails : productDetailsReducer,
  productCreate : productCreateReducer,
  productDelete : productDeleteReducer,
  productUpdate : productUpdateReducer,
  cart: cartReducer,
  userLogin:userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer,
  userList:userListReducer,
  userDelete:userDeleteReducer,
  userUpdate:userUpdateReducer,
  orderCreate:orderCreateReducer,//front-end -> backend
  orderDetails:orderDetailsReducer,
  orderPay : orderPayReducer,
  orderListMy:orderListMyReducer
})
//
const cartItemsFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{};

const initialState = {
  cart : {
    cartItems:cartItemsFromStorage, 
    shippingAddress:shippingAddressFromStorage
  },
  userLogin : {userInfo:userInfoFromStorage}
}
 
const middleWare = [thunk]
 
const store = createStore(
  reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleWare)
  )
)


export default store