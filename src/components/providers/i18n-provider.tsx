'use client';

import { ReactNode, Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';

export function I18NProvider({ children }: { children: ReactNode }) {
	return (
		<Suspense>
			<NextIntlClientProvider locale="en">{children}</NextIntlClientProvider>
		</Suspense>
	);
}
