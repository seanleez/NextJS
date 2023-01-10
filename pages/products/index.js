import Link from 'next/link';

const Products = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <Link href={`products/${product.id}`}>
            <h2>
              {product.id}
              {` ${product.title}`}
              {` ${product.price}`}
            </h2>
          </Link>
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;

export async function getStaticProps() {
  const res = await fetch('http://localhost:4000/products');
  const data = await res.json();
  return {
    props: {
      products: data,
    },
    revalidate: 5,
  };
}
