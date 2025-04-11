import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/posts/requests'
import { PostCard } from '../components/PostCard';

export const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      getPostById(id)
        .then(setPost)
        .catch(() => setError('Ошибка при получении поста'));
    }
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!post) return <div>Загрузка...</div>;

  return (
    <PostCard
      content={post.content}
      author={post.author}
      createdAt={post.createdAt}
    />
  );
};
