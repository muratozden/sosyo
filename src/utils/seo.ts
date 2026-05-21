import { SITE } from '../config/site';

export type SeoProps = {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
	imageAlt?: string;
	noindex?: boolean;
	type?: 'website' | 'article' | 'profile';
};

export function resolveSiteOrigin(site: URL | undefined): string {
	return (site ?? new URL(SITE.url)).origin;
}

export function absoluteUrl(path: string, origin: string): string {
	return new URL(path, origin).href;
}

export function pageTitle(pageTitle?: string): string {
	if (!pageTitle || pageTitle === SITE.title || pageTitle === SITE.name) {
		return SITE.title;
	}
	return `${pageTitle} | ${SITE.name}`;
}

export function buildCanonical(path: string, origin: string): string {
	const normalized = path.startsWith('/') ? path : `/${path}`;
	return new URL(normalized === '/' ? '/' : normalized, origin).href;
}

export function webSiteJsonLd(origin: string) {
	return {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'WebSite',
				'@id': `${origin}/#website`,
				url: origin,
				name: SITE.name,
				description: SITE.description,
				inLanguage: 'tr-TR',
				publisher: { '@id': `${origin}/#organization` },
				potentialAction: {
					'@type': 'SearchAction',
					target: {
						'@type': 'EntryPoint',
						urlTemplate: `${origin}/?q={search_term_string}`,
					},
					'query-input': 'required name=search_term_string',
				},
			},
			{
				'@type': 'Organization',
				'@id': `${origin}/#organization`,
				name: SITE.name,
				url: origin,
				email: SITE.email,
				logo: {
					'@type': 'ImageObject',
					url: absoluteUrl(SITE.faviconSvg, origin),
				},
				sameAs: SITE.sameAs.filter(Boolean),
			},
		],
	};
}
