import { useState } from 'react';
import { storage, store, timestamp } from '../utils/firebase';
import { Button, message, Progress, Skeleton } from 'antd';

function Upload(){
    const [files, setFiles] = useState('');
    const [messsageApi, contextHolder] = message.useMessage();
    const [drag, setDrag] = useState(false);
    const [byte, setByte] = useState(0);
    const [transfer, setTransfer] = useState(0);

    const onChange = (e) => {
        setTransfer(0);
        console.log(e.target.files.length);
        for(let i=0; i<e.target.files.length;i++){
            if (e.target.files[i].type !== 'image/png' && e.target.files[i].type !== 'image/jpeg'){
                console.log(e.target.files[i].type);
                messsageApi.open({
                    type: 'error',
                    content: 'Only PNG/JPEG files allowed',
                    duration: 2,
                });
                return 
            }
        }
        setByte([...e.target.files].reduce( (ac, cV) => cV.size + ac,0))
        setFiles([...e.target.files]);
    }
    const uploadFiles = (e) => {
        e.preventDefault();
        const promises = [];
        const imageRef = store.collection('images')
        files.forEach(file => {
            const uploadTask = storage.ref().child(`/images/${file.name}`).put(file);
            promises.push(uploadTask)
            uploadTask.on("state_changed", snapshot => {
                setTransfer(prev => prev + snapshot._delegate.bytesTransferred)
            }, (error) => {
                console.log(error);
            }, () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then((url) => {
                        const fileName = file.name
                        const createdAt = timestamp();
                        imageRef.add({ url, createdAt, fileName })
                        console.log(url)
                    })
            })
        });
        Promise.all(promises)
            .then(() => messsageApi.open({
                type: 'success',
                content: 'All files uploaded successfully',
                duration: 2,
            }))
            .catch(err => console.log(err));
        
    }
    let dragCount = 0
    const dragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const dragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        dragCount = dragCount + 1
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true)
        }
    }
    const dragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        dragCount = dragCount - 1
        if (dragCount === 0) {
            setDrag(false)
        }
    }
    
    const drop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false)
        setTransfer(0);
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            if (e.dataTransfer.files[i].type !== 'image/png' && e.dataTransfer.files[i].type !== 'image/jpeg') {
                messsageApi.open({
                    type: 'error',
                    content: 'Only PNG/JPEG files allowed',
                    duration: 2,
                });
                return
            }
        }
        setByte([...e.dataTransfer.files].reduce((ac, cV) => cV.size + ac, 0))
        setFiles([...e.dataTransfer.files]);
        console.log(e.dataTransfer.files);
    }

    const fileList = files ? files.map(el => <div key={el.name}>
            {el.name}
        </div>
        ) : ''
    const dragOverlay = drag ? <div></div> : ''

    console.log(files, byte, transfer);
    return (
        <div 
            onDrop={(e) => drop(e)}
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragIn(e)}
            onDragLeave={(e) => dragOut(e)}
        >
            {contextHolder}
                <form
                    style={{ minHeight: '200px', minWidth: '200px', background: '#d3d3d3', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}
                    onSubmit={(e) => uploadFiles(e)}
                    >
                Choose files or Drag files here to upload!
                    <input type="file" multiple style={{ margin: 'auto', display: 'none', width: '100px' }} id="image" onChange={(e) => onChange(e)}/>
                    <label htmlFor="image" style={{ border: '2px solid #39d615', background: '#39d615', width: '100px', margin: 'auto'}}>Browse</label>
                    {dragOverlay}
                    { fileList }
                    <Skeleton loading={drag}/>
                    <Button htmlType="submit" disabled={!files} style={{width: '100px', margin: 'auto'}}>Upload</Button>

                    <Progress type="circle" percent={transfer*100/byte}/>
                </form>
        </div>
    )
}

export default Upload;