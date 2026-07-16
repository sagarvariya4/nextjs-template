// app/dashboard/layout.tsx

'use client';

import React from 'react';

import { useNavMobileName } from '@/hooks/url-params/use-nav-mobile-name';
import { useIsMobile } from '@/hooks/use-mobile';
import { useIsMounted } from '@/hooks/use-mounted';
import { DesktopLayout } from '@/components/layouts/desktop';
import {
	MobileLayoutAdvanced,
	MobileLayoutNormal,
} from '@/components/layouts/mobile';

interface DashboardLayoutProps {
	children: React.ReactNode;
	analytics: React.ReactNode;
	team: React.ReactNode;
}

export default function DashboardLayout({
	children,
	analytics,
	team,
}: DashboardLayoutProps) {
	const isMobile = useIsMobile();
	const isMounted = useIsMounted();
	const { navMobileNameName } = useNavMobileName();

	if (!isMounted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
				<p className="text-sm text-gray-400">Loading layout profile...</p>
			</div>
		);
	}

	if (isMobile) {
		switch (navMobileNameName) {
			case 'advanced':
				return (
					<MobileLayoutAdvanced
						analytics={analytics}
						team={team}
					>
						{children}
					</MobileLayoutAdvanced>
				);
			case 'normal':
				return <MobileLayoutNormal> {children} </MobileLayoutNormal>;
			default:
				return null;
		}
	}

	return (
		<DesktopLayout
			analytics={analytics}
			team={team}
		/>
	);
}
