import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';

function Profile(props) {
    const [heroImage, setHeroImage] = useState(null);

    // get hero image from database
    async function getHeroImage() {
        let response = await props.getData('post', 'get_hero_image', { 'heroName': props.heroName });
        setHeroImage(response.data[0]['image_url']);
    }

    // get hero info from database
    // async function getHeroInfo() {}

    // check the db and update the page whenever there's a change
    // with useEffect
    useEffect(() => {
        getHeroImage();
    })

    // change hero info in the heroes table
    async function updateHero(field, value) {
        let response = await props.getData('post', 'update_hero',
            {
                'userName': props.userName,
                field,
                value
            });
        console.log(response);
    }

    // change hero image in the heroes table
    async function updateHeroImage() {
        var url = prompt('please enter the link to your new image');
        await updateHero('image_url', url);
        getHeroImage();
    }

    return (
        <Row>
            <Col sm='3'>
                <img
                    className='img-fluid'
                    alt="user profile picture"
                    src={heroImage || "https://images.unsplash.com/photo-1483879504681-c0196ecceda5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"}></img>
                <Button onClick={() => updateHeroImage()}>change pic!</Button>
            </Col>
            <Col sm='9'>
                <h1>{props.heroName}</h1>
            </Col>
        </Row>
    )
}

export default Profile;