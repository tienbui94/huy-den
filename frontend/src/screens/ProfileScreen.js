import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { listMyOrders } from '../actions/orderAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { formatDateTime } from '../utils';
const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userDetail = useSelector((state) => state.userDetail);
    const { error, loading, user } = userDetail;

    const orderListMy = useSelector((state) => state.orderListMy);
    const { error: errorOrders, loading: loadingOrders, orders } = orderListMy;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    useEffect(() => {
        if (!userInfo) {
            history.push('/login');
        } else {
            if (!user || !user?.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET });
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [history, user, dispatch, userInfo, success]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password do not match');
        } else {
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({ id: user._id, name, email, password }));
        }
    };

    const detailOrderHandler = (e, id) => {
        history.push(`/order/${id}`);
    };

    return (
        <>
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {message && <Message variant='danger'>{message}</Message>}
                    {error && <Message variant='danger'>{error}</Message>}
                    {success && <Message variant='success'>Profile Updated</Message>}
                    {loading ? (
                        <Loader />
                    ) : (
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type='password'
                                    placeholder='Enter confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }></Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                    )}
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <Table striped bordered hover responsive className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order?._id}>
                                        <td>{formatDateTime(order?.createdAt)}</td>
                                        <td>
                                            {order?.isPaid ? (
                                                formatDateTime(order?.paidAt)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>{order?.totalPrice}</td>
                                        <td>
                                            {order?.isPaid ? (
                                                formatDateTime(order?.paidAt)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {order?.isDelivered ? (
                                                formatDateTime(order?.deliveredAt)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                type='button'
                                                className='btn-block btn-sm'
                                                variant='dark'
                                                onClick={(e) => detailOrderHandler(e, order?._id)}>
                                                DETAILS
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
};

export default ProfileScreen;
