import React from 'react';
import moment from 'moment';

interface DateProps {
  dateString: string;
}

const formatDate = (dateString: string): string => {
  const date = moment(dateString);
  const returnDate = date.isValid() ? date.format('YYYY-MM-DD') : dateString;
  return returnDate;
};

const Date: React.FC<DateProps> = ({ dateString }) => {
  const formattedDate = formatDate(dateString);

  return (
    <>
      <span className="date-text">{formattedDate}</span>
    </>
  );
};

export default Date;
