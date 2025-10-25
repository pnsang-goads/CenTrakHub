#!/bin/bash

# Script khởi động CenTrakHub - Development Mode
# Màu sắc cho terminal
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}🚀 CenTrakHub Development Setup${NC}"
echo -e "${BLUE}================================${NC}\n"

# Lấy đường dẫn root của project
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/centrak-hub"
FRONTEND_DIR="$PROJECT_ROOT/centrak-hub-ui/centrak-hub-ui-base"

# ======================
# 1. SETUP LARAVEL BACKEND
# ======================
echo -e "${YELLOW}[1/4] Checking Laravel Backend...${NC}"

cd "$BACKEND_DIR"

# Kiểm tra .env file
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
else
    echo -e "${GREEN}✓ .env file exists${NC}"
fi

# Kiểm tra và cài đặt Composer dependencies
if [ ! -d vendor ]; then
    echo -e "${YELLOW}Installing Composer dependencies...${NC}"
    composer install
    echo -e "${GREEN}✓ Composer dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Composer dependencies already installed${NC}"
fi

# Generate app key nếu chưa có
if grep -q "APP_KEY=$" .env; then
    echo -e "${YELLOW}Generating Laravel application key...${NC}"
    php artisan key:generate
    echo -e "${GREEN}✓ Application key generated${NC}"
else
    echo -e "${GREEN}✓ Application key exists${NC}"
fi

# ======================
# 2. SETUP REACT FRONTEND
# ======================
echo -e "\n${YELLOW}[2/4] Checking React Frontend...${NC}"

cd "$FRONTEND_DIR"

# Kiểm tra và cài đặt npm dependencies
if [ ! -d node_modules ]; then
    echo -e "${YELLOW}Installing npm dependencies (this may take a while)...${NC}"
    
    # Sử dụng yarn nếu có, không thì dùng npm
    if command -v yarn &> /dev/null; then
        echo -e "${BLUE}Using Yarn...${NC}"
        yarn install
    else
        echo -e "${BLUE}Using npm...${NC}"
        npm install
    fi
    
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${GREEN}✓ Frontend dependencies already installed${NC}"
fi

# ======================
# 3. HIỂN thị thông tin
# ======================
echo -e "\n${BLUE}================================${NC}"
echo -e "${GREEN}✅ Setup completed!${NC}"
echo -e "${BLUE}================================${NC}\n"

echo -e "${YELLOW}Starting services...${NC}\n"
echo -e "${BLUE}Backend:${NC}  http://localhost:8000"
echo -e "${BLUE}Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}API:${NC}      http://localhost:8000/api"
echo -e "\n${YELLOW}Press Ctrl+C to stop both servers${NC}\n"

# ======================
# 4. KHỞI ĐỘNG SERVICES
# ======================

# Tạo file PID để track processes
BACKEND_PID_FILE="/tmp/centrak_backend.pid"
FRONTEND_PID_FILE="/tmp/centrak_frontend.pid"

# Cleanup function khi Ctrl+C
cleanup() {
    echo -e "\n\n${YELLOW}Stopping services...${NC}"
    
    if [ -f "$BACKEND_PID_FILE" ]; then
        BACKEND_PID=$(cat "$BACKEND_PID_FILE")
        echo -e "${YELLOW}Stopping Laravel backend (PID: $BACKEND_PID)...${NC}"
        kill $BACKEND_PID 2>/dev/null
        rm -f "$BACKEND_PID_FILE"
    fi
    
    if [ -f "$FRONTEND_PID_FILE" ]; then
        FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
        echo -e "${YELLOW}Stopping React frontend (PID: $FRONTEND_PID)...${NC}"
        kill $FRONTEND_PID 2>/dev/null
        rm -f "$FRONTEND_PID_FILE"
    fi
    
    echo -e "${GREEN}✓ Services stopped${NC}"
    exit 0
}

# Register cleanup function
trap cleanup SIGINT SIGTERM

# Khởi động Laravel Backend
cd "$BACKEND_DIR"
echo -e "${YELLOW}[3/4] Starting Laravel Backend...${NC}"
php artisan serve --host=127.0.0.1 --port=8000 > /tmp/laravel.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > "$BACKEND_PID_FILE"
echo -e "${GREEN}✓ Laravel backend started (PID: $BACKEND_PID)${NC}"

# Đợi backend khởi động
sleep 3

# Khởi động React Frontend
cd "$FRONTEND_DIR"
echo -e "${YELLOW}[4/4] Starting React Frontend...${NC}"

# Kiểm tra yarn hay npm
if command -v yarn &> /dev/null; then
    yarn start > /tmp/react.log 2>&1 &
else
    npm start > /tmp/react.log 2>&1 &
fi

FRONTEND_PID=$!
echo $FRONTEND_PID > "$FRONTEND_PID_FILE"
echo -e "${GREEN}✓ React frontend started (PID: $FRONTEND_PID)${NC}\n"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🎉 All services are running!${NC}"
echo -e "${GREEN}================================${NC}\n"
echo -e "View logs:"
echo -e "  ${BLUE}Backend:${NC}  tail -f /tmp/laravel.log"
echo -e "  ${BLUE}Frontend:${NC} tail -f /tmp/react.log\n"

# Đợi để giữ script chạy
wait

