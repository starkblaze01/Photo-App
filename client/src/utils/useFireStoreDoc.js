import { useState, useEffect } from 'react';
import { store } from './firebase';


const useFireStoreDoc = (collection) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {

        const unsub = store.collection(collection)
        .orderBy("createdAt", "desc")
        .onSnapshot((snap) => {
            let documents = []
            snap.forEach((doc) => {
                documents.push({...doc.data(), id: doc.id })
            });
            setDocs(documents)
        });

        return () => unsub();

    }, [collection])

    return { docs };
}

export default useFireStoreDoc;