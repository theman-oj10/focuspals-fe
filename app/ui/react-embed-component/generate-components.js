#!/usr/bin/env node
/**
 * Script to generate TSX components from JSON files
 * 
 * Usage:
 * node generate-components.js
 */

const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(process.cwd(), 'app/ui/react-embed-component');
const OUTPUT_DIR = SOURCE_DIR;

// Function to process a single JSON file
function processJsonFile(jsonFilePath) {
  try {
    console.log(`Processing ${jsonFilePath}...`);
    
    // Read and parse the JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(jsonContent);
    
    if (!jsonData.code) {
      console.error(`No code property found in ${jsonFilePath}`);
      return false;
    }
    
    // Generate output file path
    const fileName = path.basename(jsonFilePath, '.json');
    const outputFilePath = path.join(OUTPUT_DIR, `${fileName}.tsx`);
    
    // Add 'use client' directive if not already present
    let code = jsonData.code;
    if (!code.includes("'use client'") && !code.includes('"use client"')) {
      code = "'use client';\n" + code;
    }
    
    // Write to the TSX file
    fs.writeFileSync(outputFilePath, code, 'utf8');
    console.log(`Successfully created ${outputFilePath}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${jsonFilePath}:`, error.message);
    return false;
  }
}

// Main function to process all JSON files
function generateComponents() {
  // Find all JSON files in the source directory
  const files = fs.readdirSync(SOURCE_DIR);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  if (jsonFiles.length === 0) {
    console.log(`No JSON files found in ${SOURCE_DIR}`);
    return;
  }
  
  console.log(`Found ${jsonFiles.length} JSON file(s) to process.`);
  
  // Process each JSON file
  let successCount = 0;
  for (const jsonFile of jsonFiles) {
    const jsonFilePath = path.join(SOURCE_DIR, jsonFile);
    const success = processJsonFile(jsonFilePath);
    if (success) {
      successCount++;
    }
  }
  
  console.log(`\nSummary: Successfully processed ${successCount}/${jsonFiles.length} files.`);
}

// Run the generator
generateComponents(); 