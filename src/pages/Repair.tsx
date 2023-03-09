import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DataStatus from '../components/DataStatus';
import { Listing } from '../components/Listing';
import { useData } from '../store/store';
import { Status } from '../types';

const Credit = () => {
  const { pathname } = useLocation();

  const entities = useData((state: any) => state.entities);
  const status = useData((state: any): Status => state.status);
  const fetchData = useData((state: any): ((path: string) => Promise<void>) => state.fetchData);

  useEffect(() => {
    fetchData(pathname).then(() => {});
  }, [fetchData, pathname]);

  return (
    <>
      <DataStatus status={status} />
      {status === 'success' && entities.length > 0 && <Listing data={entities} />}
    </>
  );
};

export default Credit;
