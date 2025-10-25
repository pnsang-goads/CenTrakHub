# Centrak Hub - Full Stack GPS Tracking System

Hệ thống theo dõi GPS với Laravel backend và React frontend.

## 📁 Cấu Trúc Project

```
combine/
├── centrak-hub/              # Laravel Backend API
│   ├── app/                  # Laravel application code
│   ├── resources/            # Views, assets (Blade templates - legacy)
│   ├── routes/               # API routes
│   └── public/               # Public assets
│       └── app/              # React build output (auto-generated)
│
├── centrak-hub-ui/           # React Frontend
│   └── centrak-hub-ui-base/  # Main React app
│       ├── src/
│       │   ├── pages/        # 18 React pages
│       │   ├── components/   # Reusable components
│       │   ├── utils/        # Utility functions
│       │   ├── routes/       # React Router config
│       │   └── api/          # API client
│       ├── public/
│       └── package.json
│
├── start-dev.ps1            # Start both backend & frontend
└── build-and-serve.ps1      # Build & serve production
```

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 16+
- Yarn or npm

### Development Mode

**Option 1: Tự động (Recommended)**
```powershell
.\start-dev.ps1
```

**Option 2: Manual**
```bash
# Terminal 1: Laravel Backend
cd centrak-hub
php artisan serve
# API: http://localhost:8000

# Terminal 2: React Frontend  
cd centrak-hub-ui/centrak-hub-ui-base
yarn install
yarn start
# UI: http://localhost:3000
```

### Production Build

```powershell
# Build và serve
.\build-and-serve.ps1

# Hoặc manual:
cd centrak-hub-ui/centrak-hub-ui-base
yarn build:php
# Output: centrak-hub/public/app

cd ../../centrak-hub
php artisan serve
# Access: http://localhost:8000/app
```

## 📚 Documentation

### Quick Guides
- **[QUICK_START.md](centrak-hub-ui/QUICK_START.md)** - Hướng dẫn bắt đầu nhanh
- **[API_TESTING.md](centrak-hub-ui/API_TESTING.md)** - Test API endpoints

### Conversion Docs
- **[CONVERSION_SUMMARY.md](centrak-hub-ui/CONVERSION_SUMMARY.md)** - Chi tiết 18 pages React
- **[IMPROVEMENTS.md](centrak-hub-ui/IMPROVEMENTS.md)** - Technical improvements
- **[COMPLETE_UPDATE_SUMMARY.md](centrak-hub-ui/COMPLETE_UPDATE_SUMMARY.md)** - Full summary

## 🎯 Features

### Backend (Laravel)
- ✅ RESTful API endpoints
- ✅ Authentication với Bearer tokens
- ✅ GPS tracking logic
- ✅ Database migrations
- ✅ Blade templates (legacy - being replaced)

### Frontend (React)
- ✅ **18 Pages** - Fully functional
- ✅ Material-UI components
- ✅ TypeScript type safety
- ✅ Loading skeletons
- ✅ Empty states
- ✅ Error handling
- ✅ Responsive design
- ✅ API key management

## 📦 Tech Stack

### Backend
- Laravel 10.x
- PHP 8.1+
- MySQL/PostgreSQL
- RESTful API

### Frontend
- React 18
- TypeScript
- Material-UI (MUI)
- React Router v6
- Fetch API

## 🔧 Configuration

### API Proxy (Development)
React app proxies `/api/*` requests to Laravel backend:
- Configured in: `centrak-hub-ui/centrak-hub-ui-base/package.json`
- Proxy target: `http://localhost:8000`

### Environment Variables

**Laravel (.env)**
```env
APP_URL=http://localhost:8000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=centrak_hub
DB_USERNAME=root
DB_PASSWORD=
```

**React (optional - .env.local)**
```env
REACT_APP_API_KEY=your-bearer-token-here
```

## 📊 API Endpoints

All API endpoints available at `/api/*`:

### Resources
- `/api/device` - Devices
- `/api/vehicle` - Vehicles
- `/api/trip` - Trips
- `/api/refuel` - Refuels
- `/api/user` - Users
- `/api/maintenance` - Maintenances
- `/api/alarm` - Alarms
- `/api/alarm-notification` - Notifications

### Geographic
- `/api/country` - Countries
- `/api/state` - States  
- `/api/city` - Cities

### System
- `/api/timezone` - Timezones
- `/api/language` - Languages
- `/api/configuration` - Configurations
- `/api/server` - Servers
- `/api/user-session` - User sessions

## 🎨 React Pages (18 Total)

### Main (5)
1. Devices - Device management
2. Vehicles - Vehicle tracking
3. Trips - Trip history
4. Refuels - Fuel records
5. Maintenances - Maintenance logs

### System (4)
6. Users - User management
7. Languages - Language settings
8. Timezones - Timezone config
9. Profile - User profile

### Geographic (3)
10. Countries - Country data
11. States - State/province data
12. Cities - City database

### Monitoring (3)
13. Alarms - Alarm configuration
14. Alarm Notifications - Alert history
15. Servers - Server monitoring

### Administration (3)
16. Maintenance Items - Item catalog
17. Configurations - System config
18. User Sessions - Login history

## 🔐 Authentication

Frontend uses Bearer token authentication:
1. Get API key (UUID) from Laravel backend
2. Enter in any React page
3. Stored in localStorage as `apiKey`
4. Sent in Authorization header: `Bearer {uuid}`

## 🛠️ Development

### Add New Page

1. Create component: `centrak-hub-ui/centrak-hub-ui-base/src/pages/NewPage.tsx`
2. Add route in `src/routes/index.tsx`
3. Add navigation in `src/layouts/dashboard/navbar/NavConfig.tsx`

### Use Shared Components

```tsx
import ApiKeyInput from '../components/ApiKeyInput';
import TableSkeleton from '../components/TableSkeleton';
import EmptyState from '../components/EmptyState';
import { formatDateTime, formatMoney } from '../utils';
```

## 📝 Git Workflow

```bash
# Status
git status

# Add changes
git add .

# Commit
git commit -m "feat: your message"

# Push
git push origin master
```

**Note**: 
- `centrak-hub` folder tracks all backend code
- `centrak-hub-ui` folder tracks all frontend code
- No submodules - direct tracking

## 🐛 Troubleshooting

### CORS Errors
Check `centrak-hub/config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

### 401 Unauthorized
- Check API key is valid
- Verify localStorage has `apiKey`
- Test backend endpoint directly

### Build Errors
```bash
# Clean install
cd centrak-hub-ui/centrak-hub-ui-base
rm -rf node_modules package-lock.json
yarn install
```

## 📄 License

[Your License Here]

## 👥 Contributors

[Your Name/Team]

## 🎉 Status

✅ **Production Ready**
- 18 React pages fully functional
- Professional UX/UI
- Type-safe TypeScript
- Comprehensive error handling
- Full documentation

---

**Ready to replace Laravel Blade UI completely! 🚀**

