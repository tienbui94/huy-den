import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Helmet from '../components/Helmet';
import Banner from '../components/Banner'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productAction';
import Paginate from '../components/Paginate';
const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products, pages, page } = productList;
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <>
            <Helmet />
            
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='error' />
            ) : (
                <>
                <Banner />
                    <Row>
                        {products.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xs={3}>
                                <Product item={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    );
};

export default HomeScreen;
