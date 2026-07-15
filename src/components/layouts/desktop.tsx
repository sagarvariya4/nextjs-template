// app/dashboard/window-layouts/desktop.tsx
'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DesktopLayoutProps {
	analytics: React.ReactNode;
	team: React.ReactNode;
}

export function DesktopLayout({ analytics, team }: DesktopLayoutProps) {
	const router = useRouter();
	const pathname = usePathname();

	const isAnalyticsActive = pathname === '/dashboard/analytics';
	const isTeamActive = pathname === '/dashboard/team';

	return (
		<div className="min-h-screen p-6">
			<h1 className="mb-4 text-2xl font-bold">Desktop Dashboard</h1>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{/* Desktop Analytics Interactive Box */}
				<div
					onClick={() => router.push('/dashboard/analytics')}
					className={`cursor-pointer transition-all ${isAnalyticsActive ? 'scale-100 opacity-100' : 'opacity-80'}`}
				>
					{analytics}
				</div>

				{/* Desktop Team Interactive Box */}
				<div
					onClick={() => router.push('/dashboard/team')}
					className={`cursor-pointer transition-all ${isTeamActive ? 'scale-100 opacity-100' : 'opacity-80'}`}
				>
					{team}
				</div>
			</div>
		</div>
	);
}
