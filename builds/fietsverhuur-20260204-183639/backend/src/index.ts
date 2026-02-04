import app from './app';
import './seed';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health: http://localhost:${PORT}/api/health`);
});