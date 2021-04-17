import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShippingScreen from '../screens/ShippingScreen';
import PaymentScreen from '../screens/PaymentScreen';
import PlaceOrderScreen from '../screens/PlaceOrderScreen';
import OrderScreen from '../screens/OrderScreen';

const publicRoutes = [
    {
        path: '/',
        component: HomeScreen
    },
    {
        path: '/search/:keyword',
        component: HomeScreen
    },
    {
        path: '/page/:pageNumber',
        component: HomeScreen
    },
    {
        path: '/search/:keyword/page/:pageNumber',
        component: HomeScreen
    },
    {
        path: '/product/:id',
        component: ProductScreen
    },
    {
        path: '/login',
        component: LoginScreen
    },
    {
        path: '/register',
        component: RegisterScreen
    },
    {
        path: '/profile',
        component: ProfileScreen
    },
    {
        path: '/shipping',
        component: ShippingScreen
    },
    {
        path: '/payment',
        component: PaymentScreen
    },
    {
        path: '/place-order',
        component: PlaceOrderScreen
    },
    {
        path: '/order/:id',
        component: OrderScreen
    },
    {
        path: '/carts/:id?',
        component: CartScreen
    }
];

export default publicRoutes;
