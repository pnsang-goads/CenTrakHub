# 📥 Clone Guide - Centrak Hub

## ✅ Đã Fix: centrak-hub Không Còn Là Submodule

**Vấn đề trước đây**: Khi clone, `centrak-hub/` folder trống rỗng  
**Giải pháp**: Đã chuyển từ submodule → thư mục thường  
**Kết quả**: Clone về sẽ có đầy đủ code ngay lập tức! ✅

---

## 🚀 Hướng Dẫn Clone

### Clone Repository

```bash
git clone https://github.com/pnsang-goads/CenTrakHub.git
cd CenTrakHub
```

**Kết quả**: Tất cả files sẽ có ngay, bao gồm:
- ✅ `centrak-hub/` - **2,716 files** Laravel backend (đầy đủ!)
- ✅ `centrak-hub-ui/` - React frontend
- ✅ Documentation files

---

## ✅ Verify Clone

### Check centrak-hub có đầy đủ files:

```bash
# PowerShell
(Get-ChildItem -Path centrak-hub -Recurse -File).Count
# Kết quả: ~2716 files

# Linux/Mac
find centrak-hub -type f | wc -l
# Kết quả: ~2716 files
```

### Check Laravel structure:

```bash
ls centrak-hub/
# Nên thấy:
# - app/
# - config/
# - database/
# - public/
# - resources/
# - routes/
# - composer.json
# - artisan
# ... etc
```

### Check React structure:

```bash
ls centrak-hub-ui/centrak-hub-ui-base/src/
# Nên thấy:
# - pages/ (18 pages)
# - components/
# - routes/
# - api/
# - utils/
# ... etc
```

---

## 🔧 Setup After Clone

### 1. Install Laravel Dependencies

```bash
cd centrak-hub
composer install
```

### 2. Setup Laravel Environment

```bash
# Copy .env
cp .env.example .env

# Generate app key
php artisan key:generate

# Setup database in .env
# DB_DATABASE=centrak_hub
# DB_USERNAME=root
# DB_PASSWORD=

# Run migrations
php artisan migrate

# (Optional) Seed data
php artisan db:seed
```

### 3. Install React Dependencies

```bash
cd ../centrak-hub-ui/centrak-hub-ui-base
yarn install
# or
npm install
```

---

## 🚀 Run Application

### Option 1: Quick Start (Recommended)

```bash
# From repository root
.\start-dev.ps1
```

### Option 2: Manual

```bash
# Terminal 1: Backend
cd centrak-hub
php artisan serve
# → http://localhost:8000

# Terminal 2: Frontend
cd centrak-hub-ui/centrak-hub-ui-base
yarn start
# → http://localhost:3000
```

---

## 🎯 Expected Results

### ✅ Successful Clone

```
CenTrakHub/
├── .git/                    ✅ Git repository
├── README.md                ✅ Documentation
├── GIT_GUIDE.md             ✅ Git guide
├── centrak-hub/             ✅ 2,716 files (FULL Laravel app)
│   ├── app/                 ✅ Laravel application
│   ├── config/              ✅ Configuration
│   ├── database/            ✅ Migrations
│   ├── public/              ✅ Public assets
│   ├── resources/           ✅ Views & languages
│   ├── routes/              ✅ API routes
│   ├── composer.json        ✅ Dependencies
│   └── artisan              ✅ CLI tool
├── centrak-hub-ui/          ✅ React frontend
│   ├── centrak-hub-ui-base/
│   │   ├── src/
│   │   │   ├── pages/       ✅ 18 pages
│   │   │   ├── components/  ✅ Shared components
│   │   │   └── utils/       ✅ Utilities
│   │   └── package.json     ✅ Dependencies
│   └── documentation files  ✅ 6 guides
└── start-dev.ps1            ✅ Helper script
```

### ❌ If centrak-hub is Empty

**This should NOT happen anymore!** But if it does:

```bash
# Check git status
git status

# Should show: "nothing to commit, working tree clean"
# Should NOT show: "modified: centrak-hub (new commits)"

# Verify files are tracked
git ls-files centrak-hub/ | wc -l
# Should show: ~2716

# If still empty, pull again
git pull origin master
```

---

## 🔍 Troubleshooting

### Problem: centrak-hub folder is empty after clone

**Cause**: Old repository might still have submodule config  
**Solution**: Repository has been fixed! Re-clone:

```bash
# Delete old clone
rm -rf CenTrakHub

# Clone fresh
git clone https://github.com/pnsang-goads/CenTrakHub.git
cd CenTrakHub

# Verify
ls centrak-hub/
# Should see files immediately!
```

### Problem: Git shows centrak-hub as modified

**Cause**: Leftover submodule configuration  
**Solution**: Already fixed in commit `3a8880c`

### Problem: Can't install Laravel dependencies

```bash
cd centrak-hub
composer install

# If error, try:
composer update
```

### Problem: Can't install React dependencies

```bash
cd centrak-hub-ui/centrak-hub-ui-base

# Clean install
rm -rf node_modules package-lock.json yarn.lock
yarn install
```

---

## 📊 Verification Commands

```bash
# Check git status
git status
# Expected: "nothing to commit, working tree clean"

# Count files in centrak-hub
ls -R centrak-hub | wc -l
# Expected: ~2700+

# Check Laravel files
ls centrak-hub/app/
# Expected: Console/ Domains/ Http/ Models/ Providers/ Services/ View/

# Check React files  
ls centrak-hub-ui/centrak-hub-ui-base/src/pages/
# Expected: 18 .tsx files
```

---

## 🎉 Success Indicators

When clone successful, you should have:

✅ **centrak-hub/** với 2,716 files
✅ **centrak-hub/app/** - Laravel application code
✅ **centrak-hub/resources/** - Blade views & languages
✅ **centrak-hub/composer.json** - Dependencies
✅ **centrak-hub-ui/centrak-hub-ui-base/src/pages/** - 18 React pages
✅ **All documentation** - README, guides, etc.

---

## 📚 Next Steps After Clone

1. ✅ Verify files exist
2. ✅ Install Laravel dependencies (`composer install`)
3. ✅ Install React dependencies (`yarn install`)
4. ✅ Setup `.env` file
5. ✅ Run migrations
6. ✅ Start development servers
7. ✅ Access http://localhost:3000

---

## 🔗 Repository Information

**URL**: https://github.com/pnsang-goads/CenTrakHub.git  
**Latest Commits**:
- `3a8880c` - fix: convert centrak-hub from submodule
- `0625451` - feat: Complete React UI replacement
- `a4be465` - done remove unused code

**Total Files Tracked**: ~2,900+ files  
**Backend Files**: 2,716 files  
**Frontend Files**: ~250 files

---

**🎉 Clone về là có đầy đủ code ngay! Không cần thêm bước nào! 🚀**

