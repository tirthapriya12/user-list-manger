import React              from 'react';
import { connect }        from 'react-redux';
import { withRouter }     from 'react-router-dom';
import PropTypes          from "prop-types";
import { logoutUser  }    from '../../actions/authAction';
import {
    getUserList,
    deleteUser
}                         from '../../actions/userListAction';
import {
    Icon,
    Input
}                         from 'semantic-ui-react';
import debounce           from 'lodash.debounce';      
import DefaultPageLayout  from '../../components/layout/default-page-layout';
import UserListTable      from '../../components/user-list-table/user-list-table';
import LoadingOverlay     from 'react-loading-overlay';
import './dashboard.scss';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            userSearchFilter: ''
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({ showLoader: false })
        }
    }

    componentDidMount() {
        this.setState({showLoader:true})
        this.props.getUserList();
    }

    render() {
        const { showLoader } = this.state;
        const { users, page, total_pages } = this.props;
        const user_table_headers = users.length ? Object.keys(users[0]) : [''];
        return (
            <LoadingOverlay
                active={showLoader}
                text="Please wait"
                spinner>
                <DefaultPageLayout headerTitle="User list" headerAction={this.headerAction()}>
                    <Input onChange={debounce(this.onSearchChange,250)} icon='search' placeholder='Search...' />
                    <UserListTable
                        sortable
                        users={this.getFilteredUsers(users)}
                        headers={user_table_headers}
                        currentPage={page}
                        totalPages={total_pages}
                        onPageChange={this.onPageChange}
                        onUserDeleteClick={this.onUserDeleteClick} />

                </DefaultPageLayout>
            </LoadingOverlay>
        )
    }

    onPageChange = (pageNum) => {
        this.setState({showLoader:true});
        this.props.getUserList(pageNum);
    }

    onUserDeleteClick = (userId)=>{
        this.props.deleteUser(this.props.users,userId);
    }

    headerAction(){
        return(
            <button title="logout" className="dashboard-logout" onClick={this.onLogout}>
                <Icon name="log out"/>
            </button>
        )
    }

    onLogout = () => {
        this.props.logoutUser();
        this.props.history.push('/login');
    }

    onSearchChange = (e) => {
        this.setState({ userSearchFilter: e.target.value });
    }

    getFilteredUsers(users){
        const { userSearchFilter } = this.state;
        if (!!userSearchFilter){
           return users.filter((user) => {
                return (!!user.first_name.toLowerCase().match(new RegExp(userSearchFilter)) ||
                    !!user.last_name.toLowerCase().match(new RegExp(userSearchFilter)))
            })
        }else{
            return users;
        }
    }
}


const mapStateToProps = (state) => {
    return {
        users: state.userlist.users,
        page: state.userlist.page,
        total_pages: state.userlist.total_pages
    }
};

Dashboard.propTypes = {
    users: PropTypes.array,
    page: PropTypes.number,
    total_pages: PropTypes.number,
    logoutUser: PropTypes.func,
    getUserList: PropTypes.func,
    deleteUser: PropTypes.func
}
export default connect(mapStateToProps, { logoutUser, getUserList, deleteUser })(withRouter(Dashboard));