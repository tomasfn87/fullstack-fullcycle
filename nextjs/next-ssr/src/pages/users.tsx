/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import axios from 'axios';
import { GetServerSideProps, NextPage } from "next";
import useSwr from 'swr';
import { withIronSessionSsr } from "iron-session/next";
import ironConfig from '../util/iron-config';

interface User {
  name: string;
}

interface UsersPageProps {
  users: User[];
}

const fetcher = (url: string) => {
  return axios.get(url).then((res) => res.data);
}

const UsersPage: NextPage<UsersPageProps> = (props) => {
  const { users: usersInit } = props;
  const [users, setUsers] = useState<User[]>(usersInit);

  const { data, error } = useSwr("http://localhost:3000/api/users", fetcher, {
    fallbackData: users,
    refreshInterval: 5000 // miliseconds
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    setUsers(data);
  }, [data]);

  useEffect(() => {
    if (!error) {
      return;
    } 
    console.error(error)
  }, [error]);

  return (
    <ul>
      {users.map((user, key) => (
        <li key={key}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
  async (context) => {

    const {session} = context.req;

    if (!session.user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false
        }
      };
    }

    const { data } = await axios.get(
      'http://localhost:3000/api/users', {
        headers: {
          cookie: context.req.headers.cookie as string
        } 
      }
    );

    return {
      props: {
        users: data,
      },
    };
  }, 
  ironConfig
);