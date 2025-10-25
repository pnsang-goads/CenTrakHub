# Quick Start Guide - Centrak Hub React UI

## ✅ Hoàn Thành

Đã chuyển đổi **18 trang** từ Laravel Blade sang React với đầy đủ tính năng hiển thị dữ liệu.

## 🚀 Chạy Ứng Dụng

### Bước 1: Khởi động Backend API (Laravel)

```bash
cd centrak-hub
php artisan serve
```

API sẽ chạy tại: **http://localhost:8000**

### Bước 2: Khởi động Frontend (React)

```bash
cd centrak-hub-ui/centrak-hub-ui-base
yarn install    # Chỉ cần chạy lần đầu
yarn start
```

UI sẽ chạy tại: **http://localhost:3000**

### Bước 3: Xác Thực API

1. Mở trình duyệt: **http://localhost:3000**
2. Nếu gặp lỗi 401 (Unauthorized):
   - Nhập API Key (Bearer UUID token từ Laravel)
   - Click "Save Key"
   - Reload trang

## 📁 Các Trang Đã Chuyển Đổi

### Main (5 trang)

- ✅ Devices - `/dashboard/devices`
- ✅ Vehicles - `/dashboard/vehicles`
- ✅ Trips - `/dashboard/trips`
- ✅ Refuels - `/dashboard/refuels`
- ✅ Maintenances - `/dashboard/maintenances`

### System (4 trang)

- ✅ Users - `/dashboard/users`
- ✅ Languages - `/dashboard/languages`
- ✅ Timezones - `/dashboard/timezones`
- ✅ Profile - `/dashboard/profile`

### Geographic (3 trang)

- ✅ Countries - `/dashboard/countries`
- ✅ States - `/dashboard/states`
- ✅ Cities - `/dashboard/cities`

### Monitoring (3 trang)

- ✅ Alarms - `/dashboard/alarms`
- ✅ Alarm Notifications - `/dashboard/alarm-notifications`
- ✅ Servers - `/dashboard/servers`

### Administration (3 trang)

- ✅ Maintenance Items - `/dashboard/maintenance-items`
- ✅ Configurations - `/dashboard/configurations`
- ✅ User Sessions - `/dashboard/user-sessions`

## 🔧 Cấu Hình

### API Proxy

React app tự động proxy các request `/api/*` tới Laravel backend:

- Development: `http://localhost:8000` (cấu hình trong `package.json`)
- Production: Build vào `centrak-hub/public/app`

### API Client

- File: `src/api/client.ts`
- Base path: `/api`
- Auth: Bearer token (UUID) từ localStorage
- Error handling: Tự động hiển thị alert

### Routes

- File: `src/routes/index.tsx`
- 18 routes cho 18 trang
- Lazy loading tất cả components

### Navigation

- File: `src/layouts/dashboard/navbar/NavConfig.tsx`
- 5 sections: Main, System, Geographic, Monitoring, Administration

## 🎨 Tính Năng

### Mọi Trang Có

- ✅ Bảng dữ liệu Material-UI
- ✅ Tìm kiếm/lọc client-side
- ✅ Loading state
- ✅ Error handling
- ✅ Responsive design
- ✅ TypeScript type safety

### Tính Năng Đặc Biệt

- **Status Chips**: Hiển thị boolean dưới dạng chips màu
- **Formatting**: Ngày tháng, số, tiền tệ, khoảng cách
- **Tooltips**: Truncate text dài với tooltip
- **Table Footer**: Tổng cộng (trang Maintenances)

## 📊 Kiểm Tra Dữ Liệu

### Kiểm Tra Backend

```bash
# Test API trực tiếp
curl http://localhost:8000/api/device

# Với authentication
curl -H "Authorization: Bearer YOUR-UUID" http://localhost:8000/api/device
```

### Kiểm Tra Frontend

1. Mở Developer Tools (F12)
2. Chọn tab Network
3. Navigate tới các trang
4. Xem các request `/api/*`
5. Kiểm tra response data

### Expected API Format

**Dạng array:**

```json
[
  {"id": 1, "name": "Item 1", ...},
  {"id": 2, "name": "Item 2", ...}
]
```

**Hoặc object with list:**

```json
{
  "list": [...],
  "total": 100
}
```

## 🔨 Build Production

```bash
cd centrak-hub-ui/centrak-hub-ui-base
yarn build:php
```

Kết quả build sẽ được copy vào: `centrak-hub/public/app`

Truy cập: **http://localhost:8000/app**

## 📝 Scripts Helper

Từ repo root:

```bash
# Chạy cả API + React cùng lúc
./start-dev.ps1

# Build và serve với Laravel
./build-and-serve.ps1
```

## ⚠️ Troubleshooting

### Lỗi CORS

Kiểm tra `centrak-hub/config/cors.php`:

```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

### Lỗi 401 Unauthorized

- Đảm bảo API key đúng
- Kiểm tra localStorage có `apiKey`
- Verify Laravel API chấp nhận token

### Lỗi 404 Not Found

- Kiểm tra route Laravel có tồn tại
- Xem route name có match không
- Verify API endpoint path

### Không Có Dữ Liệu

- Kiểm tra database có dữ liệu
- Xem API response trong Network tab
- Verify JSON format

## 📚 Tài Liệu

- **CONVERSION_SUMMARY.md** - Chi tiết 18 trang đã convert
- **API_TESTING.md** - Hướng dẫn test API chi tiết
- **README.md** - Thông tin chung về project

## 🎯 Kết Luận

Tất cả 18 trang đã sẵn sàng hiển thị dữ liệu từ API Laravel.

**Để bắt đầu:**

1. Chạy Laravel API
2. Chạy React app
3. Nhập API key
4. Explore các trang!

Dữ liệu sẽ tự động load và hiển thị trong bảng với đầy đủ tính năng filter, format, và error handling.
