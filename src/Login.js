import { useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

function Login(props) {
    const [userNameExisting, setUserNameExisting] = useState('');
    const [userNameNew, setUserNameNew] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [biography, setBiography] = useState('');

    // make sure hero exists in heroes table before logging them in
    async function heroExistsLogin() {
        let response = await props.getData('post', 'hero_exists', { 'userName': userNameExisting });
        (response.data[0].hero_exists === '1')
            ? props.setView('profile')
            : alert('no such hero! please check your username or create a new account.');
    }

    // make sure hero doesn't exist in heroes table before creating new account
    async function heroExistsCreate() {
        let response = await props.getData('post', 'hero_exists', { 'userName': userNameNew });
        (response.data[0].hero_exists === '0')
            ? addHero()
            : alert('hero already exists! please choose a different username or log in.');
    }

    // add a new hero to the 
    async function addHero() {
        let response = await props.getData('post', 'add_hero',
        { 'userName': userNameNew,
            aboutMe,
            biography });
        console.log(response);
    }

    return (
        <Row>
            <Col sm='6'>
                <Input
                    type="text"
                    placeholder="existing username"
                    onChange={(e) => setUserNameExisting(e.target.value)}/>
                <Button
                    onClick={() => heroExistsLogin()}
                    disabled={userNameExisting.length === 0}>
                    log in!
                </Button>
            </Col>
            <Col sm='6'>
                <Input
                    type="text"
                    placeholder="new username"
                    onChange={(e) => setUserNameNew(e.target.value)}/>
                <Input
                    type="text"
                    placeholder="about you"
                    onChange={(e) => setAboutMe(e.target.value)}/>
                <Input
                    type="text"
                    placeholder="biography"
                    onChange={(e) => setBiography(e.target.value)}/>

                <Button
                    onClick={() => heroExistsCreate()}
                    disabled={userNameNew.length === 0 || aboutMe.length === 0 || biography.length === 0 }>
                    create account!
                </Button>

            </Col>
        </Row>
    )
}

export default Login;