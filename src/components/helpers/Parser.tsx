import React from 'react';
import { renderToString } from 'react-dom/server';
import UserLink from '../UserLink';

interface ParserProps {
  text: string;
}

const parseAndRenderText = (inputText: string): JSX.Element => {
  const linkRegex = /\[\[(.+?)\|(.+?)\]\]/g;

  const replaceLinks = (
    match: string,
    page: string,
    displayText: string
  ): string => {
    return `<a href="https://en.wikipedia.org/wiki/${page}" target="_blank">${displayText}</a>`;
  };

  const parsedText = inputText.replace(linkRegex, replaceLinks);

  return <span dangerouslySetInnerHTML={{ __html: parsedText }} />;
};

const Parser: React.FC<ParserProps> = ({ text }) => {
  return <>{parseAndRenderText(text)}</>;
};

export default Parser;
