import React, { Fragment } from 'react';

import classes from './Header.module.css';

const Header = (props) => {
    return (
        <Fragment>
            <header className>
                <nav className>
                    <button>
                        <span>BlockDrive</span>
                    </button>
                    <div className={classes.spacer}></div>
                    <button>
                        <div className={classes.iconContainer}>
                            <i className="material-icons">cloud_upload</i>
                        </div>
                        <span>Upload</span>
                    </button>
                    <button>
                        {/* <i className="material-icons">face</i> */}
                        <span>Account</span>
                    </button>
                </nav>
            </header>
        </Fragment>
    )
}

export default Header;