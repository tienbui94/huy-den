import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { formatDateTime } from '../utils';
const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector((state) => state.orderList);
    const { error, loading, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);

    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            history.push('/login');
        }
    }, [dispatch, history, userInfo]);

    return (
        <>
            <h1>Orders</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger' />
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{formatDateTime(order.createdAt)}</td>
                                <td>{order.totalPrice}</td>
                                <td className='text-center'>
                                    {order.isPaid ? (
                                        formatDateTime(order.paidAt)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td className='text-center'>
                                    {order.isDelivered ? (
                                        formatDateTime(order.deliveredAt)
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td className='text-center'>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button variant='dark' className='btn-sm'>
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default OrderListScreen;
