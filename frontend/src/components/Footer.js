import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center'>Copyright &copy; Thi Nguyen</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
