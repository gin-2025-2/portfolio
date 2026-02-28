#!/bin/bash

# Visual Regression Testing Script
# Orchestrates screenshot capture, comparison, and report generation

set -e

echo "========================================="
echo "Visual Regression Testing"
echo "========================================="
echo ""

# Step 1: Check if dev server is running
echo "📍 Step 1: Checking server..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Server not running on localhost:3000"
    echo "   Start it with: npm run dev"
    exit 1
fi
echo "✅ Server is running"
echo ""

# Step 2: Create required directories
echo "📍 Step 2: Creating directories..."
mkdir -p .reg/expected .reg/actual
echo "✅ Directories ready"
echo ""

# Step 3: Take screenshots
echo "📍 Step 3: Taking screenshots..."
npm run test 2>&1 | tail -20
echo "✅ Screenshots captured"
echo ""

# Step 4: Set up baseline
echo "📍 Step 4: Setting up baseline..."
if [ ! -f ".reg/expected/index.png" ] || [ ! -s ".reg/expected/index.png" ]; then
    echo "📌 First run - Setting baseline..."
    cp ".reg/actual/index.png" ".reg/expected/index.png"
else
    echo "📌 Baseline exists - Ready for comparison"
fi
echo "✅ Baseline ready"
echo ""

# Step 5: Run regression test with reg-suit
echo "📍 Step 5: Running regression test..."
npm run regression
echo "✅ Regression test complete"
echo ""

# Step 6: Open report in browser
echo "📍 Step 6: Opening report..."
# Kill any existing server on port 8000
lsof -ti:8000 | xargs kill -9 2>/dev/null || true
sleep 1

# Start HTTP server for report
cd .reg
python3 -m http.server 8000 > /dev/null 2>&1 &
SERVER_PID=$!
cd ..

sleep 2
echo "✅ Report server started (PID: $SERVER_PID)"
echo "   Opening at http://localhost:8000/index.html"

# Try to open in browser
if command -v open &> /dev/null; then
    open "http://localhost:8000/index.html"
elif command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:8000/index.html"
fi

echo ""
echo "========================================="
echo "✅ All done!"
echo "========================================="
echo ""
echo "📊 Next steps:"
echo "   1. Review the report at http://localhost:8000/index.html"
echo "   2. Make code changes"
echo "   3. Run './regression.sh' again to compare"
echo ""
