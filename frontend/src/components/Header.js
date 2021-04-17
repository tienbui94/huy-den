import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction';
import SearchBox from './SearchBox';
const Header = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const dispatch = useDispatch();

    const { userInfo } = userLogin;

    const logOutHandler = () => {
        dispatch(logout());
    };
    return (
        <header>
            <Navbar bg='dark' variant='dark' collapseOnSelect expand='lg'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>Huy Shop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Route render={({ history }) => <SearchBox history={history} />} />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ml-auto'>
                            
                            <LinkContainer to='/carts'>
                                <Nav.Link>
                                    <i className='fas fa-shopping-cart' /> CART
                                </Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logOutHandler}>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <i className='fas fa-user' /> SIGN IN
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='MANAGEMENT' id='basic-nav-dropdown admin-menu'>
                                <LinkContainer to='/admin/user-list'>
                                    <NavDropdown.Item>User List</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/product-list'>
                                    <NavDropdown.Item>Product List</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/order-list'>
                                    <NavDropdown.Item>Order List</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
