import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CoachProvider } from '@/context/CoachContext';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Assessment from '@/pages/Assessment';
import Results from '@/pages/Results';
import Coach from '@/pages/Coach';
import About from '@/pages/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'assessment', element: <Assessment /> },
      { path: 'results', element: <Results /> },
      { path: 'coach', element: <Coach /> },
      { path: 'about', element: <About /> },
    ],
  },
]);

export default function App() {
  return (
    <CoachProvider>
      <RouterProvider router={router} />
    </CoachProvider>
  );
}
