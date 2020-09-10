import express from 'express';
import { rootHandler2 } from './handlers';

const app = express();
const PORT = 8000;
app.get('/', rootHandler2);
//app.get('/', (req, res) => res.send('API is working 🤓'))
// router.get('/hello/:name', handler.helloHandler);



//app.get('/', (req,res) => res.send('Express + TypeScript Server'));
app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});