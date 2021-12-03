import axios from 'axios';
import { GetStaticProps } from "next";
import type { NextPage } from 'next'

interface User {
  name: string;
  id: number;
}

interface UsersPageProps {
    users: User[];
}

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const { users } = props;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersPage

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return {
    props: {
      users: data
    }
  }
}