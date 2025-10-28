#!/usr/bin/env node

/**
 * Generate type documentation from source files
 * This script extracts TypeScript interfaces and types, then generates
 * MDX documentation to keep docs in sync with source code.
 *
 * Usage: npx ts-node scripts/generate-type-docs.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface TypeConfig {
  name: string;
  sourcePath: string;
  pattern: RegExp;
  docPath: string;
  description: string;
  usedIn?: string[];
}

const typeConfigs: TypeConfig[] = [
  {
    name: 'IResult',
    sourcePath: '../packages/utilities/src/try_catch/try_catch.ts',
    pattern: /export (?:interface|type) IResult[\s\S]*?(?=\n(?:export|$))/,
    docPath: '../packages/docs/app/types/result',
    description: 'Generic result type for error handling',
    usedIn: [
      'try_catch',
      'api_fetch',
      'api_get',
      'api_post',
      'api_put',
      'api_patch',
      'api_delete',
    ],
  },
  {
    name: 'IUseFormOptions',
    sourcePath: '../packages/hooks/src/use_form/use_form.ts',
    pattern: /export interface IUseFormOptions[\s\S]*?(?=\nexport)/,
    docPath: '../packages/docs/app/types/use-form-options',
    description: 'Form hook configuration',
    usedIn: ['useForm'],
  },
  {
    name: 'IUseFormReturn',
    sourcePath: '../packages/hooks/src/use_form/use_form.ts',
    pattern: /export interface IUseFormReturn[\s\S]*?(?=\nexport)/,
    docPath: '../packages/docs/app/types/use-form-return',
    description: 'Form hook return value',
    usedIn: ['useForm'],
  },
  {
    name: 'IFormFieldType',
    sourcePath: '../packages/hooks/src/use_form/use_form.ts',
    pattern: /export type IFormFieldType[\s\S]*?(?=\n(?:export|;))/,
    docPath: '../packages/docs/app/types/form-field-type',
    description: 'Supported form field types',
    usedIn: ['useForm'],
  },
  {
    name: 'IApiFetchOptions',
    sourcePath: '../packages/utilities/src/api_fetch/api_fetch.ts',
    pattern: /export interface IApiFetchOptions[\s\S]*?(?=\n(?:export|$))/,
    docPath: '../packages/docs/app/types/api-fetch-options',
    description: 'API fetch configuration',
  },
  {
    name: 'IApiError',
    sourcePath: '../packages/utilities/src/api_fetch/api_fetch.ts',
    pattern: /export (?:interface|class) IApiError[\s\S]*?(?=\n(?:export|$))/,
    docPath: '../packages/docs/app/types/api-error',
    description: 'API error structure',
  },
  {
    name: 'IEventMap',
    sourcePath:
      '../packages/hooks/src/use_event_listener/use_event_listener.ts',
    pattern: /export interface IEventMap[\s\S]*?(?=\nexport function)/,
    docPath: '../packages/docs/app/types/event-map',
    description: 'Event type mapping',
    usedIn: ['useEventListener'],
  },
];

function readSourceFile(filePath: string): string {
  const fullPath = path.join(__dirname, filePath);
  try {
    return fs.readFileSync(fullPath, 'utf-8');
  } catch (error) {
    console.error(`Failed to read ${fullPath}:`, error);
    return '';
  }
}

function extractType(content: string, pattern: RegExp): string {
  const match = content.match(pattern);
  return match ? match[0] : '';
}

function formatTypeDefinition(typeCode: string): string {
  return `\`\`\`typescript\n${typeCode.trim()}\n\`\`\``;
}

console.log('📝 Generating type documentation...\n');

typeConfigs.forEach((config) => {
  console.log(`Processing ${config.name}...`);

  const sourceContent = readSourceFile(config.sourcePath);
  if (!sourceContent) {
    console.warn(`  ⚠️  Could not read source file: ${config.sourcePath}`);
    return;
  }

  const typeDefinition = extractType(sourceContent, config.pattern);
  if (!typeDefinition) {
    console.warn(`  ⚠️  Could not extract ${config.name} from source`);
    return;
  }

  console.log(`  ✓ Extracted ${config.name}`);
  console.log(`  → Found in ${config.sourcePath}`);
});

console.log('\n✅ Type documentation generation complete!');
console.log('\nNext steps:');
console.log('1. Review generated documentation');
console.log('2. Add manual descriptions and examples');
console.log('3. Link from API reference sections');
console.log('\nTo automate further, add this to package.json scripts:');
console.log('  "docs:generate-types": "ts-node scripts/generate-type-docs.ts"');
