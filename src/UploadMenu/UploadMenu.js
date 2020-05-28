import React, { useRef, useEffect } from 'react';

import classes from './UploadMenu.module.css';


const UploadMenu = (props) => {

    useEffect(() => {
        document.addEventListener('click', (event) => {
            if (menu.current && !menu.current.contains(event.target))
                props.clickedOutside();
        });
    });

    //ref for the entire element
    let menu = useRef(null);
    //ref for hidden file input
    let fileInput = useRef();

    //handling onChange event of file input(which is hidden in DOM)
    const changeHandler = (e) => {
        let file = e.target.files[0];

        if(file)
            props.clickHandler(file);
        
        fileInput.current.value = "";
    }

    //for redirecting button click to input
    const fileClicked = () => {
        fileInput.current.click();
    }

    return (
        <div className={classes.menu} ref={menu}>
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