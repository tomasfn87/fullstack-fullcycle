/* eslint-disable react-hooks/rules-of-hooks */
// import { useEffect, useState } from "react";
import axios from 'axios';
import { GetServerSideProps } from "next";
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

//   const [UsersPage, SetUsersPage] = useState<User[]>([]);

//   useEffect(() => {
//     (async () => {

//       SetUsersPage(data);
//     })();
//   }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersPage

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return {
    props: {
      users: data
    }
  }
}