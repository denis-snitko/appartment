import { Tr, Td, Link } from '@chakra-ui/react';
import { FC } from 'react';
import { formatDate } from '../../helpers';
import { ListingRowProps } from '../../types';

const ListingRow: FC<ListingRowProps> = ({ item, index }) => {
  return (
    <Tr key={item.id}>
      <Td isNumeric>{index + 1}</Td>
      <Td>{formatDate(item.date)}</Td>
      <Td>{item.comment}</Td>
      <Td>
        <Link href={item.billUrl} target='_blank' rel='noopener noreferrer' color={'blue.600'}>
          Показать чек
        </Link>
      </Td>
      <Td isNumeric>{item.paid}</Td>
    </Tr>
  );
};

export default ListingRow;
