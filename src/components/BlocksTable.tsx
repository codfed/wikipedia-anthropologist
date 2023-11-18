import React, { ReactNode, useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';

interface Props {
  children: ReactNode;
}

interface WikipediaBlock {
  user: string;
  id: number;
  reason: string;
  expiry: string;
  by: string;
  comment: string;
}

const BlocksTable = ({ children }: Props) => {
  const [data, setData] = useState<WikipediaBlock[]>([]);

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'User',
        accessor: 'user',
        Cell: (props) => (
          <div>
            <a
              href={'https://en.wikipedia.org/wiki/User:' + props.value}
              target="blank"
            >
              {' '}
              {props.value}
            </a>
            <br />
            <a
              href={
                'https://en.wikipedia.org/wiki/Special:Contributions/' +
                props.value
              }
              target="blank"
            >
              {' '}
              {'(contribs)'}
            </a>
          </div>
        ),
      },

      {
        Header: 'Reason',
        accessor: 'reason',
      },
      {
        Header: 'Expiry',
        accessor: 'expiry',
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
      {
        Header: 'Blocked By',
        accessor: 'by',
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
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const URL =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&list=blocks&formatversion=2&bkdir=older&bklimit=500&format=json';
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(URL);
      response.json().then((data) => {
        console.log(data);
        setData(data.query.blocks);
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

export default BlocksTable;
