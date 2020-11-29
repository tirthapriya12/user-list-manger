import React              from 'react';
import DefaultPageLayout  from '../../components/layout/default-page-layout';
import { Button, Form }   from 'semantic-ui-react';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null
        }
    }

    onChange = (e) => this.setState({ ...this.state, [e.target.name]: e.target.value });
    onSubmit = (e) =>{
        e.preventDefault();
    }

    render() {
        return (
            <DefaultPageLayout headerTitle="Register">
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <label>Name</label>
                        <input name='name' onChange={this.onChange} placeholder='Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Email</label>
                        <input name='email' onChange={this.onChange} placeholder='Email' />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input name="password" onChange={this.onChange} type="password" />
                    </Form.Field>
                    <Button type='submit'>Submit</Button>
                </Form>
            </DefaultPageLayout>
        )
    }
}