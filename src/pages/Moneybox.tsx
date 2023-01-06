import { Center, Spinner, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Data } from '../types';
import { useData } from '../store/store';

const Moneybox = () => {
  const { pathname } = useLocation();
  
  const entities = useData((state: any) => state.entities);
  const status = useData((state: any) => state.status);
  const fetchData = useData((state: any) => state.fetchData);
  
  const totalSum =
    entities && entities.map((item: Data) => item.paid).reduce((sum: any, elem: any) => sum + elem, 0).toFixed(2);
  
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
  
  return (
    <TableContainer>
      <Table variant="striped" size="sm">
        <Thead>
          <Tr>
            <Th isNumeric w={20}>№</Th>
            <Th>Дата</Th>
            <Th isNumeric>Сумма</Th>
          </Tr>
        </Thead>
        <Tbody>
          {entities &&
            entities.map((item: any, index: number) => {
              const formattedDate = item.date.split('-').reverse().join('.');
              
              return (
                <Tr key={item.id}>
                  <Td isNumeric>{index + 1}</Td>
                  <Td>{formattedDate}</Td>
                  <Td isNumeric>{item.paid}</Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Text fontSize="lg" py={2}>
                Итого:
              </Text>
            </Th>
            <Th></Th>
            <Th isNumeric>
              <Text fontSize="lg" py={2}>
                {totalSum}
              </Text>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Moneybox;
