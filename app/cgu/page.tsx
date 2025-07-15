import { getTranslations } from 'next-intl/server';

export default async function TermsOfUsePage() {
    const t = await getTranslations('cgu');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <header className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {t('title')}
                        </h1>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p>{t('lastUpdated')}</p>
                            <p>{t('gdprNotice')}</p>
                        </div>
                    </header>

                    <section className="space-y-8">
                        <div>
                            <h2 className="text-xl font-semibold text-orange-600 mb-4">{t('preambleTitle')}</h2>
                            <div className="prose text-gray-700 space-y-4">
                                <p>
                                    {t('preambleText1', {
                                        websiteLink: t('variables.websiteLink'),
                                        rcsNumber: t('variables.rcsNumber'),
                                        siretNumber: t('variables.siretNumber'),
                                        vatNumber: t('variables.vatNumber')
                                    })}
                                </p>
                                <p>{t('preambleText2')}</p>
                                <p>{t('preambleText3')}</p>
                                <p>
                                    {t('preambleText4')}
                                    <a href="mailto:contact@mesconvictions.com" className="text-blue-600 hover:underline ml-1">
                                        contact@mesconvictions.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-orange-600 mb-4">{t('definitionsTitle')}</h2>
                            <p className="text-gray-700">
                                {t('definitionsText')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-orange-600 mb-4">{t('articlesTitle')}</h2>
                            <p className="text-gray-700">
                                {t('articlesText')}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-orange-600 mb-4">{t('rightsTitle')}</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    {t('rightsText1')}
                                    <a href="mailto:contact@mesconvictions.com" className="text-blue-600 hover:underline ml-1">
                                        contact@mesconvictions.com
                                    </a>
                                </p>
                                <p>{t('rightsText2')}</p>
                                <p>
                                    {t('rightsText3')}
                                    <a href="mailto:contact@mesconvictions.com" className="text-blue-600 hover:underline ml-1">
                                        contact@mesconvictions.com
                                    </a>
                                </p>
                                <p>
                                    {t('rightsText4')}
                                </p>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-orange-600 mb-4">{t('jurisdictionTitle')}</h2>
                            <div className="text-gray-700 space-y-4">
                                <p>
                                    {t('jurisdictionText1')}
                                </p>
                                <p>
                                    {t('jurisdictionText2')}
                                </p>
                            </div>
                        </div>
                    </section>

                    <footer className="mt-12 pt-8 border-t border-gray-200">
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-2">{t('contactTitle')}</h3>
                            <div className="text-sm text-gray-600 space-y-1">
                                <p>MES CONVICTIONS</p>
                                <p>{t('contactAddress')}</p>
                                <p>{t('contactEmail')} <a href="mailto:contact@mesconvictions.com" className="text-blue-600 hover:underline">contact@mesconvictions.com</a></p>
                                <p>{t('contactSiret')} {t('variables.siretNumber')}</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}