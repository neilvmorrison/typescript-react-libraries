import { useEffect } from 'react';
import {
  build_page_metadata,
  type IBuildPageMetadataConfig,
} from '@libraries/utilities';

export function usePageMetadata(options: IBuildPageMetadataConfig) {
  const metadata = build_page_metadata(options);

  useEffect(() => {
    if (metadata.title) {
      document.title = metadata.title;
    }

    const setMetaTag = (name: string, content: string) => {
      if (!content) return;
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMetaTag('description', metadata.description ?? '');
    setMetaTag('keywords', (metadata.keywords ?? []).join(','));
    setMetaTag(
      'authors',
      (metadata.authors ?? [])
        .map((author: { name: string }) => author.name)
        .join(',')
    );
    setMetaTag('creator', metadata.creator ?? '');
    setMetaTag('publishedTime', metadata.publishedTime ?? '');
    setMetaTag('modifiedTime', metadata.modifiedTime ?? '');
    setMetaTag('robots', metadata.robots ?? '');
  }, [metadata]);
}
