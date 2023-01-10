const Users = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Users;

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users ');
  const data = await res.json();

  return {
    props: {
      users: data,
    },
  };
}
