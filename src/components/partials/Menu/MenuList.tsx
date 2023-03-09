import { FC } from 'react';
import { MenuProps } from '../../../types';
import MenuItem from './MenuItem';

const MenuList: FC<MenuProps> = ({ links }) => {
  return (
    <>
      {links.map(({ id, label, path }) => (
        <MenuItem key={id} path={path}>
          {label}
        </MenuItem>
      ))}
    </>
  );
};

export default MenuList;
