import { useDisclosure } from '@chakra-ui/react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import { Link } from '../types';
import { Header, Sidebar } from './partials';

export default function Layout() {
  const navigate = useNavigate();

  const { user, signOut } = useAuth();
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    signOut(() => navigate('/login'));
  };

  if (!user) {
    return <Navigate to='/login' />;
  }

  const links: Link[] = [
    {
      id: 1,
      label: 'Кредит',
      path: '/credit',
    },
    {
      id: 2,
      label: 'Ремонт',
      path: '/repair',
    },
  ];

  return (
    <>
      <Header
        links={links}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        pathname={pathname}
        logoutHandler={logoutHandler}
      />

      <Sidebar />
    </>
  );
}
