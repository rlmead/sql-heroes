import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

function AllHeroes(props) {
    const [allHeroData, setAllHeroData] = useState([]);

    // get all heroes' basic info from the heroes table
    async function getAllHeroes() {
        let response = await props.getData('post', 'get_all_heroes', { 'userName': props.userName });
        setAllHeroData(response.data);
    }

    // get allHeroData on load
    useEffect(() => {
        getAllHeroes();
    })

    // load another hero's profile
    function loadHeroProfile(heroName) {
        props.setHeroName(heroName);
        props.setView('profile');
    }

    return (
        <>
            {
                allHeroData.map((item, index) => {
                    return (
                        <Row
                            key={index}
                            className='mb-3'
                            style={{cursor: 'pointer'}}
                            onClick={() => loadHeroProfile(item.name)}>
                            <Col xs='4'>
                                <img
                                    className='img-fluid'
                                    src={item.image_url || "https://images.unsplash.com/photo-1483879504681-c0196ecceda5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"}></img>
                            </Col>
                            <Col xs='8'>
                                <h3>{item.name}</h3>
                                {
                                    item.type_id &&
                                    <h4>{'my ' + (item.type_id === '1' ? 'friend' : 'enemy')}</h4>
                                }
                            </Col>
                        </Row>
                    )
                })
            }
        </>
    )
}

export default AllHeroes;