import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors())

app.get('/', (req, res) => {
	res.send('This is a test page we don\'t serve things here!');
})

app.post('/jimp', (req, res) => {
	res.send('Received!');
})

app.get('/jimp', (req, res) => {
	res.send({msg: 'Nothing to get -- yet.'});
})

export default app;