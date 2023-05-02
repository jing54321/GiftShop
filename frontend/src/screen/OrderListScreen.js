import React, {useEffect} from 'react';
import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message';
import Meta from '../components/Meta';
import Loader from '../components/Loader';
import {getAllOrders} from '../actions/orderActions';
import {useNavigate} from 'react-router-dom';

const OrderListScreen = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const orderList = useSelector(state => state.orderListAll);
    const {error, loading, orders} = orderList;
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const dollarCanadaLocale = Intl.NumberFormat('en-CA');
    
    useEffect(() => {
        if(userInfo&&userInfo.isAdmin) {

            dispatch(getAllOrders())

        } else {

            navigate('/login')
        }
        
    },[dispatch, navigate, userInfo])

    
  return (
    <>
      <Meta title='Order List'/>
      <h2>Orders</h2>
      {loading? <Loader/> : error? <Message variant='danger'>{error}</Message> : (
        <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr className='text-center'>
                    <th>ID</th>
                    <th>USER</th>
                    <th>Total Amount</th>
                    <th>Delivered</th>
                    <th>Paid</th>
                    <th>Paid Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => <tr key={order._id} className='text-center'>
                    <td>{order._id}</td>
                    <td>{order.user.name}</td>
                    <td>${dollarCanadaLocale.format(order.totalPrice)}</td>
                    <td>{order.isDelivered? (<i className="fas fa-check" style={{color:'green'}}></i>):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                    <td>{order.isPaid? (<i className="fas fa-check" style={{color:'green'}}></i>):(<i className="fas fa-times" style={{color:'red'}}></i>)}</td>
                    <td>{order.paidAt.substring(0,10)}</td>
                    <td>
                        <LinkContainer to={`/orders/${order._id}`}>
                            <Button variant='info' className='btn-sm me-1'>
                                Details
                            </Button>
                        </LinkContainer>
                    </td>
                    
                </tr>)}
            </tbody>
        </Table>
      )}
      
    </>
  )
}

export default OrderListScreen
