import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ item }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/product/${item._id}`}>
                <Card.Img src={item.image} variant='top' />
            </a>
            <Card.Body>
                <a href={`/product/${item._id}`}>
                    <Card.Title as='div'>
                        <strong>{item.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as='div'>
                    <Rating color='red' value={item.rating} text={`${item.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='div'>${item.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;
