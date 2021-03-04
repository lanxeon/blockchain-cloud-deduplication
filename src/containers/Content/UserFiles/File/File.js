import React, { Component } from "react";

import classes from "./File.module.css";

import ShareButton from "./ShareButton/ShareButton";

class File extends Component {
  size = "";
  reducedSize = null;

  // componentWillMount = async () => {
  // 	let fs = this.props.values.file.size;
  // 	let i = 0;
  // 	while (fs / 1024 > 1) {
  // 		fs /= 1024;
  // 		i += 1;
  // 		this.size = i === 1 ? "KB" : i === 2 ? "MB" : i === 3 ? "GB" : "B";
  // 		this.reducedSize = fs.toFixed(1);
  // 	}
  // };

  constructor(props) {
    super(props);

    //for getting icon as per file extension
    let ext = this.props.values.name
      ? this.props.values.name
          .substr(this.props.values.name.lastIndexOf(".") + 1)
          .toLowerCase()
      : null;

    this.img =
      ext === "pdf"
        ? "picture_as_pdf"
        : ext === "gif"
        ? "gif"
        : [
            "html",
            "c",
            "cpp",
            "js",
            "css",
            "java",
            "py",
            "scss",
            ".sol",
            "cs",
            "ts",
          ].includes(ext)
        ? "code"
        : ["png", "jpg", "jpeg", "webp"].includes(ext)
        ? "insert_photo"
        : ["mp4", "ogg", "mkv", "flv"].includes(ext)
        ? "movie"
        : ["mp3", "3ga", "flac", "wav", "opus"].includes(ext)
        ? "music_note"
        : "description";

    //for formatting dates
    this.date = new Date(this.props.values.dateAdded).toLocaleString();

    //for getting size in respective bytes
    let fs = this.props.values.file.size;
    let i = 0;
    if (fs < 1024) {
      this.size = "B";
      this.reducedSize = fs;
    } else {
      while (fs / 1024 > 1) {
        fs /= 1024;
        i += 1;
        this.size = i === 1 ? "KB" : i === 2 ? "MB" : i === 3 ? "GB" : "B";
        this.reducedSize = fs.toFixed(1);
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.file}>
          <div className={classes.name}>
            <div className={classes.fileContainer}>
              <i className="material-icons">{this.img}</i>
            </div>
            <div className={classes.fileName}>
              <span>{this.props.values.name}</span>
            </div>
          </div>
          <div className={classes.size}>
            <span>{this.reducedSize + this.size}</span>
          </div>
          <div className={classes.date}>
            <span>{this.date}</span>
          </div>
          <div
            className={classes.download}
            style={{ transform: "translateY(-25%)" }}
          >
            <button
              onClick={() =>
                this.props.onDownload(
                  this.props.values.file.path,
                  this.props.values.name
                )
              }
            >
              <div className={classes.iconContainer}>
                <i className="material-icons">get_app</i>
              </div>
            </button>
          </div>
          <div
            className={classes.delete}
            style={{ transform: "translateY(-25%)" }}
          >
            <button onClick={this.props.onDelete}>
              <div className={classes.fileContainer}>
                <i className="material-icons">delete</i>
              </div>
            </button>
          </div>
          <ShareButton values={this.props.values} />
        </div>
        <hr></hr>
      </React.Fragment>
    );
  }
}

export default File;
