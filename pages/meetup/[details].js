import React from 'react';
import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';

function details({ meetupdata }) {
  return (
    <MeetupDetails
      image={meetupdata.image}
      title={meetupdata.title}
      address={meetupdata.address}
      description={meetupdata.description}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://talhabinkhalil:talha52okaa@cluster0.mbawz.mongodb.net/meetupdb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const dataCollection = db.collection('meetups');

  const meetup = await dataCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetup.map((data) => ({ params: { details: data._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.details;

  const client = await MongoClient.connect(
    'mongodb+srv://talhabinkhalil:talha52okaa@cluster0.mbawz.mongodb.net/meetupdb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const dataCollection = db.collection('meetups');

  // const meetup = await dataCollection.find({}, { _id: 1 }).toArray();
  const meetup = await dataCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupdata: {
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
      },
    },
  };
}

export default details;
