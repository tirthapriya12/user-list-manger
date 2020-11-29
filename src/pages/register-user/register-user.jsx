import React                         from 'react';
import DefaultPageLayout             from '../../components/layout/default-page-layout';
import LoadingOverlay                from 'react-loading-overlay';
import { 
    Button, 
    Form, 
    Segment, 
    Grid,
    Icon,
    Container, 
    Label }                          from 'semantic-ui-react';
import { registerUser }                 from '../../actions/authAction';
import { connect }                   from 'react-redux';
import { withRouter, Link }          from 'react-router-dom';
import './register-user.scss'

class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null,
            showLoader: false
        }
    }

    onChange = (e) => this.setState({ ...this.state, [e.target.name]: e.target.value });
    
    onSubmit = (e) =>{
        const { name, email, password} = this.state;
        e.preventDefault();
        this.props.registerUser({email,password},()=>{
            alert('Registration successful');
            this.props.history.push('/login');
        });
    }

    componentDidUpdate(){

    }

    render() {
        return (
            <LoadingOverlay 
            active={this.state.showLoader}
            text="Hold on"
            spinner>
                <DefaultPageLayout headerTitle="Register">
                    <Grid>
                        <Grid.Column className="register-form-container">
                            <Segment raised>
                                <Form onSubmit={this.onSubmit}>
                                <Form.Field>
                                        <label>Name</label>
                                        <input onChange={this.onChange} name="name" placeholder='Name' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Email</label>
                                        <input onChange={this.onChange} name="email" placeholder='Email' />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Password</label>
                                        <input onChange={this.onChange} type="password" name="password" placeholder='Password' />
                                    </Form.Field>
                                    <Button type='submit'>Submit</Button>

                                    {(this.props.error) ? (<Form.Field><Label color="red">{this.props.error.toString()}</Label></Form.Field>) : ''}
                                </Form>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </DefaultPageLayout>
            </LoadingOverlay>
        )
    }
}

export default connect((store)=>({error:store.errors}), { registerUser })(withRouter(Register))