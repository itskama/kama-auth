import { Card, CardContent, Typography } from '@mui/material';

interface PostCardProps {
  content: string;
  author: string;
  createdAt: string;
}

export const PostCard = ({ content, author, createdAt }: PostCardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Автор: {author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Дата: {new Date(createdAt).toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};
