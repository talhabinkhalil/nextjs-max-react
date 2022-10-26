import { MongoClient } from 'mongodb';
//api-newmeetup
//POST requests
async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      const client = await MongoClient.connect(
        'mongodb+srv://talhabinkhalil:talha52okaa@cluster0.mbawz.mongodb.net/meetupdb?retryWrites=true&w=majority'
      );
      const db = client.db();

      const dataCollection = db.collection('meetups');

      const result = await dataCollection.insertOne(data);
      client.close();

      res.status(201).json({ message: 'Meetup inseted', status: 201 });
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
}

export default handler;
