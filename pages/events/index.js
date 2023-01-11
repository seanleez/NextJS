import { useState } from 'react';
import { useRouter } from 'next/router';
const EventsList = ({ eventsProps }) => {
  const [events, setEvents] = useState(eventsProps);
  const router = useRouter();
  const fetchSportsEvents = async () => {
    const response = await fetch('http://localhost:4000/events?category=sports');
    const data = await response.json();
    setEvents(data);
    router.push('/events?category=sports', undefined, { shallow: true });
  };

  return (
    <div>
      <button onClick={fetchSportsEvents}>Fetch Sports Events</button>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>
            {event.title} | {event.description} | {event.category} | {event.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EventsList;

export async function getServerSideProps(context) {
  const { query } = context;
  const { category } = query;
  const queryString = category ? 'category=sports' : '';
  console.log(category);
  const res = await fetch(`http://localhost:4000/events?${queryString}`);
  const data = await res.json();

  return {
    props: {
      eventsProps: data,
    },
  };
}
