import { useState } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

function Login(props) {
    const [userName, setUserName] = useState('');
    return (
        <Form>
            <FormGroup>
                <Input
                    id="input_username"
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}/>
                <Button onClick={() => props.getData('post', 'hero_exists', {userName})}>
                log in!</Button>
            </FormGroup>
        </Form>
    )
}

export default Login;