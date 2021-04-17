import UserListScreen from '../screens/UserListScreen';
import UserEditScreen from '../screens/UserEditScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductEditScreen from '../screens/ProductEditScreen';
import OrderListScreen from '../screens/OrderListScreen';

const privateRoutes = [
    {
        path: '/admin/user-list',
        component: UserListScreen
    },
    {
        path: '/admin/user/:id/edit',
        component: UserEditScreen
    },
    {
        path: '/admin/product-list',
        component: ProductListScreen
    },
    {
        path: '/admin/product-list/:pageNumber',
        component: ProductListScreen
    },
    {
        path: '/admin/product/:id/edit',
        component: ProductEditScreen
    },
    {
        path: '/admin/order-list',
        component: OrderListScreen
    }
];

export default privateRoutes;
