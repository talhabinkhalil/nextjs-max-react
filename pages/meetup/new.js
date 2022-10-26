import { useRouter } from 'next/router';
import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function AddNewMeetup() {
  const router = useRouter();
  const handleAddMeetup = async (data) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (responseData.status == 201) {
      router.push('/');
    }
  };
  return <NewMeetupForm onAddMeetup={handleAddMeetup} />;
}

export default AddNewMeetup;
