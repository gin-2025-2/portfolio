#!/bin/bash

# Visual Regression Testing Automation Script
# Usage: ./regression.sh

set -e  # Exit on error

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCREENSHOT_DIR="$PROJECT_DIR/screenshot"
REG_DIR="$PROJECT_DIR/.reg"
EXPECTED_DIR="$REG_DIR/expected"
DIFF_DIR="$REG_DIR/diff"

echo "========================================="
echo "Visual Regression Testing"
echo "========================================="

# Step 1: Check if server is running
echo ""
echo "📍 Step 1: Checking server..."
if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Server not running at http://localhost:3000"
    echo "💡 Please start the server first: npm run dev"
    exit 1
fi
echo "✅ Server is running"

# Step 2: Create all necessary directories
echo ""
echo "📍 Step 2: Creating directories..."
mkdir -p "$SCREENSHOT_DIR"
mkdir -p "$EXPECTED_DIR"
mkdir -p "$DIFF_DIR"
echo "✅ Directories ready"
echo "   Screenshot: $SCREENSHOT_DIR"
echo "   Expected: $EXPECTED_DIR"

# Step 3: Take screenshots
echo ""
echo "📍 Step 3: Taking screenshots..."
cd "$PROJECT_DIR"
npm run screenshot
echo "✅ Screenshots captured"

# Step 4: Check if screenshot exists
echo ""
echo "📍 Step 4: Checking screenshot..."
if [ ! -f "$SCREENSHOT_DIR/index.png" ]; then
    echo "❌ No screenshots found in $SCREENSHOT_DIR"
    exit 1
fi
echo "✅ Screenshot verified: index.png"

# Step 5: Setup expected for comparison
echo ""
echo "📍 Step 5: Setting up expected baseline..."

# On first run, set expected baseline.
if [ ! -f "$EXPECTED_DIR/index.png" ] || [ ! -s "$EXPECTED_DIR/index.png" ]; then
    echo "📌 First run - Setting baseline..."
    cp "$SCREENSHOT_DIR/index.png" "$EXPECTED_DIR/index.png"
else
    echo "📌 Baseline already exists in $EXPECTED_DIR. Comparing..."
fi
echo "✅ Expected set: $EXPECTED_DIR/index.png"

# Step 6: Run regression test
echo ""
echo "📍 Step 6: Running local regression test (reg-cli)..."
npx reg-cli "$SCREENSHOT_DIR" "$EXPECTED_DIR" "$DIFF_DIR" -R "$REG_DIR/index.html" -I
echo "✅ Regression test complete"

# Step 7: Open report
echo ""
echo "📍 Step 7: Opening report..."
if [ -f "$REG_DIR/index.html" ]; then
    # Kill any existing server on port 8000
    lsof -ti:8000 | xargs kill -9 2>/dev/null || true
    sleep 1
    
    # Start HTTP server for the report from the project root
    # so that paths like ../screenshot correctly resolve
    cd "$PROJECT_DIR"
    python3 -m http.server 8000 > /dev/null 2>&1 &
    SERVER_PID=$!
    sleep 2
    
    # Open in browser
    open "http://localhost:8000/.reg/index.html"
    echo "✅ Report opened at http://localhost:8000/.reg/index.html"
    echo "💡 Server running with PID: $SERVER_PID"
else
    echo "⚠️  Report file not found at $REG_DIR/index.html"
fi

echo ""
echo "========================================="
echo "✅ All done!"
echo "========================================="
echo ""
echo "📊 Next steps:"
echo "   1. Make changes to your code"
echo "   2. Run './regression.sh' again"
echo "   3. View differences in the HTML report"
echo ""
