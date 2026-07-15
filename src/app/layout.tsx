import '@/styles/globals.css';
import '@/styles/themes.css';
import '@/styles/radius.css';
import '@/styles/menu.css';
import '@/styles/fonts.css';

// TODO: Add all styles
// INFO: Need to add all components in all styles and their style css
// shadcn/ui repo path: apps/v4/styles/radix-luma/ui/accordion.tsx
// shadcn/ui repo path: apps/v4/registry/styles/style-lyra.css
// import '@/styles/style-luma.css';
// import '@/styles/style-lyra.css';
// import '@/styles/style-maia.css';
// import '@/styles/style-mira.css';
// import '@/styles/style-nova.css';
// import '@/styles/style-rhea.css';
// import '@/styles/style-sera.css';
// import '@/styles/style-vega.css';

import { getLocale } from 'next-intl/server';

import { Provider } from '@/components/providers';

export { metadata, viewport } from '@/meta/root';

interface Props {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: Readonly<Props>) {
	const locale = await getLocale();
	return (
		<html
			lang={locale}
			suppressHydrationWarning
		>
			<body className="font-sans antialiased">
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
