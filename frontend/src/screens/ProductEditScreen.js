import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails, updateProduct } from '../actions/productAction';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';
const ProductEditScreen = ({ history, match }) => {
    const productId = match.params.id;
    const productDetail = useSelector((state) => state.productDetail);
    const { error, loading, product } = productDetail;
    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || 0);
    const [image, setImage] = useState(product?.image || '');
    const [brand, setBrand] = useState(product?.brand || '');
    const [category, setCategory] = useState(product?.category || '');
    const [countInStock, setCountInStock] = useState(product?.countInStock || 0);
    const [description, setDescription] = useState( product?.description || '');

    const dispatch = useDispatch();



    const productUpdate = useSelector((state) => state.productUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
           return [dispatch({ type: PRODUCT_UPDATE_RESET }),
            history.push('/admin/product-list')]
        }

        if (product?.name || product?._id !== productId) {
            return dispatch(listProductDetails(productId));
        }
       },[
        dispatch,
        productId,
        product,
        history,
        successUpdate,
        ]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            })
        );
    };

    return (
        <>
            <Link to='/admin/product-list' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}{' '}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
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
                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter Price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                label='Enter Img Url'
                                value={image}
                                checked={image}
                                onChange={(e) => setImage(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type='text'
                                label='Enter Brand'
                                value={brand}
                                checked={brand}
                                onChange={(e) => setBrand(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>CountInStock</Form.Label>
                            <Form.Control
                                type='number'
                                label='Enter CountInStock'
                                value={countInStock}
                                checked={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type='text'
                                label='Enter Category'
                                value={category}
                                checked={category}
                                onChange={(e) => setCategory(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                label='Enter Description'
                                value={description}
                                checked={description}
                                onChange={(e) => setDescription(e.target.value)}></Form.Control>
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    );
};

export default ProductEditScreen;
