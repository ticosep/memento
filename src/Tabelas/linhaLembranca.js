import React, { Component } from 'react';
import { storageRef } from '../Firebase/firebase';
import { withRouter } from "react-router";
import { Player } from 'video-react';
import 'video-react/dist/video-react.css'; // import css

// A line in the paciente table, this line show the content and information form the uploaded file
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
            lembracaPreview = <img width="100" height="100" src={lembracaUrl} alt="lembrança"></img>;
        }

        if(lembrancaType === 'video') {
            lembracaPreview = <Player
            playsInline fluid={false} width={100} height={100}
            src={lembracaUrl}
          />;
        }
        return (
            <tr>
                <td> {lembracaPreview}</td>
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

                default:
                    console.log(error);
            }
        });

        lembrancaRef.getMetadata().then((metadata) => {
            const {contentType} =  metadata;
            // Regex to find what is the content to be showed
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