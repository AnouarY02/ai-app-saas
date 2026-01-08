#!/bin/bash
cd frontend

# Fix 1: Remove CSS modules
find src -name "*.module.css" -delete

# Fix 2: Remove routes/ directory
rm -rf src/routes

# Fix 3: Remove redux/
rm -rf src/redux

# Fix 4: Fix imports in all tsx/ts files
find src -name "*.tsx" -o -name "*.ts" | while read file; do
  # Remove CSS module imports
  sed -i '/import.*\.module\.css/d' "$file"
  sed -i '/import.*from.*\.module\.css/d' "$file"
  
  # Remove Redux imports
  sed -i '/import.*from.*redux/d' "$file"
  
  # Fix className={styles.xxx} to className=""
  sed -i 's/className={styles\.[a-zA-Z0-9_]*}/className=""/g' "$file"
  
  # Fix routes/ imports to pages/
  sed -i 's/from.*\.\.\/routes\//from "..\/pages\//g' "$file"
done

# Fix 5: Ensure index.css exists
if [ ! -f "src/index.css" ]; then
  cat > src/index.css << 'CSS'
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; }
CSS
fi

echo "✅ Quick fixes applied"
