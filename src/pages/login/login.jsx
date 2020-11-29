import React                         from 'react';
import DefaultPageLayout             from '../../components/layout/default-page-layout';
import Modal                         from '../../components/modal/modal';
import Spinner                       from '../../components/spinner/spinner';
import { Button, Form, Segment, Grid, Label }     from 'semantic-ui-react';
import { loginUser }                 from '../../actions/authAction';
import { connect }                   from 'react-redux';
import { withRouter }                from 'react-router-dom';
import './login.scss';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = { email: null, password: null, showLoader: false }
    }

    onChange = (e) => this.setState({ ...this.state, [e.target.name]: e.target.value });
    
    onSubmit = (e) => {
        const { email,password} = this.state;
        e.preventDefault();
        this.props.loginUser({email,password},()=>{
            this.props.history.push('/dashboard');
        });
    }

    render() {

        const renderModalSpinner = (
            <Modal hideClose>
                <Spinner/>
            </Modal>
        )

        return (
            <DefaultPageLayout headerTitle="Login">
                <Grid>
                    <Grid.Column className="login-form-container">
                        <Segment raised>
                            <Form onSubmit={this.onSubmit}>
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
                { this.props.showLoader && renderModalSpinner}
            </DefaultPageLayout>
        )
    }
}

export default connect((store)=>({error:store.errors}), { loginUser })(withRouter(Login));
