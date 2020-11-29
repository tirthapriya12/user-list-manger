import React             from 'react';
import PropTypes          from "prop-types";
import {
    Icon,
    Label,
    Menu,
    Button,
    Table
}                         from 'semantic-ui-react';

export default class UserListTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sortDir: 'ascending',
            sortBy: 'name',
            users: []
        }
    }

    componentDidUpdate(prevProps, prevState) {
       
        if (this.props.users !== prevProps.users) {
            this.setState({ users: this.props.users })
        }
        if (prevState.sortBy !== this.state.sortBy || prevState.sortDir !== this.state.sortDir) {
            this.sortUsers();
        }
    }

    render() {
        const {  headers, sortable } = this.props;
        const { users, sortDir, sortBy } = this.state;
        return (
            <Table sortable={sortable} fixed>
                <Table.Header>
                    <Table.Row>
                        {
                            headers && headers.map((header, i) => {
                                return (
                                    <Table.HeaderCell
                                        sorted={sortable && header !=='avatar' && sortBy === header ? sortDir : null}
                                        onClick={() => sortable && header !=='avatar' && this.setState({ sortBy: header, sortDir: sortDir === 'ascending' ? 'descending' : 'ascending' })}
                                        key={'header_' + i}>
                                        {header}
                                    </Table.HeaderCell>)
                            })
                        }
                        <Table.HeaderCell key={'header_'+headers.length||1}>action</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        users.map((user, i) => {
                            return (
                                <Table.Row key={'user_' + i}>
                                    {
                                        Object.keys(user).map((key, i) => {
                                            if(key == 'avatar'){
                                                return (<Table.Cell key={i}><img src={user[headers[i]]}/></Table.Cell>)
                                            }
                                            return (<Table.Cell key={i}>{user[headers[i]]}</Table.Cell>)
                                        })
                                    }
                                    <Table.Cell key={Object.keys(user).length || 1}>
                                        <Button size="tiny" color="red" onClick={()=>this.onDeleteClick(user.id)}>
                                            <Icon name="user delete" />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        {this.renderNavigation()}
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }

    renderNavigation() {
        const { currentPage,totalPages,headers } = this.props;
        let pages = Array(totalPages).fill(1);
        
        return (
            <Table.HeaderCell colSpan={headers.length+1}>
                <Menu floated='right' pagination>
                    <Menu.Item as='a' icon disabled={currentPage === 1} onClick={()=>this.onNavClick(currentPage-1)}>
                        <Icon name='chevron left' />
                    </Menu.Item>
                    {
                        totalPages && pages.map((x,page) => {
                            return (<Menu.Item as='a' key={page} onClick={()=>this.onNavClick(page+1)}>{page+1}</Menu.Item>)
                        })
                    }
                    <Menu.Item as='a' icon disabled={totalPages === currentPage} onClick={()=>this.onNavClick(currentPage+1)}>
                        <Icon name='chevron right' />
                    </Menu.Item>
                </Menu>
            </Table.HeaderCell>
        )
    }

    onNavClick = (gotoPage) => {
        const { totalPages, onPageChange } = this.props;
        if(gotoPage < 1 || gotoPage > totalPages) return;
        onPageChange && onPageChange(gotoPage);
    }

    onDeleteClick = (id) => {
        this.props.onUserDeleteClick(id);
    }

    sortUsers(){
        const { users, sortBy, sortDir } = this.state;
        let sortedUsers = users.sort((userA, userB) => {
            let sortParamA = userA[sortBy],
                sortParamB = userB[sortBy]
            if (typeof sortParamA === 'string') {
                sortParamA = sortParamA.toLowerCase();
                sortParamB = sortParamB.toLowerCase();
            }
            if (sortDir === 'ascending') {
                return (sortParamA < sortParamB ? -1 : 1);
            } else {
                return (sortParamA > sortParamB ? -1 : 1);
            }
        })

        this.setState({ users: sortedUsers });
    }
}

UserListTable.propTypes = {
    users: PropTypes.array,
    headers: PropTypes.array,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    onPageChange: PropTypes.func,
    onUserDeleteClick: PropTypes.func,
    sortable: PropTypes.bool
}