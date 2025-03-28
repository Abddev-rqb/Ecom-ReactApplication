import './App.css'
import Product from './components/products/Product'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/shared/Navbar'
import About from './components/About'
import Contact from './components/Contact'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Cart from './components/cart/Cart'
import LogIn from './components/auth/LogIn'
import PrivateRoute from './components/PrivateRoute'
import Register from './components/auth/Register'
import Checkout from './components/checkout/Checkout'

function App() {
  return (
    <React.Fragment>
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Product />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/checkout" element={<Checkout />}/>

        <Route path="/" element={<PrivateRoute publicPage />}>
          <Route path="/login" element={<LogIn />}/>
          <Route path="/register" element={<Register />}/>
        </Route>
      </Routes>
    </Router>
    <Toaster position='bottom-center'/>
    </React.Fragment>
  )
}

export default App
