type IOgType = 'website' | 'article' | 'product' | 'book' | 'profile';
type ITwitterCardType = 'summary' | 'summary_large_image' | 'app' | 'player';

interface IOpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

interface IOpenGraphVideo {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

interface IOpenGraphProfile {
  first_name?: string;
  last_name?: string;
  username?: string;
  gender?: string;
}

interface IOpenGraphArticle {
  published_time?: string;
  modified_time?: string;
  expiration_time?: string;
  authors?: string[];
  section?: string;
  tags?: string[];
}

interface IOpenGraphConfig {
  title: string;
  description: string;
  url?: string;
  type: IOgType;
  images?: IOpenGraphImage[];
  videos?: IOpenGraphVideo[];
  locale?: string;
  site_name?: string;
  profile?: IOpenGraphProfile;
  article?: IOpenGraphArticle;
}

interface ITwitterConfig {
  card: ITwitterCardType;
  creator?: string;
  site?: string;
  title?: string;
  description?: string;
  images?: string[];
}

interface IAlternates {
  canonical?: string;
  languages?: Record<string, string>;
}

interface IAuthor {
  name: string;
  url?: string;
}

interface IBuildPageMetadataConfig {
  title: string;
  description: string;
  canonical_url?: string;
  alternate_urls?: IAlternates;
  og?: Partial<IOpenGraphConfig>;
  twitter?: Partial<ITwitterConfig>;
  keywords?: string[];
  authors?: IAuthor[];
  creator?: string;
  published_time?: string;
  modified_time?: string;
  robots?: string;
}

interface IMetadataImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

interface IMetadataOpenGraph {
  title?: string;
  description?: string;
  type?: IOgType;
  url?: string;
  images?: IMetadataImage[];
  videos?: IOpenGraphVideo[];
  locale?: string;
  siteName?: string;
  profile?: IOpenGraphProfile;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    expirationTime?: string;
    authors?: string[];
    section?: string;
    tags?: string[];
  };
}

interface IMetadataTwitter {
  card?: ITwitterCardType;
  creator?: string;
  site?: string;
  title?: string;
  description?: string;
  images?: string[];
}

interface IMetadataAuthor {
  name: string;
  url?: string;
}

interface IBuildPageMetadataReturn {
  title?: string;
  description?: string;
  keywords?: string[];
  authors?: IMetadataAuthor[];
  creator?: string;
  publishedTime?: string;
  modifiedTime?: string;
  robots?: string;
  metadataBase?: URL;
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: IMetadataOpenGraph;
  twitter?: IMetadataTwitter;
}

export function build_page_metadata(
  config: IBuildPageMetadataConfig
): IBuildPageMetadataReturn {
  const {
    title,
    description,
    canonical_url,
    alternate_urls,
    og,
    twitter,
    keywords,
    authors,
    creator,
    published_time,
    modified_time,
    robots,
  } = config;

  const base_url = canonical_url ? new URL(canonical_url) : undefined;

  const og_config: IMetadataOpenGraph = {
    title: og?.title ?? title,
    description: og?.description ?? description,
    type: og?.type ?? 'website',
    url: og?.url ?? canonical_url,
    locale: og?.locale ?? 'en_US',
    siteName: og?.site_name,
  };

  if (og?.images) {
    og_config.images = og.images.map((img) => ({
      url: img.url,
      width: img.width,
      height: img.height,
      alt: img.alt ?? title,
      type: img.type,
    }));
  }

  if (og?.videos) {
    og_config.videos = og.videos;
  }

  if (og?.profile) {
    og_config.profile = og.profile;
  }

  if (og?.article) {
    og_config.article = {
      publishedTime: og.article.published_time,
      modifiedTime: og.article.modified_time,
      expirationTime: og.article.expiration_time,
      authors: og.article.authors,
      section: og.article.section,
      tags: og.article.tags,
    };
  }

  const twitter_config: IMetadataTwitter = {
    card: twitter?.card ?? 'summary_large_image',
    creator: twitter?.creator,
    site: twitter?.site,
    title: twitter?.title ?? title,
    description: twitter?.description ?? description,
    images: twitter?.images,
  };

  return {
    title,
    description,
    keywords,
    authors,
    creator,
    publishedTime: published_time,
    modifiedTime: modified_time,
    robots,
    metadataBase: base_url,
    alternates: alternate_urls,
    openGraph: og_config,
    twitter: twitter_config,
  };
}
