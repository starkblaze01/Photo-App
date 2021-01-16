import { useState } from 'react';
import { storage, store, timestamp } from '../utils/firebase';
import { Button, message, Progress, Skeleton } from 'antd';
import Resizer from 'react-image-file-resizer';

function Upload(){
    // for error and success message
    const [messsageApi, contextHolder] = message.useMessage();
    // hold the files in local state
    const [files, setFiles] = useState([]);
    // keep track of drag and drop to show skeleton overlay
    const [drag, setDrag] = useState(false);
    // keep track of total bytes to upload
    const [byte, setByte] = useState(0);
    // keep track of bytes transferred
    const [transfer, setTransfer] = useState(0);
    // to count all the drag propogation on DOM elements to stop skeleton flickering
    const [dragCount, setDragCount] = useState(0);
    // count of files uploaded
    const [uploadCount, setUploadCount] = useState(0);

    // files selected via browse
    const onChange = async (e) => {
        setTransfer(0);
        setFiles([]);
        setByte(0);
        for(let i=0; i<e.target.files.length;i++){
            if (e.target.files[i].type !== 'image/png' && e.target.files[i].type !== 'image/jpeg' && e.target.files[i].type !== 'image/jpg'){
                messsageApi.open({
                    type: 'error',
                    content: 'Only PNG/JPEG files allowed',
                    duration: 2,
                });
                return 
            }
        }
        setFiles([...e.target.files]);
    }

    // resize function
    const resizeFile = (file, width, height) => new Promise(resolve => {
        Resizer.imageFileResizer(file, width, height, 'JPEG', 100, 0,
            uri => {
                resolve(uri);
            },
            'blob',
            width,
            height
        );
    });
    // get image aspect ratio
    const getAspectRatio = (file, fixed_height) => {
        let url = URL.createObjectURL(file);
        let img = new Image();
        let height = 0
        let width = 0
        let ratio
        img.onload = function () {
            height = img.height;
            width = img.width;
            ratio = (width / height) * fixed_height
            URL.revokeObjectURL(img.src);
            return ratio
        };
        img.src = url;
    }

    // upload files
    const uploadFiles = async (e) => {
        e.preventDefault();
        const imageRef = store.collection('images')
        files.forEach(async (file)=> {
            try {
                const image = await resizeFile(file, getAspectRatio(file, 720), 720);
                setByte(prev => prev + image.size);
                const uploadTask = storage.ref().child(`/images/720p_${file.name}`).put(image);
                uploadTask.on("state_changed", snapshot => {
                    setTransfer(prev => prev + snapshot._delegate.bytesTransferred)
                }, (error) => {
                    console.log(error);
                }, async () => {
                    setUploadCount(prev => prev + 1)
                    storage
                        .ref("images")
                        .child(`720p_${file.name}`)
                        .getDownloadURL()
                        .then((url) => {
                            const fileName = '720p_'+file.name
                            const createdAt = timestamp();
                            imageRef.add({ url, createdAt, fileName })
                        });
                    const image1 = await resizeFile(file, getAspectRatio(file, 240), 240);
                    setByte(prev => prev + image1.size);
                    const uploadTask1 = storage.ref().child(`/images/240p_${file.name}`).put(image1);
                    uploadTask1.on("state_changed", snapshot => {
                        setTransfer(prev => prev + snapshot._delegate.bytesTransferred)
                    }, (error) => {
                        console.log(error);
                    }, () => { 
                        setUploadCount(prev => prev + 1)
                        storage
                            .ref("images")
                            .child(`240p_${file.name}`)
                            .getDownloadURL()
                            .then((url) => {
                                const fileName = '240p_'+file.name
                                const createdAt = timestamp();
                                imageRef.add({ url, createdAt, fileName })
                            })
                    });
                    }
                );
            } catch (err) {
                console.log(err);
                messsageApi.open({
                    type: 'error',
                    content: 'Error occurred while uploading files',
                    duration: 2,
                });
            }
        });
    }

    // drag and drop set up
    const dragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }
    const dragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCount(prev => prev+1)
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            setDrag(true)
        }
    }
    const dragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragCount(prev => prev-1)
        if (dragCount === 0) {
            setDrag(false)
        }
    }
    
    const drop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDrag(false)
        setTransfer(0);
        setByte(0);
        setFiles([]);
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
            if (e.dataTransfer.files[i].type !== 'image/png' && e.dataTransfer.files[i].type !== 'image/jpeg' && e.target.files[i].type !== 'image/jpg') {
                messsageApi.open({
                    type: 'error',
                    content: 'Only PNG/JPEG files allowed',
                    duration: 2,
                });
                return
            }
        }
        setFiles([...e.dataTransfer.files]);
    }
    const fileList = files ? files.map(el => <div key={el.name}>
            {el.name}
        </div>
        ) : ''

    return (
        <div 
            onDrop={(e) => drop(e)}
            onDragOver={(e) => dragOver(e)}
            onDragEnter={(e) => dragIn(e)}
            onDragLeave={(e) => dragOut(e)}
        >
            {contextHolder}
                <form
                    style={{ minHeight: '200px', minWidth: '200px', background: '#d3d3d3', display: 'flex', flexDirection: 'column', justifyContent: 'center', border:'1px dashed', padding: '10px'}}
                    onSubmit={(e) => uploadFiles(e)}
                    >
                Choose files or Drag files here to upload!
                    <input type="file" multiple style={{ margin: 'auto', display: 'none', width: '100px' }} id="image" onChange={(e) => onChange(e)}/>
                    <label htmlFor="image" style={{ border: '2px solid #39d615', background: '#39d615', width: '100px', margin: 'auto', cursor: 'pointer'}}>Browse</label>

                    { fileList }
                    <Skeleton loading={drag} style={{zIndex: '1'}}/>
                    <Button htmlType="submit" disabled={!files || !files.length || byte} style={{width: '100px', margin: 'auto'}}>Upload</Button>
                    { files && files.length ? <Progress type="circle" percent={Math.max(transfer*100/byte, uploadCount*100/(files.length*2))}/> : ''}
                    {((uploadCount===(files.length*2) || (transfer === byte))&& files.length) ? 'All files uploaded successfully': ''}
                </form>
        </div>
    )
}

export default Upload;