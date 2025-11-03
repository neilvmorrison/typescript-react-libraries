import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

interface ITypeInfo {
  name: string;
  kind: string;
  description?: string;
  filePath: string;
}

async function extractTypesFromDTS(filePath: string): Promise<ITypeInfo[]> {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest
  );
  const types: ITypeInfo[] = [];
  ts.forEachChild(sourceFile, (node) => {
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      const isExported = node.modifiers?.some(
        (m) => m.kind === ts.SyntaxKind.ExportKeyword
      );
      if (isExported) {
        types.push({
          name: node.name.text,
          kind:
            node.kind === ts.SyntaxKind.InterfaceDeclaration
              ? 'interface'
              : 'type',
          filePath,
        });
      }
    }
  });
  return types;
}

async function generateTypePages() {
  const packages = [
    {
      name: 'component-library',
      path: 'packages/component-library/src',
      docsPath: 'packages/docs/app/types',
    },
    {
      name: 'utilities',
      path: 'packages/utilities/src',
      docsPath: 'packages/docs/app/types',
    },
    {
      name: 'hooks',
      path: 'packages/hooks/src',
      docsPath: 'packages/docs/app/types',
    },
  ];

  for (const pkg of packages) {
    if (!fs.existsSync(pkg.path)) continue;

    const types = await extractTypesFromDTS(pkg.path);
    const docsDir = pkg.docsPath;
    if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

    types.forEach((type) => {
      const mdxContent = `# ${type.name}\n\n**Kind:** ${type.kind}\n\n\`\`\`typescript\n// From @libraries/${pkg.name}\n\`\`\`\n`;

      fs.writeFileSync(
        path.join(docsDir, `${type.name.toLocaleLowerCase()}.mdx`),
        mdxContent
      );
    });

    const metaContent = `const meta = {
${types.map((t) => `  '${t.name.toLowerCase()}': '${t.name}',`).join('\n')}
};

export default meta;
`;
    fs.writeFileSync(path.join(docsDir, '_meta.ts'), metaContent);
  }
}

generateTypePages().catch(console.error);
