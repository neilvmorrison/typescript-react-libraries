# Type Documentation System

## Overview

The types documentation system provides comprehensive, auto-syncable documentation for all TypeScript types used across the libraries. This ensures documentation stays current with the source code implementation.

## Directory Structure

```
packages/docs/app/types/
├── page.mdx                          # Types overview
├── _meta.ts                          # Navigation metadata
├── result/
├── use-form-options/
├── use-form-return/
├── form-field-type/
├── api-fetch-options/
├── api-error/
├── event-map/
├── keyboard-shortcut-options/
├── local-storage-return/
├── page-metadata-config/
├── page-metadata-return/
├── open-graph-config/
└── twitter-config/
```

## Type Documentation Structure

Each type documentation page follows this standard format:

```markdown
# ITypeName

Brief description of the type.

## Definition

\`\`\`typescript
// Type definition code
\`\`\`

## Properties / Type Parameters

| Property | Type | Required | Description |
| -------- | ---- | -------- | ----------- |
| name     | type | yes/no   | description |

## Usage

\`\`\`typescript
// Practical usage examples
\`\`\`

## Related Types

- [`RelatedType`](/types/related-type) - Description

## Used In

- [`functionName`](/path/to/function)
```

## Linking Types from API Reference

All API reference sections should link to type definitions. Update your API documentation like this:

```markdown
### Parameters

| Name      | Type                                           | Required | Description   | Default   |
| --------- | ---------------------------------------------- | -------- | ------------- | --------- |
| `options` | [`IApiFetchOptions`](/types/api-fetch-options) | No       | Configuration | undefined |
```

Notice the type name is wrapped in a link to `/types/kebab-case-name`.

## Auto-Generation Script

### Purpose

The `scripts/generate-type-docs.ts` script:

- Extracts TypeScript definitions from source files
- Validates that documentation exists for extracted types
- Flags types with missing documentation
- Can be extended to auto-generate basic docs

### Usage

```bash
npm run docs:generate-types
```

### Configuration

Edit `scripts/generate-type-docs.ts` to add new types:

```typescript
const typeConfigs: TypeConfig[] = [
  {
    name: 'INewType', // Type name
    sourcePath: '../packages/hooks/src/path/file.ts', // Source location
    pattern: /export interface INewType[\s\S]*?(?=\nexport)/, // Extraction regex
    docPath: '../packages/docs/app/types/new-type', // Doc location
    description: 'Type description', // Brief description
    usedIn: ['functionName'], // Functions using this type
  },
  // ... more types
];
```

## Adding New Types

### Step 1: Export from Source

Make sure your type is exported in the source file:

```typescript
export interface IMyType {
  property: string;
}
```

### Step 2: Add to Script Config

Update `scripts/generate-type-docs.ts`:

```typescript
{
  name: 'IMyType',
  sourcePath: '../packages/utilities/src/file.ts',
  pattern: /export interface IMyType[\s\S]*?(?=\nexport)/,
  docPath: '../packages/docs/app/types/my-type',
  description: 'Description of IMyType',
  usedIn: ['functionThatUsesIt'],
}
```

### Step 3: Create Documentation

Create `/packages/docs/app/types/my-type/page.mdx`:

```markdown
# IMyType

Brief description.

## Definition

\`\`\`typescript
export interface IMyType {
property: string;
}
\`\`\`

## Properties

| Property | Type   | Description |
| -------- | ------ | ----------- |
| property | string | Description |

## Usage

\`\`\`typescript
// Example usage
\`\`\`

## Used In

- [`functionName`](/path/to/function)
```

### Step 4: Link from API Reference

In the function's documentation, link to the type:

```markdown
| Name    | Type                        | Description |
| ------- | --------------------------- | ----------- |
| `param` | [`IMyType`](/types/my-type) | Description |
```

### Step 5: Update \_meta.ts

Add the type to `/packages/docs/app/types/_meta.ts`:

```typescript
const meta = {
  index: 'Overview',
  'my-type': 'IMyType',
  // ... existing types
};
```

## Validation

Run the generation script to validate all types are documented:

```bash
npm run docs:generate-types
```

This will report:

- ✓ Extracted types
- ⚠️ Missing documentation
- ✓ Successfully linked types

## Type Naming Conventions

Following the codebase conventions:

- **Interfaces**: `IInterfaceName` (prepend with I)
- **Types**: `ITypeName` or `TypeName` (depending on context)
- **Files**: kebab-case (e.g., `use-form-options`)
- **Routes**: kebab-case matching file structure

## Cross-References

Types should reference related types and their usage locations:

```markdown
## Related Types

- [`IRelatedType`](/types/related-type) - Related for X reason

## Used In

- [`useForm`](/hooks/use-form)
- [`buildPageMetadata`](/utilities/build-page-metadata)
```

## Keeping Docs in Sync

### Automated Checks

Add to CI/CD pipeline:

```bash
npm run docs:generate-types --check
```

This validates that:

1. All exported types are documented
2. Documentation files exist
3. Cross-references are correct

### Manual Review

When updating types:

1. Update the type definition in source
2. Update the corresponding docs page
3. Run `npm run docs:generate-types`
4. Review any warnings

### Version Compatibility

Document TypeScript version requirements when applicable:

```markdown
## Requirements

- TypeScript 4.0+
- React 16.8+ (for hooks)
```

## Examples of Well-Documented Types

- [`IResult<T, E>`](/types/result) - Generic with examples and type guards
- [`IUseFormOptions<T>`](/types/use-form-options) - Config with detailed properties
- [`IEventMap`](/types/event-map) - Comprehensive mapping with categories

## Troubleshooting

### Type Documentation Not Appearing

1. Verify file exists at `/packages/docs/app/types/kebab-name/page.mdx`
2. Check `_meta.ts` includes the entry
3. Verify routing: `kebab-name` in URL should match file structure
4. Run `npm run build` to rebuild docs

### Cross-Reference Links Broken

1. Verify `/types/kebab-name` route exists
2. Check exact file name matches URL
3. Ensure page title matches intent
4. Verify \_meta.ts has correct key

### Script Not Finding Types

1. Update regex pattern in `typeConfigs`
2. Verify source file path is correct
3. Run script with verbose logging
4. Check TypeScript syntax of source type

## Contributing

When adding new features to libraries:

1. **Add type definition** with proper interface/export
2. **Update docs**: Run `npm run docs:generate-types`
3. **Create type page**: If new type, create `.mdx` file
4. **Link from API**: Update function docs to link to type
5. **Update \_meta.ts**: Add navigation entry if needed
6. **Test links**: Verify all cross-references work
