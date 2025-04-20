'use server';

import fs from 'fs';
import path from 'path';

export async function writeJsonToTsxFile(jsonData: { code: string }, outputFilePath: string): Promise<boolean> {
  try {
    // Make sure the directory exists
    const dir = path.dirname(outputFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write the code directly to a tsx file
    fs.writeFileSync(outputFilePath, jsonData.code, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing TSX file:', error);
    return false;
  }
} 