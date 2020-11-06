import { Navbar, Row, Col, Button } from 'reactstrap';

function Nav(props) {
    // function to view current user's profile
    function viewMyProfile() {
        props.setHeroName(props.userName);
        props.setView('profile');
    }
    
    // function to log out current user
    function logOut() {
        props.setUserName('');
        props.setHeroName('');
        props.setView('login');
    }

    return (
        <Navbar
            fixed='true'>
            <Row>
                <Col xs='4'>
                    <Button onClick={() => viewMyProfile()}>
                        my profile
                    </Button>
                </Col>
                <Col xs='4'>
                    <Button onClick={() => props.setView('allHeroes')}>
                        all heroes
                    </Button>
                </Col>
                <Col xs='4'>
                    <Button onClick={() => logOut()}>
                        log out
                    </Button>
                </Col>
            </Row>
        </Navbar>
    )
}

export default Nav;