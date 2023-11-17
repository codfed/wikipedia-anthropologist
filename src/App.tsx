import * as React from 'react';
import logo from './logo.svg';
import Button from './components/Button';
import './App.css';
import { useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';

interface WikipediaEdit {
  title: string;
  pageid: number;
  revid: number;
  old_revid: number;
  user: string;
  comment: string;
}

function App() {
  const [temp, setTemp] = useState(0);
  const [data, setData] = useState<WikipediaEdit[]>([]);

  // const data = React.useMemo(() => fakeWikipediaData.query.recentchanges, []);

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Title',
        accessor: 'title',
        Cell: (props) => (
          <a
            href={
              'http://en.wikipedia.org/?curid=' + props.row.values['pageid']
            }
          >
            {' '}
            {props.value}
          </a>
        ),
      },
      {
        Header: 'Page ID',
        accessor: 'pageid',
        Cell: (props) => (
          <a
            href={'http://en.wikipedia.org/?curid=' + props.value}
            target="blank"
          >
            {' '}
            {props.value}
          </a>
        ),
      },

      {
        Header: 'Current Revision ID',
        accessor: 'revid',
        Cell: (props) => (
          <a
            href={
              'https://en.wikipedia.org/w/index.php?title=User%3A' +
              props.row.values['user'] +
              '%2Fsandbox&diff=' +
              props.row.values['revid'] +
              '&oldid=' +
              props.row.values['old_revid']
            }
            target="blank"
          >
            {' '}
            {props.value}
          </a>
        ),
      },
      {
        Header: 'Previous Revision ID',
        accessor: 'old_revid',
      },
      {
        Header: 'User',
        accessor: 'user',
        Cell: (props) => (
          <a
            href={'https://en.wikipedia.org/wiki/User:' + props.value}
            target="blank"
          >
            {' '}
            {props.value}
          </a>
        ),
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const URL =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&rctype=edit&rcprop=title|ids|rctype|comment|user|tags|flags&list=recentchanges&format=json';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      response.json().then((data) => {
        console.log(data);
        setData(data.query.recentchanges);
      });
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wikipedia Recent Changes</h1>
        <table
          className="table"
          {...getTableProps}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Button
          color="danger"
          onClick={() => alert('Button clicked!!!')}
        >
          We're gonna need a bigger boat
        </Button>

        <p>
          I have always been interested in the human element behind Wikipedia.
          In October 2023 I started to play around with the Wikipedia API in
          some Jekyll files. I got sick of building tables through javascript to
          display the results. This app is an experiment to see how React
          handles this task.
        </p>
        <a
          className="App-link"
          href="https://codfed.github.io/github-pages-with-docker/"
          target="_blank"
          rel="noopener noreferrer"
        >
          This was the work leading up to this.
        </a>
      </header>
    </div>
  );
}

export default App;
