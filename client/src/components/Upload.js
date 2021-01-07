import { useState } from 'react';
import { storage } from '../utils/firebase';
import { Button } from 'antd';

function Upload(){
    const [files, setFiles] = useState('');

    const onChange = (e) => {
        setFiles(e.target.files);
        console.log(e.target.files);
    }
    const uploadFiles = (e) => {
        e.preventDefault();
        console.log('lol',e);
        const uploadTask = storage.ref(`/images/${files[0].name}`).put(files[0]);
        uploadTask.on("state_changed", console.log, console.error, () => {
            storage
                .ref("images")
                .child(files[0].name)
                .getDownloadURL()
                .then((url) => {
                    console.log(url)
                });
        });
    }
    console.log(files);
    return (
        <div>
            Hello
                <form style={{ minHeight: '200px', minWidth: '200px', background: '#d3d3d3', display: 'flex', flexDirection: 'column', justifyContent: 'center'}} onSubmit={(e) => uploadFiles(e)}>
                    <input type="file" multiple style={{ margin: 'auto' }} onChange={(e)=>onChange(e)}/>
                    <Button htmlType="submit" disabled={!files}>Upload</Button>
                </form>
        </div>
    )
}

export default Upload;