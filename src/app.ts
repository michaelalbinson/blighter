import express from 'express';
import helmet from "helmet";

const app = express();

app.use(helmet());

app.get('/', (req, res) => {
    res.send('Successful response.');
});

app.listen(3000, () => console.log('Example app is listening on port 3000.'));