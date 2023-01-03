import { Center, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Listing from '../components/Listing';
import { useData } from '../store/store';

const Credit = () => {
  const { pathname } = useLocation();
  
  const entities = useData((state: any) => state.entities);
  const status = useData((state: any) => state.status);
  const fetchData = useData((state: any) => state.fetchData);
  
  
  useEffect(() => {
    fetchData(pathname).then(() => {});
  }, [fetchData, pathname]);
  
  if (status === 'loading') {
    return (
      <Center bg="transparent" h="100vh">
        <Spinner size="md" />
      </Center>
    );
  }
  
  if (!entities.length) {
    return (
      <Center bg="transparent" h="100vh">
        No data
      </Center>
    );
  }
  
  return <Listing data={entities} />;
};

export default Credit;
