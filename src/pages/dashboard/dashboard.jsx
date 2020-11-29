import React             from 'react';
import { connect }       from 'react-redux';
import { withRouter }    from 'react-router-dom';
import { logoutUser  }   from '../../actions/authAction';
import { Icon }          from 'semantic-ui-react';                   
import DefaultPageLayout from '../../components/layout/default-page-layout';
import CardList          from '../../components/card-list/card-list';
import Spinner           from '../../components/spinner/spinner';
import './dashboard.scss';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState) {


    }

    componentDidMount() {
    }

    render() {
        const { isLoading } = this.state;

        return (
            <DefaultPageLayout headerTitle="Recipe" headerAction={this.headerAction()}>
                {/* <CardList cards={{name:1}}  /> */}
            </DefaultPageLayout>
        )
    }

    headerAction(){
        return(
            <button className="dashboard-logout" onClick={this.onLogout}>
                <Icon name="log out"/>
            </button>
        )
    }

    onLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/login');
    }
}


const mapStateToProps = (state) => {
    return {
        ...state
    }
};
export default connect(mapStateToProps,{logoutUser})(withRouter(Dashboard));