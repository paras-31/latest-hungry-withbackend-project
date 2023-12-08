import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from './components/Dashboard/Dashboard';
import Home from './pages/Home/Home';
import Enquiry from './pages/Enquiry/Enquiry'
import Page404 from './pages/Page404/Page404'
import Menu from './pages/Menu/Menu/ProductMenu.jsx';
import Auth from './pages/StepAuth/Auth/Auth'
import PrivateRoute from './components/Dashboard/PrivateRoute';
import Order from './pages/Order/Orders/orders'
import Cart from './pages/Cart/Cart/Cart';
import { updateCart } from './redux/actions/cart';
import { useSelector, useDispatch } from 'react-redux';
import Checkout from './pages/Checkout/Checkout.jsx'
import OrderDetails from './pages/Order/Orderdetails/orderDetails';

function App() {
  const { isAuth } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateCart())
  }, [isAuth])

  return (
    <Router>
      <Routes>
        <Route element={<Dashboard />}>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/enquiry' element={<Enquiry />} />
          <Route exact path='/menu' element={<Menu />} />
          <Route exact path='/login' element={<Auth />} />
          <Route exact path='/user/orders' element={<Order />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='checkout' element={<Checkout />} />
          <Route exact path='/order_details' element={<OrderDetails />} />
        </Route>

        <Route path={'*'} element={<Page404 />} />

      </Routes>
    </Router >
  );
}

export default App;
