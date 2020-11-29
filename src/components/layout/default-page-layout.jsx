import React from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';
import PropTypes from "prop-types";

export default function DefaultPageLayout(props) {

    return (
        <React.Fragment>
            <Header title={props.headerTitle} />
            {props.children}
            <Footer />
        </React.Fragment>
    )
}

DefaultPageLayout.propTypes = {
    headerTitle: PropTypes.string
}