import { useState } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore.ts';
import { createPost } from '../api/posts/requests.ts';


export const CreatePost = () => {
  const [content, setContent] = useState('');
  const { user, profile } = useAuthStore();

  if (profile?.role !== 'admin' || !profile) {
    return (
      <Typography variant="h6" align="center" color="error" sx={{ mt: 4 }}>
        You are not authorized to create a post!
        <br /> Only admins can create posts.
      </Typography>
    );

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await createPost({
      content,
      userId: user.id,
      createdAt: new Date().toISOString(),
      email: user.email || '',
    });

    setContent('');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="New Post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};
