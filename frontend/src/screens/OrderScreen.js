import { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { Row, Col, Button, ListGroup, Image, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails, payOrder, deliveredOrder } from '../actions/orderAction';
import { addDecimals, formatDateTime } from '../utils';
import { ORDER_PAY_RESET, ORDER_DELIVERED_RESET } from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch();
    const orderId = match.params.id;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { success: successPay, loading: loadingPay } = orderPay;

    const orderDelivered = useSelector((state) => state.orderDelivered);
    const { success: successDeliver, loading: loadingDeliver } = orderDelivered;

    const [payPalSDKReady, setPayPalSDKReady] = useState(false);

    if (!loading) {
        //Calculate prices
        order.itemsPrice = addDecimals(
            order?.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        );
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        }
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            console.log(clientId, 'clientId');
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setPayPalSDKReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVERED_RESET });

            dispatch(getOrderDetails(orderId));
        } else if (!order?.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setPayPalSDKReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliveredHandler = () => {
        dispatch(deliveredOrder(order));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <p>
                                        <strong>Name: </strong> {order.user.name}{' '}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        <a href={`mailto:${order?.user?.email}`}>
                                            {order?.user?.email}
                                        </a>
                                    </p>
                                    <p>
                                        <strong>Address: </strong>
                                        {order?.shippingAddress?.address},{' '}
                                        {order?.shippingAddress?.city},{' '}
                                        {order?.shippingAddress?.postalCode},{' '}
                                        {order?.shippingAddress?.country}
                                    </p>
                                    {order.isDelivered ? (
                                        <Message variant='success'>
                                            Delivered on {formatDateTime(order.deliveredAt)}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Delivered</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <p>
                                        <strong>Method: </strong> {order.paymentMethod}
                                    </p>
                                    {order.isPaid ? (
                                        <Message variant='success'>
                                            Paid on {formatDateTime(order.paidAt)}
                                        </Message>
                                    ) : (
                                        <Message variant='danger'>Not Paid</Message>
                                    )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment Method</h2>
                                    <strong>Method: </strong>
                                    {order.paymentMethod}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Order Items</h2>
                                    {order.orderItems.length === 0 ? (
                                        <Message>Your cart is empty!</Message>
                                    ) : (
                                        <ListGroup variant='flush'>
                                            {order.orderItems.map((orderItem, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                            <Image
                                                                style={{ width: 100, height: 30 }}
                                                                src={orderItem.image}
                                                                alt={orderItem.name}
                                                                fluid
                                                                rounded
                                                            />
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                                to={`/products/${orderItem.product}`}>
                                                                {orderItem.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4}>
                                                            {orderItem.qty} x {orderItem.price} = $
                                                            {orderItem.qty * orderItem.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>
                                                ${addDecimals(order.shippingPrice)}{' '}
                                                <span style={{ color: 'green' }}>
                                                    {order.shippingPrice < 100 && 'FREESHIP'}
                                                </span>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${addDecimals(order.taxPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${addDecimals(order.totalPrice)}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {error && <Message variant='danger'>{error}</Message>}
                                    </ListGroup.Item>
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!payPalSDKReady ? (
                                                <Loader />
                                            ) : (
                                                <PayPalButton
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                    {loadingDeliver && <Loader />}
                                    {userInfo &&
                                        userInfo.isAdmin &&
                                        order.isPaid &&
                                        !order.isDelivered && (
                                            <ListGroup.Item>
                                                <Button
                                                    type='button'
                                                    className='btn btn-block'
                                                    onClick={deliveredHandler}>
                                                    Mark as Delivered
                                                </Button>
                                            </ListGroup.Item>
                                        )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};

export default OrderScreen;
