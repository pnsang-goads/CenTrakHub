// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
};

const navConfig = [
  {
    subheader: 'Main',
    items: [
      { title: 'Devices', path: '/dashboard/devices', icon: ICONS.analytics },
      { title: 'Vehicles', path: '/dashboard/vehicles', icon: ICONS.analytics },
      { title: 'Trips', path: '/dashboard/trips', icon: ICONS.analytics },
      { title: 'Refuels', path: '/dashboard/refuels', icon: ICONS.analytics },
      { title: 'Maintenances', path: '/dashboard/maintenances', icon: ICONS.analytics },
    ],
  },
  {
    subheader: 'System',
    items: [
      { title: 'Users', path: '/dashboard/users', icon: ICONS.user },
      { title: 'Languages', path: '/dashboard/languages', icon: ICONS.user },
      { title: 'Timezones', path: '/dashboard/timezones', icon: ICONS.user },
      { title: 'Profile', path: '/dashboard/profile', icon: ICONS.user },
    ],
  },
  {
    subheader: 'Geographic',
    items: [
      { title: 'Countries', path: '/dashboard/countries', icon: ICONS.ecommerce },
      { title: 'States', path: '/dashboard/states', icon: ICONS.ecommerce },
      { title: 'Cities', path: '/dashboard/cities', icon: ICONS.ecommerce },
    ],
  },
  {
    subheader: 'Monitoring',
    items: [
      { title: 'Alarms', path: '/dashboard/alarms', icon: ICONS.analytics },
      { title: 'Alarm Notifications', path: '/dashboard/alarm-notifications', icon: ICONS.analytics },
      { title: 'Servers', path: '/dashboard/servers', icon: ICONS.analytics },
    ],
  },
  {
    subheader: 'Administration',
    items: [
      { title: 'Maintenance Items', path: '/dashboard/maintenance-items', icon: ICONS.ecommerce },
      { title: 'Configurations', path: '/dashboard/configurations', icon: ICONS.ecommerce },
      { title: 'User Sessions', path: '/dashboard/user-sessions', icon: ICONS.user },
    ],
  },
];

export default navConfig;
