import { HStack } from '@chakra-ui/react';
import { FC } from 'react';
import { MenuProps } from '../../../types';
import MenuList from './MenuList';

const MenuMobile: FC<MenuProps> = ({ links }) => (
  <HStack as={'nav'} spacing={1}>
    <MenuList links={links} />
  </HStack>
);

export default MenuMobile;
