import { useState } from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

function Login(props) {
    const [userNameExisting, setUserNameExisting] = useState('');
    const [userNameNew, setUserNameNew] = useState('');
    const [aboutMe, setAboutMe] = useState('');
    const [biography, setBiography] = useState('');

    // make sure hero exists in heroes table before logging them in
    async function heroLogin() {
        let response = await props.getData('post', 'hero_exists', { 'userName': userNameExisting });
        if (response.data[0].hero_exists === '1') {
            props.setUserName(userNameExisting);
            props.setHeroName(userNameExisting);
            props.setView('profile');
        } else {
            alert('no such hero! please check your username, or create a new account.');
        }
    }

    // add a new hero to the heroes table
    // then log the new user in
    async function addHero() {
        let result = await props.getData('post', 'add_hero',
        { 'userName': userNameNew,
        aboutMe,
        biography });
        props.setUserName(userNameNew);
        props.setHeroName(userNameNew)
        props.setView('profile');
    }
    
    // make sure hero doesn't exist in heroes table before creating new account
    async function heroCreate() {
        let response = await props.getData('post', 'hero_exists', { 'userName': userNameNew });
        (response.data[0].hero_exists === '0')
            ? addHero()
            : alert('hero already exists! please choose a different username, or log in.');
    }

    return (
        <Row>
            <Col sm='6'>
                <Input
                    type="text"
                    placeholder="existing username"
                    onChange={(e) => setUserNameExisting(e.target.value)}/>
                <Button
                    onClick={() => heroLogin()}
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
                    onClick={() => heroCreate()}
                    disabled={userNameNew.length === 0 || aboutMe.length === 0 || biography.length === 0 }>
                    create account!
                </Button>

            </Col>
        </Row>
    )
}

export default Login;