import { router } from '@rtc-tetris/feature/layout';
import { RouterProvider } from 'react-router-dom';

export function App() {
  return (
    <RouterProvider router={router} />
  );
}