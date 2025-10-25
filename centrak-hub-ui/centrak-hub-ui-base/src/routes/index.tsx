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
        { path: 'refuels', element: <Refuels /> },
        { path: 'timezones', element: <Timezones /> },
        { path: 'languages', element: <Languages /> },
        { path: 'cities', element: <Cities /> },
        { path: 'countries', element: <Countries /> },
        { path: 'states', element: <States /> },
        { path: 'alarms', element: <Alarms /> },
        { path: 'servers', element: <Servers /> },
        { path: 'maintenances', element: <Maintenances /> },
        { path: 'maintenance-items', element: <MaintenanceItems /> },
        { path: 'configurations', element: <Configurations /> },
        { path: 'alarm-notifications', element: <AlarmNotifications /> },
        { path: 'user-sessions', element: <UserSessions /> },
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
const Refuels = Loadable(lazy(() => import('../pages/Refuels')));
const Timezones = Loadable(lazy(() => import('../pages/Timezones')));
const Languages = Loadable(lazy(() => import('../pages/Languages')));
const Cities = Loadable(lazy(() => import('../pages/Cities')));
const Countries = Loadable(lazy(() => import('../pages/Countries')));
const States = Loadable(lazy(() => import('../pages/States')));
const Alarms = Loadable(lazy(() => import('../pages/Alarms')));
const Servers = Loadable(lazy(() => import('../pages/Servers')));
const Maintenances = Loadable(lazy(() => import('../pages/Maintenances')));
const MaintenanceItems = Loadable(lazy(() => import('../pages/MaintenanceItems')));
const Configurations = Loadable(lazy(() => import('../pages/Configurations')));
const AlarmNotifications = Loadable(lazy(() => import('../pages/AlarmNotifications')));
const UserSessions = Loadable(lazy(() => import('../pages/UserSessions')));
// eslint-disable-next-line import/extensions
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
