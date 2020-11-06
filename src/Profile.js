import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';

function Profile(props) {
    // track state
    const [heroImage, setHeroImage] = useState(null);
    const [heroAboutMe, setHeroAboutMe] = useState(null);
    const [heroBio, setHeroBio] = useState(null);
    const [heroRelationship, setHeroRelationship] = useState(null);

    // track whether the user is currently looking at their own profile
    let myProfile = (props.heroName === props.userName);

    // get hero image from database
    async function getHeroImage() {
        let response = await props.getData('post', 'get_hero_data',
            {
                'heroName': props.heroName,
                'field': 'image_url'
            });
        setHeroImage(response.data[0]['image_url']);
    }

    // get hero about_me from heroes table
    async function getHeroAboutMe() {
        let response = await props.getData('post', 'get_hero_data',
            {
                'heroName': props.heroName,
                'field': 'about_me'
            });
        setHeroAboutMe(response.data[0]['about_me']);
    }

    // get hero bio from heroes table
    async function getHeroBio() {
        let response = await props.getData('post', 'get_hero_data',
            {
                'heroName': props.heroName,
                'field': 'biography'
            });
        setHeroBio(response.data[0]['biography']);
    }

    // get relationship between user and hero (only run when they differ)
    async function getRelationship() {
        let response = await props.getData('post', 'get_relationship',
            {
                'hero1': props.userName,
                'hero2': props.heroName
            });
        response.data.length > 0
        ? setHeroRelationship(response.data[0]['type_id'])
        : setHeroRelationship(null);
    }

    // update relationship between user and hero (only accessible when the two differ, and their relationship is defined)
    async function updateRelationship(relationshipType) {
        let response = await props.getData('post', 'update_relationship',
            {
                'userName': props.userName,
                'hero1': props.userName,
                'hero2': props.heroName,
                relationshipType
            });
        console.log(response);
    }

    // add relationship between user and hero (only accessible when the two differ, and their relationship is not defined)
    async function addRelationship(relationshipType) {
        let response = await props.getData('post', 'add_relationship',
            {
                'userName': props.userName,
                'hero1': props.userName,
                'hero2': props.heroName,
                relationshipType
            });
        console.log(response);
    }

    async function deleteRelationship() {
        let response = await props.getData('post', 'delete_relationship',
            {
                'userName': props.userName,
                'hero1': props.userName,
                'hero2': props.heroName
            });
        console.log(response);
    }

    // check the db and update the page whenever there's a change
    useEffect(() => {
        getHeroImage();
        getHeroAboutMe();
        getHeroBio();
        !myProfile && getRelationship();
    })

    // change hero info in the heroes table
    async function updateUser(field, value) {
        let response = await props.getData('post', 'update_user',
            {
                'userName': props.userName,
                field,
                value
            });
        console.log(response);
    }

    // function to change user's image in the heroes table
    async function updateUserImage() {
        var url = prompt('please enter the link to your new image');
        await updateUser('image_url', url);
        getHeroImage();
    }

    // function to delete user's account
    // and go back to login page
    async function deleteUser() {
        await props.getData('post', 'delete_user', { 'userName': props.userName });
        props.setView('login');
    }

    return (
        <Row>
            <Col sm='3'>
                <img
                    className='img-fluid'
                    src={heroImage || "https://images.unsplash.com/photo-1483879504681-c0196ecceda5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"}></img>
                {
                    myProfile &&
                    <Button onClick={() => updateUserImage()} className='mt-3'>change pic</Button>
                }
            </Col>
            <Col sm='9'>
                <h1>{myProfile ? 'my profile' : props.heroName}</h1>
                <h3>about</h3>
                <p>{heroAboutMe}</p>
                <h3>bio</h3>
                <p>{heroBio}</p>
                {
                    myProfile &&
                    <Button
                        onClick={() => deleteUser()}>
                        delete my account
                    </Button>
                }
                {
                    !myProfile &&
                    <>
                        <h3>relationship</h3>
                        <Row className='text-center'>
                            <Col
                                xs='4'>
                                <Button
                                className={heroRelationship === '2' && 'btn-danger'}
                                onClick={heroRelationship
                                    ? () => updateRelationship('2') 
                                    : () => addRelationship('2')}>
                                    enemy
                                </Button>
                            </Col>
                            <Col
                                xs='4'>
                                <Button
                                className={heroRelationship === '1' && 'btn-danger'}
                                onClick={heroRelationship
                                ? () => updateRelationship('1')
                                : () => addRelationship('1')}>
                                    friend
                                </Button>
                            </Col>
                            <Col
                                xs='4'>
                                <Button
                                className={!heroRelationship && 'btn-danger'}
                                onClick={() => deleteRelationship()}>
                                    unknown
                                </Button>
                            </Col>
                        </Row>
                    </>
                }
            </Col>
        </Row>
    )
}

export default Profile;