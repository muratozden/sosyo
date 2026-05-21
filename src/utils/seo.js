System.register("config/site", [], function (exports_1, context_1) {
    "use strict";
    var SITE;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("SITE", SITE = {
                name: 'Sosyo',
                title: 'Sosyo — Yeni nesil sosyalleşme aracı',
                description: 'Sosyo ile tanış, etiketlerle kendini ifade et ve yeni nesil sosyalleşme deneyimini keşfet. Sosyomat\'ın mirasıyla Türkiye\'nin sosyal ağı.',
                url: 'https://www.sosyo.org',
                locale: 'tr_TR',
                lang: 'tr',
                themeColor: '#ffffff',
                tileColor: '#000000',
                defaultImage: '/assets/images/share/og-default.png',
                faviconSvg: '/favicon.svg',
                maskIcon: '/assets/images/favicon/mask-icon.svg',
                twitter: '@sosyo',
                facebookAppId: '',
                email: 'iletisim@sosyo.org',
                sameAs: [
                    'https://www.facebook.com/sosyo',
                    'https://www.instagram.com/sosyo',
                ],
            });
        }
    };
});
System.register("utils/seo", ["config/site"], function (exports_2, context_2) {
    "use strict";
    var site_1;
    var __moduleName = context_2 && context_2.id;
    function resolveSiteOrigin(site) {
        return (site !== null && site !== void 0 ? site : new URL(site_1.SITE.url)).origin;
    }
    exports_2("resolveSiteOrigin", resolveSiteOrigin);
    function absoluteUrl(path, origin) {
        return new URL(path, origin).href;
    }
    exports_2("absoluteUrl", absoluteUrl);
    function pageTitle(pageTitle) {
        if (!pageTitle || pageTitle === site_1.SITE.title || pageTitle === site_1.SITE.name) {
            return site_1.SITE.title;
        }
        return `${pageTitle} | ${site_1.SITE.name}`;
    }
    exports_2("pageTitle", pageTitle);
    function buildCanonical(path, origin) {
        const normalized = path.startsWith('/') ? path : `/${path}`;
        return new URL(normalized === '/' ? '/' : normalized, origin).href;
    }
    exports_2("buildCanonical", buildCanonical);
    function webSiteJsonLd(origin) {
        return {
            '@context': 'https://schema.org',
            '@graph': [
                {
                    '@type': 'WebSite',
                    '@id': `${origin}/#website`,
                    url: origin,
                    name: site_1.SITE.name,
                    description: site_1.SITE.description,
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
                    name: site_1.SITE.name,
                    url: origin,
                    email: site_1.SITE.email,
                    logo: {
                        '@type': 'ImageObject',
                        url: absoluteUrl(site_1.SITE.faviconSvg, origin),
                    },
                    sameAs: site_1.SITE.sameAs.filter(Boolean),
                },
            ],
        };
    }
    exports_2("webSiteJsonLd", webSiteJsonLd);
    return {
        setters: [
            function (site_1_1) {
                site_1 = site_1_1;
            }
        ],
        execute: function () {
        }
    };
});
