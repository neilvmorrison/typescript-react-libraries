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
export interface IBuildPageMetadataConfig {
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
export interface IBuildPageMetadataReturn {
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
export declare function build_page_metadata(config: IBuildPageMetadataConfig): IBuildPageMetadataReturn;
export {};
//# sourceMappingURL=build_page_metadata.d.ts.map