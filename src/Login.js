import { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

function Login(props) {
    const [userName, setUserName] = useState('');

    async function hero_exists() {
        let response = await props.getData('post', 'hero_exists', {userName});
        (response.data[0].hero_exists === '1')
            ? props.setView('profile')
            : alert('no such hero! please check your username or create a new account.');
    }

    return (
        <Form>
            <FormGroup>
                <Input
                    id="input_username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}/>
                <Button
                    onClick={() => hero_exists()}
                    disabled={userName.length === 0}>
                log in!</Button>
            </FormGroup>
        </Form>
    )
}

export default Login;