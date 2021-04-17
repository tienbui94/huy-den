import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            return history.push(`/search/${keyword}`);
        }
        return history.push(`/`);
    };
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                style={{width: '60vh'}}
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Find me!...'
                className='mr-sm-2 ml-sm-5'></Form.Control>
            <Button type='submit' variant='warning' className='p-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBox;
