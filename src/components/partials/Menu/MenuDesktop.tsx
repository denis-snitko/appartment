import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MenuProps } from '../../../types';
import MenuList from './MenuList';

const MenuDesktop: FC<MenuProps> = ({ links }) => (
  <HStack as={'nav'} spacing={1} display={{ base: 'none', md: 'flex' }}>
    <MenuList links={links} />
  </HStack>
);

export default MenuDesktop;
