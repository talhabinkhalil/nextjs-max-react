import { Fragment, useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browser a list of highly active meetup"
        ></meta>
      </Head>
      <MeetupList meetups={props.meetupsList} />;
    </Fragment>
  );
}
export async function getStaticProps() {
  const client = await MongoClient.connect(
    'mongodb+srv://talhabinkhalil:talha52okaa@cluster0.mbawz.mongodb.net/meetupdb?retryWrites=true&w=majority'
  );
  const db = client.db();

  const dataCollection = db.collection('meetups');

  const meetups = await dataCollection.find().toArray();

  client.close();

  return {
    props: {
      meetupsList: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 5,
    // revalidate: 12, // takes seconds as input. after that time , page will be again pre-rendered
  };
}

// export async function getServerSideProps(context) {
//   console.log('----', context.req, 'ssss', context.res, 'Ran');
//   return {
//     props: {
//       meetupsList: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
