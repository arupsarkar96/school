import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser'
import cors from 'cors';
import router from "./routes/router";
import configuration from "./config/serverconf";


const app = express();
app.use(cors({
    origin: '*'
}))
app.set('trust proxy', 1);
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/v1', router)
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'))

app.all('*', (req, res) => { res.sendStatus(404) })

app.listen(configuration.PORT, '0.0.0.0', () => {
    console.log(`API server is running on`, configuration.PORT)
})
