import Link from 'next/link';

const Articles = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <Link href={`articles/${article.id}`}>
            <h2>
              {article.id}
              {` ${article.title}`} | {` ${article.category}`}
            </h2>
          </Link>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Articles;

export async function getServerSideProps() {
  const res = await fetch('http://localhost:4000/articles');
  const data = await res.json();

  return {
    props: {
      articles: data,
    },
  };
}
