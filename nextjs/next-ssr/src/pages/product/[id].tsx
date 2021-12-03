import { useRouter } from "next/dist/client/router";
import { GetStaticPaths, GetStaticProps } from "next";
import axios from 'axios'

export const ProductPage = () => {

    const router = useRouter();

    const {id} = router.query

    return (
        <div>
            Product {id}
        </div>
    );
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return {
    props: {
      users: data
    },
    revalidate: 20,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { id: '123' }}],
        fallback: true, // quando verdadeiro, os parâmetros serão gerados a partir do momento em que forem acessados
    };
};