import { TableContainer, Thead, Tr, Th, Tbody, Tfoot, Table, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { ListingProps } from '../../types';
import ListingRow from './ListingRow';

const Listing: FC<ListingProps> = ({ data }) => {
  const totalSum =
    data
      ?.map((item) => item.paid)
      .reduce((sum, elem) => sum + elem, 0)
      ?.toFixed(2) || '0.00';
  return (
    <TableContainer>
      <Table variant='striped' size='sm'>
        <Thead>
          <Tr>
            <Th isNumeric w={20}>
              №
            </Th>
            <Th>Дата</Th>
            <Th>Комментарий</Th>
            <Th>Чек (ссылка)</Th>
            <Th isNumeric>Сумма</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <ListingRow key={item.id} item={item} index={index} />
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>
              <Text fontSize='lg' py={2}>
                Итого:
              </Text>
            </Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th isNumeric>
              <Text fontSize='lg' py={2}>
                {totalSum}
              </Text>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default Listing;
