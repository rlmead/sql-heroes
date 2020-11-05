import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';

function Profile(props) {
    const [heroImage, setHeroImage] = useState(null);
    const [heroAboutMe, setHeroAboutMe] = useState(null);
    const [heroBio, setHeroBio] = useState(null);

    // get hero image from database
    async function getHeroImage() {
        let response = await props.getData('post', 'get_hero_data',
        { 'heroName': props.heroName,
            'field': 'image_url' });
        setHeroImage(response.data[0]['image_url']);
    }

    // get hero about_me from heroes table
    async function getHeroAboutMe() {
        let response = await props.getData('post', 'get_hero_data',
        { 'heroName': props.heroName,
            'field': 'about_me' });
        setHeroAboutMe(response.data[0]['about_me']);
    }
    
    // get hero bio from heroes table
    async function getHeroBio() {
        let response = await props.getData('post', 'get_hero_data',
        { 'heroName': props.heroName,
            'field': 'biography' });
        setHeroBio(response.data[0]['biography']);
    }

    // check the db and update the page whenever there's a change
    // with useEffect
    useEffect(() => {
        getHeroImage();
        getHeroAboutMe();
        getHeroBio();
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

    // change hero image in the heroes table
    async function updateUserImage() {
        var url = prompt('please enter the link to your new image');
        await updateUser('image_url', url);
        getHeroImage();
    }

    return (
        <Row>
            <Col sm='3'>
                <img
                    className='img-fluid'
                    src={heroImage || "https://images.unsplash.com/photo-1483879504681-c0196ecceda5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"}></img>
                <Button onClick={() => updateUserImage()}>change pic!</Button>
            </Col>
            <Col sm='9'>
                <h1>{props.heroName}</h1>
                <h3>about me</h3>
                <p>{heroAboutMe}</p>
                <h3>bio</h3>
                <p>{heroBio}</p>
            </Col>
        </Row>
    )
}

export default Profile;