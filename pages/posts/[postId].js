import { useRouter } from 'next/router';

const Post = ({ post }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h2>
        {post.id}
        {` ${post.title}`}
      </h2>
      <p>{post.body}</p>
    </div>
  );
};

export default Post;

export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();

  return {
    paths: data.slice(0, 3).map((post) => ({
      params: { postId: String(post.id) },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: data,
    },
  };
}
