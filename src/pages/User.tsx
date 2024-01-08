import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UserInfo from '../components/UserInfo';

interface UserParams {
  [key: string]: string | undefined;
  username: string;
}

const User: React.FC = () => {
  const { username = '' } = useParams<UserParams>();
  document.title = `${username} user page`;
  return (
    <>
      <UserInfo username={username} />
    </>
  );
};

export default User;

// export default function User() {
//   return (
//     <>
//       <h3>User Page</h3>
//     </>
//   );
// }
