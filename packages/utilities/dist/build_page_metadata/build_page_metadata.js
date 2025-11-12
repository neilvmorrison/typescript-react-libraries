export function build_page_metadata(config) {
    const { title, description, canonical_url, alternate_urls, og, twitter, keywords, authors, creator, published_time, modified_time, robots, } = config;
    const base_url = canonical_url ? new URL(canonical_url) : undefined;
    const og_config = {
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
    const twitter_config = {
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
//# sourceMappingURL=build_page_metadata.js.map