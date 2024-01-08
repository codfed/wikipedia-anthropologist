import React, { useEffect, useState } from 'react';
import UserLink from './UserLink';
import Date from './helpers/Date';
import Parser from './helpers/Parser';
import Contributions from './Contributions';

interface User {
  userid: number;
  name: string;
  registration: string;
  editcount: number;
  groups: string[];
  blockid: number;
  blockedby: string;
  blockedbyid: number;
  blockreason: string;
  blockexpiry: string;
  blocknocreate: string;
  blockedtimestamp: string;
  cancreate: boolean;
  centralids: string[];
  emailable: boolean;
  gender: string;
  groupmemberships: string[];
  implicitgroups: string[];
  rights: string[];
}

interface UserInfoProps {
  username: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ username }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // Add error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=users&ususers=${username}&usprop=blockinfo|cancreate|centralids|editcount|emailable|gender|groupmemberships|groups|implicitgroups|registration|rights&format=json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        const userData = data.query.users[0];
        console.log(userData);
        console.log(`userData.invalid: ${userData.hasOwnProperty('invalid')}`);
        if (userData.hasOwnProperty('invalid')) {
          throw new Error(
            "The Wikipedia API calls this user invalid. I've seen this with IP users."
          );
        }

        setUser({
          userid: userData.userid,
          name: userData.name,
          registration: userData.registration,
          editcount: userData.editcount,
          groups: userData.groups,
          blockid: userData.blockid,
          blockedby: userData.blockedby,
          blockedbyid: userData.blockedbyid,
          blockreason: userData.blockreason,
          blockexpiry: userData.blockexpiry,
          blocknocreate: userData.blocknocreate,
          blockedtimestamp: userData.blockedtimestamp,
          cancreate: userData.cancreate,
          centralids: userData.centralids,
          emailable: userData.emailable,
          gender: userData.gender,
          groupmemberships: userData.groupmemberships,
          implicitgroups: userData.implicitgroups,
          rights: userData.rights,
        });
      } catch (error) {
        console.error(error);
        console.error(`ERROR FROM CATCH ${error}`);
        setError(`${error}`); // Set the error message
      }
    };

    fetchData();
  }, [username]);

  return (
    <div>
      <h2>User Information</h2>
      {error ? ( // Render error message if an error occurred
        <div className="text-danger">{error}</div>
      ) : user ? (
        <div>
          {/* <span className="square bg-primary rounded-6"> */}
          <div className="border border-3 rounded-5 p-3">
            <p>
              <UserLink
                username={user.name}
                id={user.userid}
                includeWALink={false}
              />
            </p>
            <p>
              Registered on <Date dateString={user.registration} /> and has made{' '}
              <span className="important_number">
                {user.editcount.toLocaleString()}
              </span>{' '}
              edits
            </p>
          </div>
          {user.blockid && (
            <div className="border border-3 rounded-5 p-3">
              <p className="text-danger fw-bold">This User is Blocked</p>
              <p>
                On <Date dateString={user.blockedtimestamp} />
                <UserLink
                  username={user.blockedby}
                  id={user.blockedbyid}
                />
                blocked this user for:
                <Parser text={user.blockreason} />
              </p>
              <p>Expires: {user.blockexpiry}</p>
              <p>Block No Create: {user.blocknocreate}</p>
              <p>Block ID: {user.blockid}</p>
            </div>
          )}
          <div>
            <Contributions ucuser={user.name} />
          </div>

          <div className="border border-3 rounded-5 p-3">
            <h5>Boring details</h5>

            <p>User ID: {user.userid}</p>
            <p>Can Create: {user.cancreate}</p>
            {/* <p>Central IDs: {user.centralids}</p> */}
            <p>Emailable: {user.emailable}</p>
            <p>Gender: {user.gender}</p>
            <p>Groups: {user.groups.join(', ')}</p>
            <p>Group Memberships: {user.groupmemberships.join(', ')}</p>
            <p>Implicit Groups: {user.implicitgroups.join(', ')}</p>
            <p>Rights: {user.rights.join(', ')}</p>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default UserInfo;
