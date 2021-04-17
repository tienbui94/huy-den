import Header from './components/Header';
import Footer from './components/Footer';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { publicRoute, privateRoute } from './routers';
import { Route } from 'react-router-dom';
const App = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const adminRoute = [...publicRoute, ...privateRoute];
    return (
        <>
            <Header />
            <main className='py-3'>
                {userInfo?.isAdmin || userLogin ? (
                    <Container>
                        {adminRoute.map((route, index) => (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Container>
                ) : (
                    <Container>
                        {publicRoute.map((route, index) => (
                            <Route
                                exact
                                key={index}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Container>
                )}
            </main>
            <Footer />
        </>
    );
};

export default App;
