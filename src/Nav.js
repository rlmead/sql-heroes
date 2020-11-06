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

    // function to delete user's account
    // and go back to login page
    async function deleteUser() {
        await props.getData('post', 'delete_user', { 'userName': props.userName });
        props.setView('login');
    }

    return (
        <Navbar
            fixed='true'
        >
            <Row>
                <Col xs='3'>
                    <Button onClick={() => viewMyProfile()}>
                        view my profile
                    </Button>
                </Col>
                <Col xs='3'>
                    <Button onClick={() => props.setView('allHeroes')}>
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
                        delete my account
                    </Button>
                </Col>
            </Row>
        </Navbar>
    )
}

export default Nav;