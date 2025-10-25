# API Testing Guide

## Setup

1. **Backend (Laravel API)**

   ```bash
   cd centrak-hub
   php artisan serve
   # API runs at: http://localhost:8000
   ```

2. **Frontend (React)**
   ```bash
   cd centrak-hub-ui/centrak-hub-ui-base
   yarn install
   yarn start
   # UI runs at: http://localhost:3000
   ```

## API Configuration

- **Proxy**: React app proxies `/api/*` requests to `http://localhost:8000` (configured in package.json)
- **API Base Path**: `/api` (configured in `src/api/client.ts`)
- **Authentication**: Bearer token (UUID) stored in localStorage as `apiKey`

## API Endpoints

All endpoints are accessed via `/api/{resource}`:

### Main Resources

- `/api/device` - Devices
- `/api/vehicle` - Vehicles
- `/api/trip` - Trips
- `/api/refuel` - Refuels
- `/api/user` - Users
- `/api/maintenance` - Maintenances

### Geographic

- `/api/country` - Countries
- `/api/state` - States
- `/api/city` - Cities

### Monitoring

- `/api/alarm` - Alarms
- `/api/alarm-notification` - Alarm Notifications
- `/api/server` - Servers

### System

- `/api/timezone` - Timezones
- `/api/language` - Languages
- `/api/maintenance-item` - Maintenance Items
- `/api/configuration` - Configurations
- `/api/user-session` - User Sessions

## Testing Steps

### 1. Test Backend API

```bash
# Check if Laravel API is running
curl http://localhost:8000/api/device

# With authentication
curl -H "Authorization: Bearer YOUR-UUID-TOKEN" http://localhost:8000/api/device
```

### 2. Test React App

1. Open browser: http://localhost:3000
2. Navigate to any page (e.g., Devices)
3. If you see "API 401" or authentication error:

   - Enter API Key in the input field (UUID from Laravel)
   - Click "Save Key"
   - Reload the page

4. Check browser console (F12) for:
   - Network requests to `/api/*`
   - Any errors or failed requests

### 3. Verify Data Display

Check each page to ensure data loads:

**Main**

- ✓ Devices - `/dashboard/devices`
- ✓ Vehicles - `/dashboard/vehicles`
- ✓ Trips - `/dashboard/trips`
- ✓ Refuels - `/dashboard/refuels`
- ✓ Maintenances - `/dashboard/maintenances`

**System**

- ✓ Users - `/dashboard/users`
- ✓ Languages - `/dashboard/languages`
- ✓ Timezones - `/dashboard/timezones`
- ✓ Profile - `/dashboard/profile`

**Geographic**

- ✓ Countries - `/dashboard/countries`
- ✓ States - `/dashboard/states`
- ✓ Cities - `/dashboard/cities`

**Monitoring**

- ✓ Alarms - `/dashboard/alarms`
- ✓ Alarm Notifications - `/dashboard/alarm-notifications`
- ✓ Servers - `/dashboard/servers`

**Administration**

- ✓ Maintenance Items - `/dashboard/maintenance-items`
- ✓ Configurations - `/dashboard/configurations`
- ✓ User Sessions - `/dashboard/user-sessions`

## Common Issues

### 1. CORS Errors

If you see CORS errors, ensure Laravel has CORS configured:

```php
// config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

### 2. 401 Unauthorized

- Ensure you have a valid API key (Bearer token)
- Check that the token is saved in localStorage
- Verify Laravel API accepts the token

### 3. 404 Not Found

- Verify the API endpoint exists in Laravel routes
- Check route names match frontend calls

### 4. Empty Data

- Check if database has data
- Verify API returns JSON format
- Check browser Network tab for actual response

## API Response Format

Expected responses:

**List endpoints** (e.g., `/api/device`):

```json
[
  {
    "id": 1,
    "name": "Device 1",
    "model": "GPS-X1",
    ...
  }
]
```

**Or with metadata**:

```json
{
  "list": [...],
  "total": 1000,
  ...
}
```

## Development Notes

- **Hot Reload**: React app auto-reloads on file changes
- **API Proxy**: Requests to `/api/*` are proxied to Laravel backend
- **State Management**: Each page manages its own state (no global state)
- **Error Handling**: API errors are displayed as alerts on each page
