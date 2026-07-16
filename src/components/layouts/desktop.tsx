// app/components/layouts/desktop.tsx

'use client';

import React, { useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface DesktopLayoutProps {
	analytics: React.ReactNode;
	team: React.ReactNode;
}

export function DesktopLayout({ analytics, team }: DesktopLayoutProps) {
	const router = useRouter();
	const pathname = usePathname();

	const navigation = useMemo(
		() => [
			{
				header: 'Analytics View',
				title: 'Analytics',
				icon: '📊',
				path: '/dashboard/analytics',
				page: analytics,
			},
			{
				header: 'Team Roster',
				title: 'Team',
				icon: '👥',
				path: '/dashboard/team',
				page: team,
			},
		],
		[analytics, team],
	);

	return (
		<div className="min-h-screen p-6">
			<h1 className="mb-4 text-2xl font-bold">Desktop Dashboard</h1>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				{navigation.map(({ path, page }, index) => {
					const isActive = pathname === path;

					return (
						<div
							key={path + '-' + index}
							onClick={() => {
								if (isActive) return;
								router.push(path);
							}}
							className={`cursor-pointer transition-all ${isActive ? 'scale-100 opacity-100' : 'opacity-80'}`}
						>
							{page}
						</div>
					);
				})}
			</div>
		</div>
	);
}
