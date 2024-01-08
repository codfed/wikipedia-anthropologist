// RevisionDifference.tsx
import React, { useEffect, useState, lazy, Suspense } from 'react';
import Modal from 'react-modal';
import Button from './Button';

Modal.setAppElement('#root'); // Add this line

interface RevisionDifference {
  fromid: number;
  fromrevid: number;
  fromns: number;
  fromtitle: string;
  toid: number;
  torevid: number;
  tons: number;
  totitle: string;
  formatted_diff: string;
  // '*': string; // Assuming the value is a string, adjust if needed
}

interface RevisionDifferenceProps {
  title: string;
  fromrev: string;
}

const RevisionDifference: React.FC<RevisionDifferenceProps> = ({
  title,
  fromrev,
}) => {
  const [revisionDifference, setRevisionDifference] =
    useState<RevisionDifference | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      // Modal is already open, fetch data or perform any other actions here
      fetchData();
    }
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const url = `https://en.wikipedia.org/w/api.php?action=compare&origin=*&fromtitle=${title}&fromrev=${fromrev}&torelative=prev&format=json`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
      }

      const data = await response.json();
      const differenceData = data.compare;

      setRevisionDifference({
        fromid: differenceData.fromid,
        fromrevid: differenceData.fromrevid,
        fromns: differenceData.fromns,
        fromtitle: differenceData.fromtitle,
        toid: differenceData.toid,
        torevid: differenceData.torevid,
        tons: differenceData.tons,
        totitle: differenceData.totitle,
        formatted_diff: differenceData['*'],
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        color="info"
        onClick={openModal}
      >
        View Revision
      </Button>
      {revisionDifference ? (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
        >
          {/* Modal content here */}
          <h2>{revisionDifference?.totitle}</h2>
          <table className="diff diff-type-table diff-contentalign-left diff-editfont-monospace">
            <colgroup>
              <col className="diff-marker" />
              <col className="diff-content" />
              <col className="diff-marker" />
              <col className="diff-content" />
            </colgroup>
            <tbody
              dangerouslySetInnerHTML={{
                __html: revisionDifference?.formatted_diff || '',
              }}
            ></tbody>
          </table>
        </Modal>
      ) : isLoading ? (
        <p>Loading difference data...</p>
      ) : null}
    </>
  );
};

export default RevisionDifference;
