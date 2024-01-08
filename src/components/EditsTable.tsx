import React, { ReactNode, useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import UserLink from './UserLink';

interface Props {
  children: ReactNode;
}

interface WikipediaEdit {
  title: string;
  pageid: number;
  revid: number;
  old_revid: number;
  user: string;
  comment: string;
}

const EditsTable = ({ children }: Props) => {
  const [data, setData] = useState<WikipediaEdit[]>([]);

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
          <>
            <UserLink
              username={props.value}
              id={props.row.values['userid']}
            />
          </>
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
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&rctype=edit&rcprop=title|ids|rctype|comment|user|tags|flags&list=recentchanges&rclimit=500&format=json';
  useEffect(() => {
    document.title = `Edits`;
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
    <div>
      <h1>{children}</h1>
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
                  return <td {...cell.getCellProps}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditsTable;
