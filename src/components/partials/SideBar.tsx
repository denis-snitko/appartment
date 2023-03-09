import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box p={4}>
      <Container maxW='container.2xl'>
        <Outlet />
      </Container>
    </Box>
  );
};

export default Sidebar;
