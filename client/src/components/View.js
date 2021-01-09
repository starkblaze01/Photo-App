import {useState} from 'react';
import useFireStoreDoc from '../utils/useFireStoreDoc';
import { Modal, Button } from 'antd';

function View() {
    const { docs } = useFireStoreDoc('images');
    console.log(docs);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [index, setIndex] = useState(0);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIndex(0);
    };

    const footer = (
        <div>
            <Button type="ghost" onClick={() => setIndex(prev => prev - 1)} disabled={index <= 0}>Previous</Button>
            <Button type="primary" onClick={() => setIndex(prev => prev + 1)} disabled={index >= docs.length-1}>Next</Button>
        </div>
    )

    return (
        <div className="img-grid">
            {docs && docs.map(doc => (
                <div className="img-wrap" key={doc.id}>
                    <img src={doc.url} alt={doc.fileName} onClick={() => { showModal(); setIndex(docs.indexOf(doc))}}/>
                </div>
            ))}
            { docs && docs.length ? <Modal title="Image Preview" closable={true} centered={true} 
                onCancel={handleCancel}
                visible={isModalVisible}
                width={'100%'}
                footer={footer}
                bodyStyle={{height: '80vh'}}>
                <img src={docs[index].url} alt={docs[index].fileName} style={{ width: '100%', height: '100%'}}/>
            </Modal> : ''}
        </div>
    )
}

export default View;