import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../feature-layout';
import { Start } from '@rtc-tetris/feature/start';
import { Tetris } from '@rtc-tetris/feature/tetris';
import { Gamepad } from '@rtc-tetris/feature/gamepad';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Start />,
      },
      {
        path: '/tetris',
        element: <Tetris />,
      },
      {
        path: '/gamepad',
        element: <Gamepad />,
      },
    ],
  },
]);
