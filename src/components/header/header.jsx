import React from 'react';
import PropTypes from "prop-types";
import './header.scss';

const Header = ({title,headerAction}) => {
    return (
            <header className="app-head">
                <div className="app-head-title">
                    <h2>{title}</h2>
                </div>
            {headerAction}
            </header>
    )
}


Header.propTypes = {
    title: PropTypes.string
}
export default Header;