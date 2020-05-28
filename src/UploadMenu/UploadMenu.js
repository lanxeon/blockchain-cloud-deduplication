import React, { useRef } from 'react';

import classes from './UploadMenu.module.css';

const UploadMenu = (props) => {

    // let file = null;
    const fileInput = useRef();

    const changeHandler = (e) => {
        let file = e.target.files[0];

        if(file)
            props.clickHandler(file);
        
        fileInput.current.value = "";
    }

    const fileClicked = () => {
        fileInput.current.click();
    }

    return (
        <div className={classes.menu}>
            <ul>
                <li>
                    <div className={classes.row}>
                        <button onClick={fileClicked}>
                            <div className={classes.iconContainer}>
                                <i className="material-icons">note_add</i>
                            </div>
                            <span>Upload File</span>
                        </button>
                        <div className={classes.hidden}>
                            <input type="file" onChange={changeHandler} ref={fileInput}></input>
                        </div>
                    </div>
                </li>
                <li>
                <div className={classes.row}>
                        <button>
                            <div className={classes.iconContainer}>
                                <i className="material-icons">create_new_folder</i>
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