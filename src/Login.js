import { Button, Form, FormGroup, Input } from 'reactstrap';

function Login(props) {
    return (
        <Form>
            <FormGroup>
                <Input id="input_username" type="text" placeholder="username"></Input>
                <Button onClick={() => props.setView('profile')}>log in!</Button>
            </FormGroup>
        </Form>
    )
}

export default Login;