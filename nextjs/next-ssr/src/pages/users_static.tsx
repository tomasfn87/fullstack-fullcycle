import axios from 'axios';
import { GetStaticProps } from "next";
import type { NextPage } from 'next'
import { useState, useEffect } from 'react';
import useSwr from 'swr';
import Router from 'next/router';
import { fetcher } from './users';

interface User {
  name: string;
  id: number;
}

const UsersPage: NextPage = (props) => {
  // const { users } = props;

  const [users, setUsers] = useState<User[]>([]);

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
    if (error.response.status === 401) {
      Router.push("/login")
    }
  }, [error]);

  return (
    data && <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersPage;

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}