import React, { Component } from 'react';

import classes from './UploadMenu.module.css';

const UploadMenu = (props) => {
    return (
        <div className="menu">
            <ul>
                <li>
                    <i class="material-icons">create_new_folder</i>
                    <button>Upload File</button>
                </li>
                <li>
                    <i class="material-icons">cloud_upload</i>
                    <button>Upload Folder</button>
                </li>
            </ul>
        </div>
    )
}

export default UploadMenu;