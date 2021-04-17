import { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../actions/userAction';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { deleteUserById } from '../actions/userAction';
const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { error, loading, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo?.isAdmin) {
            return dispatch(getUserList());
        }
        if (!userInfo && !userInfo?.isAdmin) {
            history.push('/login');
        }
    }, [dispatch, history, userInfo, success]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteUserById(id));
        }
    };
    return (
        <>
            <h1>Users</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger' />
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}> {user.email}</a>
                                </td>
                                <td className='text-center'>
                                    {user.isAdmin ? (
                                        <i className='fas fa-check' style={{ color: 'green' }} />
                                    ) : (
                                        <i className='fas fa-times' style={{ color: 'red' }} />
                                    )}
                                </td>
                                <td className='text-center'>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit' />
                                        </Button>
                                    </LinkContainer>
                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => deleteHandler(user._id)}>
                                        <i className='fas fa-trash' />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;
