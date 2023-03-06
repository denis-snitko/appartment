import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { theme } from '@chakra-ui/pro-theme';
import { Route, Routes } from 'react-router-dom';

import '@fontsource/inter/variable.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './components/Layout';
import Credit from './pages/Credit';
import Repair from './pages/Repair';
import { RequireAuth } from './auth/RequireAuth';
import NotFound from './pages/NotFound';
import { AuthProvider } from './auth/AuthProvider';

export default function App() {
  const myTheme = extendTheme(
    {
      colors: { ...theme.colors, brand: theme.colors.purple },
    },
    theme
  );

  return (
    <ChakraProvider theme={myTheme}>
      <AuthProvider>
        <Routes>
          <Route path='/login' element={<Login />} />

          <Route path='/' element={<Layout />}>
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path='credit'
              element={
                <RequireAuth>
                  <Credit />
                </RequireAuth>
              }
            />
            <Route
              path='repair'
              element={
                <RequireAuth>
                  <Repair />
                </RequireAuth>
              }
            />
          </Route>

          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}
