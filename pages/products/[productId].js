import { useRouter } from 'next/router';

const Product = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h2>
        {product.id}
        {` ${product.title}`}
        {` ${product.price}`}
      </h2>
      <p>{product.description}</p>
    </div>
  );
};

export default Product;

export async function getStaticPaths() {
  const res = await fetch('http://localhost:4000/products');
  const data = await res.json();

  return {
    paths: data.map((product) => ({
      params: { productId: String(product.id) },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const res = await fetch(`http://localhost:4000/products/${params.productId}`);
  const data = await res.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product: data,
    },
    revalidate: 5,
  };
}
