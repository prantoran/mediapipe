import express from 'express';
import helmet from 'helmet';

const HOST = '127.0.0.1'
const PORT = 3001;

const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());


app.listen(PORT, HOST, () => {
    return console.log(`server is listening on http://${HOST}:${PORT}`);
});