import { useColorModeValue, Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';

const MenuItem = ({ path, children }: { path: string; children: ReactNode }) => (
  <Link
    px={6}
    py={1}
    rounded={'sm'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.300', 'gray.700'),
    }}
    _activeLink={{
      bg: useColorModeValue('gray.300', 'gray.700'),
    }}
    as={RouterLink}
    to={path}>
    {children}
  </Link>
);

export default MenuItem;
