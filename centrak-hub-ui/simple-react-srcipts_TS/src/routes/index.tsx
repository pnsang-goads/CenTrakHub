import { Suspense, lazy, ElementType } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/dashboard/devices" replace />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/devices" replace />, index: true },
        { path: 'devices', element: <Devices /> },
        { path: 'trips', element: <Trips /> },
        { path: 'profile', element: <Profile /> },
        { path: 'vehicles', element: <Vehicles /> },
        { path: 'users', element: <Users /> },
      ],
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '*', element: <Navigate to="/dashboard/devices" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/dashboard/devices" replace /> },
  ]);
}

// Dashboard
const Devices = Loadable(lazy(() => import('../pages/Devices')));
const Trips = Loadable(lazy(() => import('../pages/Trips')));
const Profile = Loadable(lazy(() => import('../pages/Profile')));
const Vehicles = Loadable(lazy(() => import('../pages/Vehicles')));
const Users = Loadable(lazy(() => import('../pages/Users')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
