import React, {Component} from "react";
import axios from "axios";

import "./FileUpload.css";

class FileUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedFile: null,
            UrlKey: null,
            data: null
        }
    }

    onChangeHandler = (event) => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    uploadHandler = () => {
        const data = new FormData()
        data.append('uploadFile', this.state.selectedFile)

        axios.post("/upload", data, {}).then((res) => {
            console.log(res.data)
            this.setState({

                UrlKey: `localhost:5000/download/${res.data.filename}`
            })
        })
    }

    render() {
        return (

            <div className="main-container">
                <div className="content">
                    <div className="header">
                        <h1>Filebine</h1>
                        <h3>Easy to share the Document by generating the url link</h3>
                        <h3>Only Once Downloadable</h3>
                    </div>
                    <div className="body">
                        <div className="input-container">
                            <input id="input" type="file" onChange={this.onChangeHandler}
                                   style={{display: "none", visibility: "hide"}}/>
                            <label htmlFor="input">Choose File</label>
                            <button type="upload" onClick={this.uploadHandler}>Upload File</button>
                        </div>
                    </div>
                    <div className="footer"><span>URL :</span>{this.state.UrlKey}</div>
                </div>
            </div>
        );
    }
}

export default FileUpload;
