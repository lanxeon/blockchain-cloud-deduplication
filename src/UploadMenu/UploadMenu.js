import React from 'react';

import classes from './UploadMenu.module.css';

const UploadMenu = (props) => {
    return (
        <div className={classes.menu}>
            <ul>
                <li>
                    <div className={classes.row}>
                        <button>
                            <div className={classes.iconContainer}>
                                <i class="material-icons">note_add</i>
                            </div>
                            <span>Upload File</span>
                        </button>
                    </div>
                </li>
                <li>
                <div className={classes.row}>
                        <button>
                            <div className={classes.iconContainer}>
                                <i class="material-icons">create_new_folder</i>
                            </div>
                            <span>Upload Folder</span>
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default UploadMenu;