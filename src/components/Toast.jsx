import { useToast } from '@chakra-ui/react';

const Toast = ({ title, status }) => {
  const toast = useToast();
  return (
    <>
      {toast({
        title,
        status,
        position: 'top',
        duration: 6000,
        isClosable: true,
      })}
    </>
  );
};

export default Toast;
