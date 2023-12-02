import express from 'express';

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  res.json("Initial setup done");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});