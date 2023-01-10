import Link from 'next/link';

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`posts/${post.id}`}>
            <h2>
              {post.id}
              {` ${post.title}`}
            </h2>
          </Link>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await res.json();
  return {
    props: {
      posts: data,
    },
    revalidate: 5,
  };
}
