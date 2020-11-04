import { Row, Col, Button } from 'reactstrap';

function Profile(props) {
    return (
        <Row>
            <Col sm='3'>
                <img
                className='img-fluid'
                alt="hero standing on beam, backlit by the sun"
                src="https://images.unsplash.com/photo-1483879504681-c0196ecceda5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"></img>
            </Col>
            <Col sm='9'>
            <Button onClick={() => props.setView('login')}>log out!</Button>
            </Col>
        </Row>
    )
}

export default Profile;