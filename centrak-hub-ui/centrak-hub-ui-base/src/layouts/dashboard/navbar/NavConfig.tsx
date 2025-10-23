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
];

export default navConfig;
