import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function walkDir(dir, callback) {
    readdirSync(dir).forEach(f => {
        let dirPath = join(dir, f);
        let isDirectory = statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(join(dir, f));
    });
}

// Find all JSX files
walkDir('./src', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = readFileSync(filePath, 'utf8');
        // Remove duplicate React imports
        content = content.replace(/import React from ['"]react['"];?\n/g, '');
        // Add single React import at the top if not present
        if (!content.includes('import React')) {
            content = `import React from 'react';\n${content}`;
        }
        writeFileSync(filePath, content);
        console.log(`Fixed imports in ${filePath}`);
    }
}); 