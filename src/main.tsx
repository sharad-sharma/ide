import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, DarkMode } from '@chakra-ui/react';
import App from './App';
import { SettingsProvider } from './components/SettingsContext';
import { WorkspaceInitializer } from './components/WorkspaceInitializer';
import 'tailwindcss/tailwind.css';
import './styles/globals.css';
import './styles/firepad.css';
import theme from './theme';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <DarkMode>
        {/* Actually maybe workspace initializer should go inside App.tsx. Future todo I guess */}
        <WorkspaceInitializer>
          <SettingsProvider>
            <App />
          </SettingsProvider>
        </WorkspaceInitializer>
      </DarkMode>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
