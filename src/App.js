import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Media from "./components/Media";
import LayoutApp from "./components/LayoutApp";

import { ThemeProvider, Theme } from '@aws-amplify/ui-react';

//import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';

import { withAuthenticator,
  Authenticator, View, Image, Button, Heading, Text, useTheme, useAuthenticator
} from '@aws-amplify/ui-react';

import '@aws-amplify/ui-react/styles.css';

const theme = {
  name: 'my-theme',
  tokens: {

  },
};

let router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutApp />,
    children: [
      {
        index: true,
        Component: Media,
      }
    ],
  }
]);



const App = ({ signOut, user }) => {
  return (
    <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
