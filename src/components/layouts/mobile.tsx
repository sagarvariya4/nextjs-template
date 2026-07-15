// app/dashboard/window-layouts/mobile.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { useIsMobile } from '@/hooks/use-mobile';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';

interface MobileLayoutNormalProps {
	children: React.ReactNode;
}

/**
 * This renders dashboard/(analytica/team)/page.tsx
 *
 * @param children
 */
export function MobileLayoutNormal({ children }: MobileLayoutNormalProps) {
	const router = useRouter();
	const pathname = usePathname();

	return (
		<div className="min-h-screen p-4">
			<h1 className="mb-4 text-xl font-bold">Mobile Dashboard</h1>

			{/* Render base menu options if exactly at /dashboard */}
			{pathname === '/dashboard' && (
				<div className="flex flex-col gap-3">
					<button
						onClick={() => router.push('/dashboard/analytics')}
						className="w-full rounded-xl border bg-white p-4 text-left font-medium text-blue-600 shadow-sm"
					>
						📊 Go to Analytics Page
					</button>
					<button
						onClick={() => router.push('/dashboard/team')}
						className="w-full rounded-xl border bg-white p-4 text-left font-medium text-green-600 shadow-sm"
					>
						👥 Go to Team Page
					</button>
				</div>
			)}

			{/* Back navigation helper button when viewing a specific mobile page */}
			{pathname !== '/dashboard' && (
				<button
					onClick={() => router.push('/dashboard')}
					className="mb-4 text-sm text-gray-500 underline"
				>
					← Back to Dashboard Overview
				</button>
			)}

			{/* Displays analytics/page.tsx or team/page.tsx inside the native children slot */}
			<div className="mt-2">{children}</div>
		</div>
	);
}

interface MobileLayoutAdvancedProps {
	children: React.ReactNode;
	analytics: React.ReactNode;
	team: React.ReactNode;
}

/**
 * This renders dashboard/@.../page.tsx
 *
 * @param children
 * @param analytics
 * @param team
 */
export function MobileLayoutAdvanced({
	children,
	analytics,
	team,
}: MobileLayoutAdvancedProps) {
	const router = useRouter();
	const pathname = usePathname();
	const isMobile = useIsMobile();

	// 🆕 Prevent SSR/Hydration mismatches by waiting for the client mount
	const [api, setApi] = useState<CarouselApi>();

	// 🆕 Synchronize the Active URL with the active Carousel slide index
	useEffect(() => {
		if (!api || !isMobile) return;

		const pathToIndex: Record<string, number> = {
			'/dashboard': 0,
			'/dashboard/analytics': 1,
			'/dashboard/team': 2,
		};

		const targetIndex = pathToIndex[pathname] ?? 0;
		api.scrollTo(targetIndex); // Programmatically slide to target panel smoothly
	}, [pathname, api, isMobile]);

	// 🆕 Sync URL backward if user swipes the Carousel panels manually on screen
	useEffect(() => {
		if (!api || !isMobile) return;

		const indexToPath = [
			'/dashboard',
			'/dashboard/analytics',
			'/dashboard/team',
		];

		api.on('select', () => {
			const currentIndex = api.selectedScrollSnap();
			const targetPath = indexToPath[currentIndex];
			if (pathname !== targetPath) {
				router.push(targetPath); // Keeps browser history in sync with native swipe gesture
			}
		});
	}, [api, pathname, router, isMobile]);

	// 📱 MOBILE LAYOUT RENDERING (@*/page.tsx) WITH SHADCN CAROUSEL
	const isHome = pathname === '/dashboard';
	const isAnalytics = pathname === '/dashboard/analytics';
	const isTeam = pathname === '/dashboard/team';

	return (
		<div className="flex min-h-screen flex-col justify-between pb-16">
			{/* Top Navigation Bar Header */}
			<header className="border-secondary sticky top-0 z-50 flex items-center justify-between border-b p-4 shadow-sm">
				<h1 className="text-lg font-bold tracking-wide">
					{isAnalytics && 'Analytics View'}
					{isTeam && 'Team Roster'}
					{isHome && 'Dashboard Overview'}
				</h1>
			</header>

			{/* Swipeable Carousel Sliding Framework */}
			{/* 📱 Swipeable Carousel Sliding Framework with Independent Sub-Scrolling */}
			<main className="flex w-full flex-1 flex-col overflow-hidden">
				<Carousel
					setApi={setApi}
					opts={{ watchDrag: true, duration: 25 }}
					className="flex w-full flex-1 flex-col"
				>
					{/* 
			1. Fixed Height Base: Ensures the carousel content matches exactly the 
			   remaining space between your header and bottom nav.
		*/}
					<CarouselContent className="ml-0 h-[calc(100vh-8rem)] items-stretch">
						{/* Slide 0: Home Snap Panel */}
						<CarouselItem className="h-full w-full overflow-y-auto p-4">
							<div className="bg-secondary rounded-2xl border p-6 text-center shadow-sm">
								<p className="font-medium">Welcome back!</p>
								<p className="text-muted-foreground mt-1 text-xs">
									Swipe left/right or tap bottom tabs to navigate.
								</p>
							</div>
						</CarouselItem>

						{/* 
							Slide 1: Analytics Content
							2. Local Scroll Zones: overflow-y-auto + h-full captures vertical scroll 
								events inside this specific panel zone only.
						*/}
						<CarouselItem className="h-full w-full overflow-y-auto p-4">
							<div className="min-h-full w-full">{analytics || children}</div>
						</CarouselItem>

						{/* Slide 2: Team Content */}
						<CarouselItem className="h-full w-full overflow-y-auto p-4">
							<div className="min-h-full w-full">{team || children}</div>
						</CarouselItem>
					</CarouselContent>
				</Carousel>
			</main>

			{/* 💬 WHATSAPP-STYLE BOTTOM NAVIGATION BAR */}
			<nav className="border-secondary fixed right-0 bottom-0 left-0 z-50 grid h-16 grid-cols-3 border-t shadow-lg">
				<button
					onClick={() => router.push('/dashboard')}
					className={`relative flex flex-col items-center justify-center text-xs font-semibold ${
						isHome ? 'text-emerald-600' : 'text-gray-400'
					}`}
				>
					<span className="mb-0.5 text-xl">🏠</span>
					<span>Home</span>
					{isHome && (
						<div className="absolute bottom-0 h-1 w-8 rounded-t-full bg-emerald-600" />
					)}
				</button>

				<button
					onClick={() => router.push('/dashboard/analytics')}
					className={`relative flex flex-col items-center justify-center text-xs font-semibold ${
						isAnalytics ? 'text-emerald-600' : 'text-gray-400'
					}`}
				>
					<span className="mb-0.5 text-xl">📊</span>
					<span>Analytics</span>
					{isAnalytics && (
						<div className="absolute bottom-0 h-1 w-8 rounded-t-full bg-emerald-600" />
					)}
				</button>

				<button
					onClick={() => router.push('/dashboard/team')}
					className={`relative flex flex-col items-center justify-center text-xs font-semibold ${
						isTeam ? 'text-emerald-600' : 'text-gray-400'
					}`}
				>
					<span className="mb-0.5 text-xl">👥</span>
					<span>Team</span>
					{isTeam && (
						<div className="absolute bottom-0 h-1 w-8 rounded-t-full bg-emerald-600" />
					)}
				</button>
			</nav>
		</div>
	);
}
