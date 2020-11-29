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
import { loginUser }                 from '../../actions/authAction';
import { connect }                   from 'react-redux';
import { withRouter, Link }                from 'react-router-dom';
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
        this.setState({showLoader:true});
        this.props.loginUser({email,password},()=>{
            this.props.history.push('/dashboard');
            this.setState({showLoader:false})
        });
    }

    componentDidUpdate(prevProps,prevState){
        if(prevProps.error !== this.props.error && this.props.error instanceof Error){
            this.setState({showLoader:false})
        }
    }

    render() {
        return (
            <LoadingOverlay 
            active={this.state.showLoader}
            text="Hold on"
            spinner>
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
                                    <Button type='submit'>LogIn</Button>

                                    {(this.props.error) ? (<Form.Field><Label color="red">{this.props.error.toString()}</Label></Form.Field>) : ''}
                                </Form>
                                <Container>
                                    <Icon name="edit"/>
                                    <Link to="/register">Register user</Link>
                                </Container>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </DefaultPageLayout>
            </LoadingOverlay>
        )
    }
}

export default connect((store)=>({error:store.errors}), { loginUser })(withRouter(Login));
