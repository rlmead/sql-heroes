import { Navbar, Row, Col, Button } from 'reactstrap';

function Nav(props) {
    // function to log out current user
    function logOut() {
        props.setUserName('');
        props.setView('login');
    }

    // function to delete user's account
    // and go back to login page
    async function deleteUser() {
        await props.getData('post', 'delete_user', { 'userName': props.userName });
        props.setView('login');
    }

    return (
        <Navbar
            fixed
        >
            <Row>
                <Col xs='3'>
                    <Button>
                        my account
                    </Button>
                </Col>
                <Col xs='3'>
                    <Button>
                        all heroes
                    </Button>
                </Col>
                <Col xs='3'>
                    <Button onClick={() => logOut()}>
                        log out
                    </Button>
                </Col>
                <Col xs='3'>
                    <Button
                        onClick={() => deleteUser()}>
                        delete account
                    </Button>
                </Col>
            </Row>
        </Navbar>
    )
}

export default Nav;