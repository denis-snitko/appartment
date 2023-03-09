import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, Container, Flex, IconButton, HStack, Button } from '@chakra-ui/react';
import { FC } from 'react';
import { MenuDesktop, MenuMobile } from '.';
import { HeaderProps } from '../../types';
import AddBill from '../AddBill';

const Header: FC<HeaderProps> = ({ links, isOpen, onOpen, onClose, pathname, logoutHandler }) => {
  return (
    <Box bg='gray.100' px={4}>
      <Container maxW='container.2xl'>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <MenuDesktop links={links} />
          </HStack>
          <Flex alignItems={'center'}>
            <Box me={4}>
              <AddBill pathname={pathname} />
            </Box>
            <Button variant='solid' colorScheme='orange' size='sm' onClick={logoutHandler}>
              Выйти
            </Button>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <MenuMobile links={links} />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default Header;
