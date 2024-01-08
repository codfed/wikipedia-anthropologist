import React, { useState, useEffect } from 'react';
import { useTable, Column } from 'react-table';
import Date from './helpers/Date';
import RevisionDifference from './RevisionDifference';

interface Contribution {
  comment: string;
  ids: number;
  parsedcomment: string;
  size: number;
  sizediff: number;
  tags: string[];
  timestamp: string;
  title: string;
}

interface ContributionsProps {
  ucuser: string;
}

const Contributions: React.FC<ContributionsProps> = ({ ucuser }) => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&origin=*&list=usercontribs&uclimit=500&ucprop=comment|parsedcomment|ids|size|sizediff|tags|timestamp|title&ucuser=${ucuser}&format=json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const userContributions = data.query.usercontribs as Contribution[];
        setContributions(userContributions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [ucuser]);

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'ids',
      },
      {
        Header: 'Date________',
        accessor: 'timestamp',
        Cell: ({ value }: { value: string }) => <Date dateString={value} />,
      },
      {
        Header: 'Title',
        accessor: 'title',
        Cell: ({ value }: { value: string }) => (
          <a
            href={`https://en.wikipedia.org/wiki/${value}`}
            target="_blank"
          >
            {value}
          </a>
        ),
      },
      {
        Header: 'Comment',
        accessor: 'parsedcomment',
        Cell: ({ value }: { value: string }) => (
          <div dangerouslySetInnerHTML={{ __html: value }} />
        ),
      },
      {
        Header: 'Sizediff',
        accessor: 'sizediff',
      },
      {
        Header: 'Diff',
        accessor: 'revid',
        Cell: (props) => (
          <>
            <RevisionDifference
              title={props.row.values['title']}
              fromrev={props.value}
            />
            <a
              href={
                'https://en.wikipedia.org/w/index.php?title=' +
                props.row.values['title'] +
                '&diff=prev&oldid=' +
                props.value
              }
              target="_blank"
            >
              {' '}
              {props.value}
            </a>
          </>
        ),
      },
      {
        Header: 'Tags',
        accessor: 'tags',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: contributions });

  return (
    <div>
      <h2>Contributions</h2>
      <table
        {...getTableProps()}
        className="table table-striped"
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Contributions;
