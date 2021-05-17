import {Input, Button } from '@material-ui/core'
import React, {useState} from 'react';
import firebase from "firebase";
import {storage, db} from "./firebase"
import "./ImageUpload.css"
function ImageUpload({username}) {

const [caption, setCaption] = useState('');
const [image, setImage] = useState(null);
const [progress, setProgress] = useState(0);   

const handleUpload = () =>{
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            //progess function....
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            setProgress(progress);
        },
        (error) => {
            //Error function ....
            console.log(error);
            alert(error.message);
        },
        () => {
            //complete function ...
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                //post image inside db

                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    catopm: caption,
                    imageUrl: url,
                    username: username
                    
                
                });
                setProgress(0);
                setCaption("");
                setImage(null);
            })
        }




        
    )
}

const handleChange = (e) => {
    if(e.target.files[0]) {
        setImage(e.target.files[0]);
    }
}

    return (
        <div className="imageupload">
            <progress className="imageupload__progress"  value={progress} max="100"/>
            <input onChange={event => setCaption(event.target.value)} type="text" placeholder="Enter a caption..." value={caption} />
            <input type="file" onChange={handleChange} />

            <Button onClick={handleUpload}>Upload</Button>


        </div>
    )
}

export default ImageUpload
