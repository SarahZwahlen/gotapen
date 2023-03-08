import express from 'express';
import router from './routers/router';
import mongoose from 'mongoose';
const app = express();
const PORT = 3001;

app.use(express.static('/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('strictQuery', false);
mongoose.connect(
    'mongodb+srv://sarahZwahlen:123@cluster0.9lnobhu.mongodb.net/?retryWrites=true&w=majority',
);
mongoose.connection.on('error', () =>
    console.log('Erreur de connection à la bdd'),
);
mongoose.connection.on('open', () => {
    app.use('/', router);
    console.log('Connexion à la bdd établie');
});

app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`),
);
