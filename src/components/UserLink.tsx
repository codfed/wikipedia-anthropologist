import React from 'react';

interface UserLinkProps {
  username: string;
  id?: number;
  includeWALink?: boolean;
}

interface UserLinkTitleProps {
  includeWALink: boolean;
  username: string;
}

const UserLinkTitle: React.FC<UserLinkTitleProps> = ({
  includeWALink = true,
  username,
}) => {
  if (includeWALink) {
    return (
      <>
        <a
          href={'/wikipedia-anthropologist/#/user/' + username}
          target="_blank"
          className="wa-theme-color"
        >
          {username}
        </a>
      </>
    );
  } else {
    return <span className="user-title">{username}</span>;
  }
};

const UserLink: React.FC<UserLinkProps> = ({
  username,
  id,
  includeWALink = true,
}) => {
  return (
    <>
      {' '}
      <UserLinkTitle
        includeWALink={includeWALink}
        username={username}
      />
      <small>
        {'['}
        <a
          href={'https://en.wikipedia.org/wiki/User:' + username}
          target="_blank"
          className="text-muted"
        >
          {'talk'}
        </a>
        {'|'}
        <a
          href={
            'https://en.wikipedia.org/wiki/Special:Contributions/' + username
          }
          target="_blank"
          className="text-muted"
        >
          {'contribs'}
        </a>
      </small>
      {'] '}
    </>
  );
};

export default UserLink;
