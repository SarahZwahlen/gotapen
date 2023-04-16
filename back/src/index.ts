import * as dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import router from './routers/router';
import mongoose from 'mongoose';
import cors from 'cors';
import { UserType } from './infrasturcture/models/user';
dotenv.config();

const app = express();
const PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            sameSite: true
        }
    })
);
app.use(
    cors({
        origin: process.env.FRONT_LOCAL_URL,
        credentials: true,
        optionsSuccessStatus: 200
    })
);

declare module 'express-session' {
    interface SessionData {
        user: UserType;
    }
}

mongoose.set('strictQuery', false);
mongoose.set('toJSON', {
    getters: true
});
mongoose.set('toObject', {
    getters: true
});
mongoose.connect(
    'mongodb+srv://sarahZwahlen:123@cluster0.9lnobhu.mongodb.net/?retryWrites=true&w=majority'
);
mongoose.connection.on('error', () =>
    console.log('Erreur de connection à la bdd')
);
mongoose.connection.on('open', () => {
    app.use('/', router);
    console.log('Connexion à la bdd établie');
});

app.listen(PORT, () =>
    console.log(`Server is running at ${process.env.BACK_LOCAL_URL}`)
);
