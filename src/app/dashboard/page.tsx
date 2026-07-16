// app/dashboard/page.tsx

'use client';

import { useNavMobileName } from '@/hooks/url-params/use-nav-mobile-name';

export default function DashboardPage() {
	const { navMobileNameName } = useNavMobileName();

	switch (navMobileNameName) {
		case 'advanced':
			return (
				<div className="bg-secondary rounded-2xl border p-6 text-center shadow-sm">
					<p className="font-medium">Welcome back!</p>
					<p className="text-muted-foreground mt-1 text-xs">
						Swipe left/right or tap bottom tabs to navigate.
					</p>
				</div>
			);
		case 'normal':
			return (
				<p className="text-gray-600">
					Select a section below to highlight its route.
				</p>
			);
		default:
			return null;
	}
}
