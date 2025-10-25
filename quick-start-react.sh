#!/bin/bash

# Quick start script - chỉ khởi động React Frontend

echo "🚀 Starting React Frontend..."

cd /home/sangpn/project/CenTrakHub/centrak-hub-ui/centrak-hub-ui-base

if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    yarn install
fi

echo "✅ Starting development server..."
echo ""
echo "Frontend URL: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop"
echo ""

yarn start

