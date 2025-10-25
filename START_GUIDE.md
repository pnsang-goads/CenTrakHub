# CenTrakHub - Hướng Dẫn Khởi Động

## ✅ Trạng Thái Hiện Tại

### React Frontend
- **Status**: ✅ Đang chạy thành công
- **URL**: http://localhost:3000
- **Process ID**: Xem bằng `ps aux | grep react-scripts`

### Laravel Backend  
- **Status**: ⚠️ Cần cấu hình thêm
- **Database**: gpstracker (đã tạo)
- **Credentials**: platform/platform

## 🚀 Khởi Động Nhanh

### React Frontend (Đã chạy)
```bash
cd /home/sangpn/project/CenTrakHub/centrak-hub-ui/centrak-hub-ui-base
yarn start
# Hoặc: npm start
```

Truy cập: **http://localhost:3000**

### Laravel Backend (Cần sửa)

**Vấn đề hiện tại**: Laravel có lỗi với service providers khi khởi động.

**Tạm thời đã disable các providers trong** `config/app.php`:
- `Eusonlito\LaravelMeta\MetaServiceProvider::class`
- `App\Providers\App::class`
- `App\Providers\Debug::class`  
- `App\Providers\Route::class`
- `App\Providers\View::class`

**Để khởi động Laravel** (sau khi sửa providers):
```bash
cd /home/sangpn/project/CenTrakHub/centrak-hub
php artisan migrate --seed  # Chạy migrations
php artisan serve            # Khởi động server
```

URL: http://localhost:8000

## 📝 Scripts Tiện Ích

### Dừng tất cả services
```bash
cd /home/sangpn/project/CenTrakHub
./stop-dev.sh
```

### Hoặc manual:
```bash
# Dừng React
pkill -f "react-scripts start"

# Dừng Laravel
pkill -f "php artisan serve"
```

### Xem logs
```bash
# React log
tail -f /tmp/react.log

# Laravel log  
tail -f /tmp/laravel.log
```

## 🔧 Cấu Hình

### Database (MySQL)
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=gpstracker
DB_USERNAME=platform
DB_PASSWORD=platform
```

### API Proxy (React → Laravel)
React app đã cấu hình proxy `/api/*` requests tới `http://localhost:8000`

## 🐛 Troubleshooting

### React không khởi động
```bash
cd centrak-hub-ui/centrak-hub-ui-base
rm -rf node_modules
yarn install
yarn start
```

### Laravel lỗi service provider
Cần kiểm tra và sửa các custom service providers trong:
- `app/Providers/App.php`
- `app/Providers/Debug.php`
- `app/Providers/Route.php`
- `app/Providers/View.php`

Hoặc comment out tạm thời trong `config/app.php` để chạy migrations trước.

### Port đã được sử dụng
```bash
# Kiểm tra port 3000
lsof -ti:3000 | xargs kill -9

# Kiểm tra port 8000  
lsof -ti:8000 | xargs kill -9
```

## 📊 Kiểm Tra Services

```bash
# Kiểm tra React
curl http://localhost:3000

# Kiểm tra Laravel API
curl http://localhost:8000/api/device
```

## 🎯 Truy Cập

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api
- **Backend Web**: http://localhost:8000

## 📦 Dependencies

### Đã cài đặt
- ✅ Composer packages (Laravel)
- ✅ Yarn packages (React)
- ✅ MySQL database `gpstracker`

### Cần kiểm tra
- ⚠️ Laravel migrations (chưa chạy được do service provider error)
- ⚠️ Laravel seeder data

## 🔑 Authentication

React app sử dụng Bearer token authentication. Nhập API key (UUID) từ Laravel backend vào bất kỳ trang nào.

Key được lưu trong localStorage với tên `apiKey`.

---

**Lưu ý**: Laravel backend cần được sửa lỗi service providers trước khi có thể chạy đầy đủ.
React frontend có thể chạy độc lập nhưng sẽ không load được data từ API.

