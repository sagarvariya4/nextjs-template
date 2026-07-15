// app/dashboard/layout.tsx
'use client';

import React from 'react';

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
	const isMounted = useIsMounted(); // 🆕 Prevent SSR/Hydration mismatches by waiting for the client mount

	if (!isMounted) {
		return (
			<div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
				<p className="text-sm text-gray-400">Loading layout profile...</p>
			</div>
		);
	}

	if (isMobile) {
		const showAdvances = true;
		return showAdvances ? (
			<MobileLayoutAdvanced
				analytics={analytics}
				team={team}
			>
				{children}
			</MobileLayoutAdvanced>
		) : (
			<MobileLayoutNormal> {children} </MobileLayoutNormal>
		);
	}

	return (
		<DesktopLayout
			analytics={analytics}
			team={team}
		/>
	);
}
