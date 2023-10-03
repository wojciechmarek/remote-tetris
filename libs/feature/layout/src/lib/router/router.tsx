import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../feature-layout';
import { Start } from '@rtc-games/feature/start';
import { Tetris } from '@rtc-games/feature/tetris';
import { Gamepad } from '@rtc-games/feature/gamepad';

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
