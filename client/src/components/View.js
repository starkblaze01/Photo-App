import {useEffect, useState, useRef} from 'react';
import useFireStoreDoc from '../utils/useFireStoreDoc';
import { Modal, Button, Typography } from 'antd';

const { Title } = Typography;

function View() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [index, setIndex] = useState(0);
    const [lastDoc, setLastDoc] = useState(0);
    const { groupBy, keys, totalDocs, docs } = useFireStoreDoc('images', lastDoc);
    console.log(groupBy, keys, totalDocs, docs)
    const [postList, setPostList] = useState({
        list: [1, 2, 3, 4]
    });
    const loader = useRef(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }

    }, []);

    useEffect(() => {
        // here we simulate adding new posts to List
        const newList = postList.list.concat([1, 1, 1, 1]);
        setPostList({
            list: newList
        })
    }, [page, postList])

    // here we handle what happens when user scrolls to Load More div
    // in this case we just update page variable
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }

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
                    <div>
                       <Title level={3}>
                            {new Date(groupBy[el][0].createdAt.seconds * 1000).toDateString()} | {groupBy[el].length} Images
                        </Title>
                    
                        <div className="img-grid">
                            {groupBy[el] && groupBy[el].map(doc => (
                            <div className="img-wrap" key={doc.id}>
                                <img src={doc.url} alt={doc.fileName} onClick={() => { showModal(); setIndex(docs.indexOf(doc)) }} style={{ cursor: 'pointer' }} />
                            </div>
                            ))}
                        </div>

                    </div>
                )

    return (
        <div>
            {grid}
            { docs && docs.length ? <Modal title="Image Preview" closable={true} centered={true} 
                onCancel={handleCancel}
                visible={isModalVisible}
                width={'100%'}
                footer={footer}
                bodyStyle={{height: '80vh'}}>
                <img src={docs[index].url} alt={docs[index].fileName} style={{ width: '100%', height: '100%'}}/>
            </Modal> : ''}
            <div className="loading" ref={loader}>
                <h2>Load More</h2>
            </div>
        </div>
    )
}

export default View;