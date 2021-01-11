import { useState } from 'react';
import useFireStoreDoc from '../utils/useFireStoreDoc';
import { Modal, Button, Typography, Spin } from 'antd';

const { Title } = Typography;

function View() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [lastDoc, setLastDoc] = useState(0);
    const { groupBy, keys, totalDocs, docs, isLast } = useFireStoreDoc('images', lastDoc);

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
            <Button type="primary" onClick={() => setIndex(prev => prev + 1)} disabled={index >= totalDocs-1}>Next</Button>
        </div>
    )

    const grid = keys.map((el) =>
                    <div key={el}>
                       <Title level={3}>
                            {new Date(groupBy[el][0].createdAt.seconds * 1000).toDateString()} | {groupBy[el].length} Images
                        </Title>
                    
                        <div className="img-grid">
                            {groupBy[el] && groupBy[el].map(doc => (
                            <div className="img-wrap" key={doc.id}>
                                <img src={doc.url} className="img" alt={doc.fileName} onClick={() => { showModal(); setIndex(docs.indexOf(doc)) }} style={{ cursor: 'pointer' }} />
                            </div>
                            ))}
                        </div>

                    </div>
                )

    const onScroll = (e) => {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if(bottom && docs){
            if (!isLast){
                setLastDoc(docs[totalDocs - 1].createdAt)
            }
        }
    }

    return (
        <div onScroll={(e) => onScroll(e)} style={{overflow: 'scroll', maxHeight: '90vh'}}>
            {grid}
            { docs && docs.length ? <Modal title={docs[index].fileName} closable={true} centered={true} 
                onCancel={handleCancel}
                visible={isModalVisible}
                width={'100%'}
                footer={footer}
                bodyStyle={{height: '80vh'}}>
                <img src={docs[index].url} alt={docs[index].fileName} style={{ width: '100%', height: '100%'}}/>
            </Modal> : ''}
            {!isLast ? <Spin size="large"/> : ''}
        </div>
    )
}

export default View;