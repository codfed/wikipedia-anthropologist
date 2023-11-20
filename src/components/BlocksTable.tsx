import React, { ReactNode, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTable, Column } from 'react-table';
import Button from './Button';

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
        color="primary"
        onClick={() =>
          (window.location.href = '/wikipedia-anthropologist/blocks')
        }
      >
        All
      </Button>
      <Button
        color="primary"
        onClick={() =>
          (window.location.href = '/wikipedia-anthropologist/blocks/vandalism')
        }
      >
        Vandalism
      </Button>
      <Button
        color="primary"
        onClick={() =>
          (window.location.href = '/wikipedia-anthropologist/blocks/promotion')
        }
      >
        Promotion
      </Button>
      <Button
        color="primary"
        onClick={() =>
          (window.location.href = '/wikipedia-anthropologist/blocks/puppet')
        }
      >
        Sock Puppet
      </Button>

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
