import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';
import './globals.css';
import { IBaseLayoutProps } from '@/types/base-layout';
import 'component-library/dist/index.css';

export const metadata = {
  title: 'Libraries Documentation',
  description: 'Complete documentation for hooks, utilities, and UI components',
  openGraph: {
    title: 'Libraries Documentation',
    description:
      'Complete documentation for hooks, utilities, and UI components',
    type: 'website',
  },
};

const navbar = (
  <Navbar
    logo={<b>Naked UI</b>}
    // ... Your additional navbar options
  />
);
const footer = (
  <Footer>MIT {new Date().getFullYear()} © Neil Morrison.</Footer>
);

export default async function RootLayout({ children }: IBaseLayoutProps) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head></Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          footer={footer}
        >
          <div className="min-h-screen">{children}</div>
        </Layout>
      </body>
    </html>
  );
}
