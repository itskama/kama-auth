import { collection } from "firebase/firestore";
import { IPost } from "../../types";
import { db } from "../../firebase";

export const createPost = async (post:Omit<IPost, 'id'>)=> {
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, post);
}