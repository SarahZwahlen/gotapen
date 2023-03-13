import mongoose, { Mongoose } from 'mongoose';

let connection: Mongoose;
const connectDBForTesting = async () => {
    try {
        const dbUri =
            'mongodb+srv://sarahZwahlen:123@cluster0.9lnobhu.mongodb.net/?retryWrites=true&w=majority';
        const dbName = 'testDB';
        connection = await mongoose.connect(dbUri, {
            dbName,
            autoCreate: true
        });

        await clearDatabase();
    } catch (error) {
        console.log('Error to db connection');
    }
};

const disconnectDBForTesting = async () => {
    try {
        await connection.connection.dropDatabase();
        await mongoose.connection.close();
    } catch (error) {
        console.log('Error to db disconnection');
    }
};

const clearDatabase = async () => {
    const collections = mongoose.connection.collections;
    await Promise.all(
        Object.keys(collections).map(
            async (collectionId) => await collections[collectionId].deleteMany()
        )
    );
};

export { connectDBForTesting, disconnectDBForTesting, clearDatabase };
