# Git Guide - Centrak Hub Project

## 📁 Cấu Trúc Git

Project này **KHÔNG** dùng git submodule. Tất cả code được track trực tiếp trong một repository duy nhất.

```
combine/ (Git Root)
├── .git/                    # Main git repository
├── .gitignore              # Ignore rules cho cả project
├── centrak-hub/            # Laravel backend (tracked directly)
│   ├── .gitignore          # Laravel-specific ignores
│   └── [Laravel files]
├── centrak-hub-ui/         # React frontend (tracked directly)
│   └── centrak-hub-ui-base/
│       ├── .gitignore      # React-specific ignores
│       └── [React files]
└── README.md
```

## ✅ Đã Chuyển Đổi Thành Công

Trước đây `centrak-hub` có thể là submodule, nhưng giờ đã được chuyển thành:
- ✅ Thư mục thường (không có `.git` riêng)
- ✅ Track trực tiếp bởi git chính
- ✅ Đồng bộ code dễ dàng trong 1 repo

## 🔧 Git Commands Thường Dùng

### Xem Trạng Thái
```bash
git status
# Shows all changes in both centrak-hub and centrak-hub-ui
```

### Add Files
```bash
# Add all changes
git add .

# Add specific folder
git add centrak-hub/
git add centrak-hub-ui/

# Add specific files
git add centrak-hub/app/Models/User.php
git add centrak-hub-ui/centrak-hub-ui-base/src/pages/Devices.tsx
```

### Commit Changes
```bash
# Commit with message
git commit -m "feat: add new feature"

# Commit types:
# feat: New feature
# fix: Bug fix
# docs: Documentation
# style: Formatting
# refactor: Code restructuring
# test: Tests
# chore: Maintenance
```

### Push/Pull
```bash
# Push to remote
git push origin master

# Pull from remote
git pull origin master
```

### Check History
```bash
# View commit history
git log --oneline

# View changes in a file
git log -p centrak-hub-ui/centrak-hub-ui-base/src/pages/Devices.tsx
```

## 📝 .gitignore Configuration

### Root .gitignore
Ignores:
- `centrak-hub/vendor/` - Laravel dependencies
- `centrak-hub/node_modules/` - Laravel frontend deps
- `centrak-hub/storage/` - Runtime files
- `centrak-hub/public/app/` - React build output
- `centrak-hub-ui/**/node_modules/` - React dependencies
- `centrak-hub-ui/**/build/` - React build artifacts

### Files Tracked
✅ Source code (PHP, TypeScript, TSX)
✅ Configuration files
✅ Migrations & Seeders
✅ Routes & Controllers
✅ React components & pages
✅ Documentation

### Files NOT Tracked
❌ Dependencies (vendor/, node_modules/)
❌ Build artifacts (build/, public/app/)
❌ Environment files (.env)
❌ IDE files (.idea/, .vscode/)
❌ Logs & caches

## 🚀 Workflow Example

### Feature Development
```bash
# 1. Pull latest
git pull origin master

# 2. Make changes
# Edit files in centrak-hub or centrak-hub-ui

# 3. Check status
git status

# 4. Add changes
git add .

# 5. Commit
git commit -m "feat: add cities page to React UI"

# 6. Push
git push origin master
```

### Update React UI
```bash
# Make changes to React files
cd centrak-hub-ui/centrak-hub-ui-base
# Edit src/pages/NewPage.tsx

# Back to root
cd ../..

# Stage and commit
git add centrak-hub-ui/
git commit -m "feat: add new React page"
git push origin master
```

### Update Laravel Backend
```bash
# Make changes to Laravel
cd centrak-hub
# Edit app/Http/Controllers/DeviceController.php

# Back to root
cd ..

# Stage and commit
git add centrak-hub/
git commit -m "fix: update device API endpoint"
git push origin master
```

## 🔍 Verify Setup

### Check Git Status
```bash
# Should show changes in both folders
git status

# Should NOT show centrak-hub as "modified (new commits)"
# If it does, centrak-hub is still a submodule!
```

### Check No Submodules
```bash
# Should return error or empty
git submodule status

# File should not exist or be empty
cat .gitmodules
```

### Check Direct Tracking
```bash
# Should show files inside centrak-hub
git ls-files centrak-hub/ | head

# Should show files inside centrak-hub-ui
git ls-files centrak-hub-ui/ | head
```

## ⚠️ Common Issues

### Issue: centrak-hub shows as "modified (new commits)"
**Cause**: Still configured as submodule
**Fix**:
```bash
# Remove submodule
git submodule deinit -f centrak-hub
git rm -f centrak-hub
rm -rf .git/modules/centrak-hub

# Re-add as normal folder
git add centrak-hub/
git commit -m "chore: convert centrak-hub from submodule to regular folder"
```

### Issue: Can't see changes inside centrak-hub
**Cause**: .git folder exists in centrak-hub
**Fix**:
```bash
# Remove git from centrak-hub (if exists)
rm -rf centrak-hub/.git

# Add all files
git add centrak-hub/
git commit -m "chore: add centrak-hub files"
```

### Issue: Too many files tracked
**Cause**: Missing .gitignore entries
**Fix**: Check and update .gitignore files

## 📊 Current State

✅ **READY TO USE**

```
Repository Type: Single Git Repo (NO submodules)
Backend Tracking: Direct (centrak-hub/)
Frontend Tracking: Direct (centrak-hub-ui/)
Sync Method: Standard git add/commit/push
```

## 🎯 Best Practices

1. **Always commit from root**: `cd /path/to/combine`
2. **Use descriptive commits**: "feat: add X" not "update"
3. **Check status before push**: `git status`
4. **Pull before push**: `git pull origin master`
5. **Don't commit .env files**: Already in .gitignore
6. **Don't commit dependencies**: vendor/, node_modules/
7. **Keep .gitignore updated**: Add new ignore patterns as needed

## 🔗 Remote Repository

```bash
# View remote
git remote -v

# Add remote (if not exists)
git remote add origin https://github.com/your-username/centrak-hub.git

# Change remote
git remote set-url origin https://github.com/your-username/centrak-hub.git
```

## 📦 Complete Workflow

```bash
# Daily workflow
git pull origin master          # Get latest
# ... make changes ...
git status                      # Check what changed
git add .                       # Stage all changes
git commit -m "feat: message"   # Commit
git push origin master          # Push to remote

# That's it! No submodule commands needed.
```

---

**Tất cả code giờ đây được quản lý trực tiếp trong 1 repository duy nhất! 🎉**

