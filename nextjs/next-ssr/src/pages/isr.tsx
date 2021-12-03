import axios from 'axios';
import { GetStaticProps } from "next";
import type { NextPage } from 'next'

interface Data {
  title: string;
  id: number;
};

interface IsrPageProps {
  data: Data[];
};

const IsrPage: NextPage<IsrPageProps> = (props) => {
  const { data } = props;

  return (
    <ul>
      {data.map((row) => (
        <li key={row.id}>{row.title}</li>
      ))}
    </ul>
  );
};

export default IsrPage

export const getStaticProps: GetStaticProps = async () => {
  const random = Math.floor(Math.random() * 11) ; // 0 a 10

  const { data } = await axios.get(
  random % 2 === 0 
    ? 'https://jsonplaceholder.typicode.com/albums' 
    : 'https://jsonplaceholder.typicode.com/posts'
  );

  return {
    props: {
      data: data
    },
    revalidate: 2, // tempo, para que a página seja renderizada mais frequentemente, i.e: 60 (segundos)
  };
};

//   SSR   +  SSG
// runtime + static