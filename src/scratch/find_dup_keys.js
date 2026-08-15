const fs = require('fs');

function findDuplicatesInJSONFile(filePath) {
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  
  // Track stack of objects
  const stack = [new Set()];
  const indentStack = [-1];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) return;

    // Detect line indentation level
    const indent = line.search(/\S/);

    // Pop stack if indent is less than previous object start
    while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) {
      indentStack.pop();
      stack.pop();
    }

    const match = line.match(/"([^"]+)":/);
    if (match) {
      const key = match[1];
      const currentScope = stack[stack.length - 1];
      if (currentScope.has(key)) {
        console.log(`[${filePath}] Duplicate key at line ${lineNum}: "${key}"`);
      } else {
        currentScope.add(key);
      }

      if (line.includes('{')) {
        stack.push(new Set());
        indentStack.push(indent);
      }
    }
  });
}

findDuplicatesInJSONFile('client/app/locales/vi.json');
findDuplicatesInJSONFile('client/app/locales/en.json');
