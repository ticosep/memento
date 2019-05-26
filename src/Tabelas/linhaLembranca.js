import React, { Component } from 'react';
import { storageRef } from '../Firebase/firebase';
import { withRouter } from "react-router";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css

class LinhaLembranca extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paciente: props.lembraca,
            lembracaUrl: '',
            lembrancaType: ''
        }
    }


    render() {
        const { lembracaUrl, lembrancaType } = this.state;
        let lembracaPreview;

        if(lembrancaType === 'img') {
            lembracaPreview = <img src={lembracaUrl}></img>;
        }

        if(lembrancaType === 'video') {
            lembracaPreview = <Player
            playsInline
            src={lembracaUrl}
          />;
        }
        return (
            <tr>
                <td width="80" height="50"> {lembracaPreview}</td>
                <td>{this.state.paciente.desc}</td>
                <td>{this.state.paciente.data}</td>

            </tr>
        )
    }

    componentDidMount() {
        // Create a reference to the file we want to download
        const lembrancaRef = storageRef.child(this.state.paciente.path);

        let tipo;
    
        // Get the download URL
        lembrancaRef.getDownloadURL().then( (url)  => {

            this.setState({
               lembracaUrl: url
            })
        }).catch( (error) => {
    
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object-not-found':
                    // File doesn't exist
                    break;
    
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
    
                case 'storage/canceled':
                    // User canceled the upload
                    break;
    
    
                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });

        lembrancaRef.getMetadata().then((metadata) => {
            const {contentType} =  metadata;
            const regex = /image|video?/gi;
            const [match] = contentType.match(regex)

            if(match === 'image'){
                tipo = 'img'

            }

            if(match === 'video'){
                tipo = 'video'
            }

            this.setState({
                lembrancaType: tipo
            })
            // Metadata now contains the metadata for 'images/forest.jpg'
          }).catch((error) => {
            console.log(error);
          });

         
        
    }
}



export default withRouter(LinhaLembranca);