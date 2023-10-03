import { router } from '@rtc-games/feature/layout';
import { RouterProvider } from 'react-router-dom';

export function App() {
  return (
    <RouterProvider router={router} />
  );
}