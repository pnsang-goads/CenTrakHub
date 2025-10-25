#!/bin/bash

# Script dừng các services CenTrakHub
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Stopping CenTrakHub services...${NC}\n"

BACKEND_PID_FILE="/tmp/centrak_backend.pid"
FRONTEND_PID_FILE="/tmp/centrak_frontend.pid"

# Stop Laravel Backend
if [ -f "$BACKEND_PID_FILE" ]; then
    BACKEND_PID=$(cat "$BACKEND_PID_FILE")
    if ps -p $BACKEND_PID > /dev/null; then
        echo -e "${YELLOW}Stopping Laravel backend (PID: $BACKEND_PID)...${NC}"
        kill $BACKEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Backend stopped${NC}"
    else
        echo -e "${RED}Backend process not found${NC}"
    fi
    rm -f "$BACKEND_PID_FILE"
else
    echo -e "${YELLOW}No backend PID file found${NC}"
fi

# Stop React Frontend
if [ -f "$FRONTEND_PID_FILE" ]; then
    FRONTEND_PID=$(cat "$FRONTEND_PID_FILE")
    if ps -p $FRONTEND_PID > /dev/null; then
        echo -e "${YELLOW}Stopping React frontend (PID: $FRONTEND_PID)...${NC}"
        kill $FRONTEND_PID 2>/dev/null
        echo -e "${GREEN}✓ Frontend stopped${NC}"
    else
        echo -e "${RED}Frontend process not found${NC}"
    fi
    rm -f "$FRONTEND_PID_FILE"
else
    echo -e "${YELLOW}No frontend PID file found${NC}"
fi

# Kill any remaining PHP artisan serve processes
pkill -f "php artisan serve" 2>/dev/null

# Kill any remaining node processes for react-scripts
pkill -f "react-scripts start" 2>/dev/null

echo -e "\n${GREEN}All services stopped!${NC}"

