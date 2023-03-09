import { Center, Spinner } from '@chakra-ui/react';
import { Status } from '../types';

const DataStatus = ({ status }: { status: Status }) => {
  if (status === 'loading') {
    return (
      <Center bg='transparent' h='100vh'>
        <Spinner size='md' />
      </Center>
    );
  }

  if (status === 'error') {
    return (
      <Center bg='transparent' h='100vh'>
        Error loading data or no data
      </Center>
    );
  }

  return null;
};

export default DataStatus;
