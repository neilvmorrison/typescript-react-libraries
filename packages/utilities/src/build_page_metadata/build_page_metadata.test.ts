import { describe, it, expect } from 'vitest';
import { build_page_metadata } from './build_page_metadata';

describe('build_page_metadata', () => {
  it('should build basic metadata with title and description', () => {
    const result = build_page_metadata({
      title: 'Test Page',
      description: 'Test description',
    });

    expect(result.title).toBe('Test Page');
    expect(result.description).toBe('Test description');
  });

  it('should include keywords when provided', () => {
    const keywords = ['react', 'nextjs', 'seo'];
    const result = build_page_metadata({
      title: 'Test',
      description: 'Test',
      keywords,
    });

    expect(result.keywords).toEqual(keywords);
  });

  it('should include authors when provided', () => {
    const authors = [
      { name: 'John Doe', url: 'https://example.com/john' },
      { name: 'Jane Smith' },
    ];
    const result = build_page_metadata({
      title: 'Test',
      description: 'Test',
      authors,
    });

    expect(result.authors).toEqual(authors);
  });

  it('should set metadataBase from canonical_url', () => {
    const canonical_url = 'https://example.com/page';
    const result = build_page_metadata({
      title: 'Test',
      description: 'Test',
      canonical_url,
    });

    expect(result.metadataBase).toEqual(new URL(canonical_url));
  });

  it('should not set metadataBase when canonical_url is not provided', () => {
    const result = build_page_metadata({
      title: 'Test',
      description: 'Test',
    });

    expect(result.metadataBase).toBeUndefined();
  });

  it('should include alternates with canonical and languages', () => {
    const alternate_urls = {
      canonical: 'https://example.com/page',
      languages: {
        'es-MX': 'https://example.com/es/page',
        'fr-FR': 'https://example.com/fr/page',
      },
    };
    const result = build_page_metadata({
      title: 'Test',
      description: 'Test',
      alternate_urls,
    });

    expect(result.alternates).toEqual(alternate_urls);
  });

  describe('Open Graph', () => {
    it('should build basic open graph metadata', () => {
      const result = build_page_metadata({
        title: 'Test Article',
        description: 'Article description',
        canonical_url: 'https://example.com/article',
        og: {
          type: 'article',
        },
      });

      expect(result.openGraph?.title).toBe('Test Article');
      expect(result.openGraph?.description).toBe('Article description');
      expect(result.openGraph?.type).toBe('article');
      expect(result.openGraph?.url).toBe('https://example.com/article');
    });

    it('should default og type to website', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
      });

      expect(result.openGraph?.type).toBe('website');
    });

    it('should include open graph images with metadata', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        og: {
          type: 'website',
          images: [
            {
              url: 'https://example.com/og.jpg',
              width: 1200,
              height: 630,
              alt: 'Open graph image',
            },
          ],
        },
      });

      expect(result.openGraph?.images).toHaveLength(1);
      expect(result.openGraph?.images?.[0]).toMatchObject({
        url: 'https://example.com/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Open graph image',
      });
    });

    it('should default og image alt to title when not provided', () => {
      const result = build_page_metadata({
        title: 'My Title',
        description: 'Test',
        og: {
          type: 'website',
          images: [
            {
              url: 'https://example.com/og.jpg',
            },
          ],
        },
      });

      expect(result.openGraph?.images?.[0].alt).toBe('My Title');
    });

    it('should include article metadata', () => {
      const result = build_page_metadata({
        title: 'Article',
        description: 'Test',
        og: {
          type: 'article',
          article: {
            published_time: '2025-01-15',
            modified_time: '2025-01-20',
            authors: ['John Doe', 'Jane Smith'],
            section: 'Technology',
            tags: ['react', 'nextjs'],
          },
        },
      });

      expect(result.openGraph?.article).toMatchObject({
        publishedTime: '2025-01-15',
        modifiedTime: '2025-01-20',
        authors: ['John Doe', 'Jane Smith'],
        section: 'Technology',
        tags: ['react', 'nextjs'],
      });
    });

    it('should include profile metadata for profile type', () => {
      const result = build_page_metadata({
        title: 'Profile',
        description: 'Test',
        og: {
          type: 'profile',
          profile: {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
          },
        },
      });

      expect(result.openGraph?.profile).toMatchObject({
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
      });
    });

    it('should include video metadata', () => {
      const result = build_page_metadata({
        title: 'Video',
        description: 'Test',
        og: {
          type: 'website',
          videos: [
            {
              url: 'https://example.com/video.mp4',
              width: 1920,
              height: 1080,
            },
          ],
        },
      });

      expect(result.openGraph?.videos).toHaveLength(1);
      expect(result.openGraph?.videos?.[0]).toMatchObject({
        url: 'https://example.com/video.mp4',
        width: 1920,
        height: 1080,
      });
    });

    it('should set siteName and locale', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        og: {
          type: 'website',
          site_name: 'My Site',
          locale: 'fr_FR',
        },
      });

      expect(result.openGraph?.siteName).toBe('My Site');
      expect(result.openGraph?.locale).toBe('fr_FR');
    });

    it('should default locale to en_US', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
      });

      expect(result.openGraph?.locale).toBe('en_US');
    });
  });

  describe('Twitter', () => {
    it('should build twitter metadata', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        twitter: {
          creator: '@myhandle',
        },
      });

      expect(result.twitter?.creator).toBe('@myhandle');
      expect(result.twitter?.title).toBe('Test');
      expect(result.twitter?.description).toBe('Test');
    });

    it('should default twitter card to summary_large_image', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
      });

      expect(result.twitter?.card).toBe('summary_large_image');
    });

    it('should include twitter images', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        twitter: {
          card: 'summary_large_image',
          images: ['https://example.com/twitter-image.jpg'],
        },
      });

      expect(result.twitter?.images).toEqual([
        'https://example.com/twitter-image.jpg',
      ]);
    });

    it('should include twitter site handle', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        twitter: {
          site: '@mysite',
        },
      });

      expect(result.twitter?.site).toBe('@mysite');
    });
  });

  describe('Publication metadata', () => {
    it('should include published and modified times', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        published_time: '2025-01-15T10:00:00Z',
        modified_time: '2025-01-20T14:30:00Z',
      });

      expect(result.publishedTime).toBe('2025-01-15T10:00:00Z');
      expect(result.modifiedTime).toBe('2025-01-20T14:30:00Z');
    });

    it('should include creator', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        creator: 'John Doe',
      });

      expect(result.creator).toBe('John Doe');
    });

    it('should include robots meta', () => {
      const result = build_page_metadata({
        title: 'Test',
        description: 'Test',
        robots: 'index, follow',
      });

      expect(result.robots).toBe('index, follow');
    });
  });

  describe('Complex scenarios', () => {
    it('should build complete metadata with all options', () => {
      const result = build_page_metadata({
        title: 'Complete Article',
        description: 'A complete article with all metadata',
        canonical_url: 'https://example.com/complete-article',
        keywords: ['article', 'nextjs', 'seo'],
        authors: [{ name: 'Author Name', url: 'https://example.com/author' }],
        creator: 'My Site',
        published_time: '2025-01-15',
        modified_time: '2025-01-20',
        robots: 'index, follow',
        og: {
          type: 'article',
          images: [{ url: 'https://example.com/og.jpg', alt: 'Article image' }],
          site_name: 'My Blog',
          article: {
            published_time: '2025-01-15',
            authors: ['Author Name'],
            tags: ['nextjs', 'seo'],
          },
        },
        twitter: {
          creator: '@authorhandle',
          card: 'summary_large_image',
        },
      });

      expect(result.title).toBe('Complete Article');
      expect(result.description).toBe('A complete article with all metadata');
      expect(result.metadataBase?.origin).toBe('https://example.com');
      expect(result.keywords).toHaveLength(3);
      expect(result.authors).toHaveLength(1);
      expect(result.openGraph?.type).toBe('article');
      expect(result.twitter?.creator).toBe('@authorhandle');
    });

    it('should override defaults with explicit og values', () => {
      const result = build_page_metadata({
        title: 'Page Title',
        description: 'Page Description',
        og: {
          type: 'article',
          title: 'Custom OG Title',
          description: 'Custom OG Description',
        },
      });

      expect(result.openGraph?.title).toBe('Custom OG Title');
      expect(result.openGraph?.description).toBe('Custom OG Description');
    });

    it('should override defaults with explicit twitter values', () => {
      const result = build_page_metadata({
        title: 'Page Title',
        description: 'Page Description',
        twitter: {
          title: 'Custom Twitter Title',
          description: 'Custom Twitter Description',
          card: 'summary',
        },
      });

      expect(result.twitter?.title).toBe('Custom Twitter Title');
      expect(result.twitter?.description).toBe('Custom Twitter Description');
      expect(result.twitter?.card).toBe('summary');
    });
  });
});
