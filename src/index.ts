import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser'
import cors from 'cors';
import configuration from "./config";
import v1Router from "./v1";


const app = express();
app.use(cors({
    origin: 'http://localhost:3003'
}))
app.set('trust proxy', 1);
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1', v1Router)
// app.all('*', (req, res) => { res.sendStatus(404) })
app.use(express.static('public'))


app.listen(configuration.PORT, '0.0.0.0', () => {
    console.log(`API server is running on`, configuration.PORT)
})