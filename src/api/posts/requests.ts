import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { IPost } from "../../types";
import { db } from "../../firebase";


export const createPost = async (post: Omit<IPost, "id">) => {
    const postsCollection = collection(db, "posts");
    const docRef = await addDoc(postsCollection, post);
    return { ...post, id: docRef.id };
    };


    export const getPosts = async (userId?: string): Promise<IPost[]> => {
        const postsCollection = collection(db, "posts");
        let q = query(postsCollection, orderBy("createdAt", "desc"));
      
        if (userId) {
          try {
            q = query(
              postsCollection,
              where("userId", "==", userId),
              orderBy("createdAt", "desc")
            );
      
            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as IPost[];
          } catch (error) {
            console.error("Error executing query:", error);
            const allPosts = await getPosts();
            return allPosts.filter((post: IPost) => post.userId === userId);
          }
        }
      
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as IPost[];
      };


export const getPostById = async (id: string) => {
  const docRef = doc(db, "posts", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    throw new Error("Post not found");
  }
};
