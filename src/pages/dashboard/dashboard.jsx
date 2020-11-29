import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DefaultPageLayout from '../../components/layout/default-page-layout';
import CardList from '../../components/card-list/card-list';
import Spinner from '../../components/spinner/spinner';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { recipes } = this.props;

        if (recipes.loading !== prevProps.recipes.loading) {
            this.setState({ isLoading: recipes.loading });
        }


    }

    componentDidMount() {
        this.props.getRecipes()
    }

    onRecipeSelect(recipe) {

        this.props.history.push('/checkout/'+recipe.id);
    }
    render() {
        const { isLoading } = this.state;

        if (isLoading) {
            return (
                <Spinner />
            )
        }
        return (
            <DefaultPageLayout headerTitle="Recipe">
                {/* <CardList cards={recipes} onCardClick={this.onRecipeSelect.bind(this)} /> */
                <h1>some item</h1>}
            </DefaultPageLayout>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getRecipes: (callback) => (dispatch()),
    }
};

const mapStateToProps = (state) => {
    return {
        ...state
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));