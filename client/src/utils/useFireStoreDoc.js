import { useState, useEffect } from 'react';
import { store } from './firebase';


const useFireStoreDoc = (collection, last) => {
    const [docs, setDocs] = useState([]);
    const [isLast, setIsLast] = useState(false);
    useEffect(() => {
        // For infinite scrolling last doc information will be present
        if (last){
            const unsub = store.collection(collection)
                .orderBy("createdAt", "desc")
                .startAfter(last)
                .limit(30)
                .onSnapshot((snap) => {
                    let documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    });
                    if(!documents.length){
                        setIsLast(true)
                    }
                    setDocs(prev => prev.concat(documents))
                });
            return () => unsub();

        } // for fetching data firstt time with no information on last doc
        else {
            const unsub = store.collection(collection)
                .orderBy("createdAt", "desc")
                .limit(30)
                .onSnapshot((snap) => {
                    let documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    });
                    setDocs(documents)
                });
            return () => unsub();

        }
    }, [collection, last]);

    // Grouping of the data based on Data Upload date
    let groupBy = {}
    docs.forEach((el) => {
        const date = new Date(el.createdAt.seconds * 1000).getDate()
        if (groupBy[date]) {
            groupBy[date].push(el);
        } else {
            groupBy[date] = [el];
        }
    })
    let keys = Object.keys(groupBy).reverse()
    let totalDocs = docs.length
    return { groupBy, keys, totalDocs, docs, isLast};
}

export default useFireStoreDoc;