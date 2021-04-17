import { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetail = useSelector((state) => state.productDetail);
    const { error, loading, product } = productDetail;

    const productUpdate = useSelector((state) => state.productUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            history.push('/admin/product-list');
        } else {
            if (product?.name || product?._id !== productId) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product?.name);
                setPrice(product?.price);
                setImage(product?.image);
                setBrand(product?.brand);
                setCategory(product?.category);
                setCountInStock(product?.countInStock);
                setDescription(product?.description);
            }
        }
    }, [
        dispatch,
        productId,
        product?._id,
        product?.name,
        product?.price,
        product?.image,
        product?.brand,
        product?.category,
        product?.countInStock,
        product?.description,
        successUpdate,
        history
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

    const uploadHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            };

            const { data } = await axios.post('/api/upload', formData, config);
            setImage(data);
            setUploading(false);
        } catch (error) {
            console.log(error);
            setUploading(false);
        }
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
                        <Form.File
                            id='image-file'
                            label='Choose File'
                            custom
                            onChange={uploadHandler}>
                            {uploading && <Loader />}
                        </Form.File>

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
