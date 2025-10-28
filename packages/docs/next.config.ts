import nextra from 'nextra';

const withNextra = nextra({
  latex: true,
  defaultShowCopyCode: true,
});

export default withNextra({
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.ts',
    },
  },
  redirects() {
    return [
      {
        source: '/docs',
        destination: '/',
        permanent: true,
      },
    ];
  },
});
