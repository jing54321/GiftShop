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
import {productDetailsReducer} from './reducers/productDetailsReducer'
import {cartReducer} from './reducers/cartReducer'
import {composeWithDevTools} from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducer'
 
const reducer = combineReducers({
  productList : productListReducer,
  productDetails : productDetailsReducer,
  cart: cartReducer,
  userLogin:userLoginReducer,
  userRegister : userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile:userUpdateProfileReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[];

const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const initialState = {
  cart : {cartItems:cartItemsFromStorage},
  userLogin : { userInfo:userInfoFromStorage}
}
 
const middleWare = [thunk]
 
const store = createStore(
  reducer, initialState, composeWithDevTools(
    applyMiddleware(...middleWare)
  )
)


export default store