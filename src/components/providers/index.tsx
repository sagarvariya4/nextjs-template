import { ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { CookieStoreProvider } from '@/components/providers/cookie-store-provider';
import { Dialogs } from '@/components/providers/dialogs';
import { I18NProvider } from '@/components/providers/i18n-provider';
import { NuqsURLParamStoreProvider } from '@/components/providers/nuqs-url-param-store-provider';
import { ThemeModeProvider } from '@/components/providers/theme-mode-provider';
import { ThemePresetProvider } from '@/components/providers/theme-preset-provider';
import { ServiceWorkerRegister } from '@/components/pwa/sw-register';

export function Provider({ children }: { children: ReactNode }) {
	return (
		<>
			<I18NProvider>
				<NuqsURLParamStoreProvider>
					<CookieStoreProvider>
						<ThemePresetProvider>
							<ThemeModeProvider>
								<TooltipProvider>
									{children}
									<Toaster />
									<Dialogs />
								</TooltipProvider>
							</ThemeModeProvider>
						</ThemePresetProvider>
					</CookieStoreProvider>
				</NuqsURLParamStoreProvider>
				<ServiceWorkerRegister />
			</I18NProvider>
		</>
	);
}
