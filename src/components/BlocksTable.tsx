import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTable, Column } from 'react-table';
import Button from './Button';
import Parser from './helpers/Parser';
import Date from './helpers/Date';
import UserLink from './UserLink';

interface Props {
  query_id?: number;
}

interface WikipediaBlock {
  user: string;
  id: number;
  reason: string;
  expiry: string;
  by: string;
  comment: string;
}

const BlocksTable = ({ query_id = 2 }: Props) => {
  const params = useParams();
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
          <>
            <UserLink
              username={props.value}
              id={props.row.values['userid']}
            />
          </>
        ),
      },

      {
        Header: 'Reason',
        accessor: 'reason',
        Cell: (props) => <Parser text={props.value} />,
      },
      {
        Header: 'Expiry',
        accessor: 'expiry',
        Cell: (props) => <Date dateString={props.value} />,
      },
      {
        Header: 'Comment',
        accessor: 'comment',
      },
      {
        Header: 'Blocked By',
        accessor: 'by',
        Cell: (props) => (
          <UserLink
            username={props.value}
            id={props.row.values['byid']}
          />
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const URL =
    'https://en.wikipedia.org/w/api.php?action=query&origin=*&list=blocks&bkprop=id|user|userid|by|byid|timestamp|expiry|reason|flags|restrictions&formatversion=2&bkdir=older&bklimit=500&format=json';

  useEffect(() => {
    document.title = `Blocks`;
    const fetchData = async () => {
      const response = await fetch(URL);
      response.json().then((data) => {
        let filteredData: WikipediaBlock[] = [];
        const filter = params.type ?? 'default'; // Provide a default value for params.type
        if (filter != 'default') {
          filteredData = data.query.blocks.filter((block: WikipediaBlock) =>
            block.reason.toLowerCase().includes(filter.toLowerCase())
          );
        } else {
          filteredData = data.query.blocks;
        }

        setData(filteredData);
      });
    };

    fetchData();
  }, []);
  return (
    <div>
      <h1>Blocked users {params.type ? ' filtered by ' + params.type : ''}</h1>

      <Button
        color="info"
        onClick={() => {
          window.location.href = '/wikipedia-anthropologist/#/blocks';
          window.location.reload();
        }}
      >
        All
      </Button>
      <Button
        color="info"
        onClick={() => {
          window.location.href = '/wikipedia-anthropologist/#/blocks/vandalism';
          window.location.reload();
        }}
      >
        Vandalism
      </Button>
      <Button
        color="info"
        onClick={() => {
          window.location.href = '/wikipedia-anthropologist/#/blocks/promotion';
          window.location.reload();
        }}
      >
        Promotion
      </Button>
      <Button
        color="info"
        onClick={() => {
          window.location.href = '/wikipedia-anthropologist/#/blocks/puppet';
          window.location.reload();
        }}
      >
        Sock Puppet
      </Button>

      <table
        className="table"
        {...getTableProps}
      >
        <thead>
          {headerGroups.map((headerGroup, headerIndex) => (
            <tr
              key={`${headerIndex}-${headerGroup.id}`}
              {...headerGroup.getHeaderGroupProps}
            >
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps}
                  style={{
                    width: '600px',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={row.id}
                {...row.getRowProps}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      key={`${rowIndex}-${cell.column.id}`}
                      {...cell.getCellProps}
                      style={{
                        width: '600px',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
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
