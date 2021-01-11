import { useState, useEffect } from 'react';
import { store } from './firebase';


const useFireStoreDoc = (collection, last) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if (last){
            const unsub = store.collection(collection)
                .orderBy("createdAt", "desc")
                .startAt(last)
                .limit(30)
                .onSnapshot((snap) => {
                    let documents = []
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id })
                    });
                    setDocs(documents)
                });
            return () => unsub();

        } else {
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
    let groupBy = {}
    docs.forEach((el) => {
        const date = new Date(el.createdAt.seconds * 1000).getDate()
        if (groupBy[date]) {
            groupBy[date].push(el);
        } else {
            groupBy[date] = [el];
        }
    })
    console.log(groupBy);
    let keys = Object.keys(groupBy).reverse()
    let totalDocs = docs.length
    return { groupBy, keys, totalDocs, docs};
}

export default useFireStoreDoc;