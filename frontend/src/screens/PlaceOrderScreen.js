import { useEffect } from 'react';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderAction';
import addDecimals from '../utils/addDecimals';
const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress, paymentMethod, cartItems } = cart;
    //Calculate prices
    cart.itemsPrice = addDecimals(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));

    //Calculate shipping
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

    //Calculate tax
    cart.taxPrice = addDecimals(Number(0.15 * cart.itemsPrice).toFixed(2));

    //Calculate total
    cart.totalPrice = addDecimals(
        Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
    );

    const orderCreate = useSelector((state) => state.orderCreate);
    const { order, success, error } = orderCreate;

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`);
        }
    }, [history, success, order]);
    const orderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cartItems,
                shippingAddress: shippingAddress,
                paymentMethod: paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            })
        );
    };
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {shippingAddress?.address}, {shippingAddress?.city},{' '}
                                {shippingAddress?.postalCode}, {shippingAddress?.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cartItems.length === 0 ? (
                                <Message>Your cart is empty!</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cartItems.map((cartItem, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        style={{ width: 100, height: 30 }}
                                                        src={cartItem.image}
                                                        alt={cartItem.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/products/${cartItem.product}`}>
                                                        {cartItem.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {cartItem.qty} x {cartItem.price} = $
                                                    {cartItem.qty * cartItem.price}
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>
                                        ${cart.shippingPrice}{' '}
                                        <span style={{ color: 'green' }}>
                                            {cart.shippingPrice < 100 && 'FREESHIP'}
                                        </span>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cartItems === 0}
                                    onClick={orderHandler}>
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
