import {useState} from 'react';
import useFireStoreDoc from '../utils/useFireStoreDoc';
import {Modal} from 'antd';

function View() {
    const { docs } = useFireStoreDoc('images');
    console.log(docs);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className="img-grid">
            {docs && docs.map(doc => (
                <div className="img-wrap" key={doc.id}>
                    <img src={doc.url} alt={doc.fileName} onClick={() => { showModal(); setCurrentImage(doc);}}/>
                </div>
            ))}
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={'100%'} bodyStyle={{height: '80vh'}}>
                <img src={currentImage.url} alt={currentImage.fileName}/>
            </Modal>
        </div>
    )
}

export default View;