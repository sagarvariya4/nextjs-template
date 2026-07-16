// app/components/layouts/mobile.tsx

'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { NavMobileName } from '@/lib/nav/types';
import { titleCase } from '@/lib/utils';
import { useNavMobileName } from '@/hooks/url-params/use-nav-mobile-name';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from '@/components/ui/carousel';
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox';

function SelectMobileNavName() {
	const { listNavMobileNameName, navMobileNameName, setNavMobileName } =
		useNavMobileName();

	return (
		<Combobox
			items={listNavMobileNameName}
			value={titleCase(navMobileNameName)}
			onValueChange={(value) =>
				value && setNavMobileName(value.toLowerCase() as NavMobileName)
			}
		>
			<ComboboxInput placeholder="Select a view" />
			<ComboboxContent>
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(item) => (
						<ComboboxItem
							key={item}
							value={titleCase(item)}
						>
							{titleCase(item)}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}

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
	const searchParams = useSearchParams();

	const navigation = useMemo(
		() => [
			{
				header: 'Analytics View',
				title: 'Analytics',
				icon: '📊',
				path: '/dashboard/analytics',
			},
			{
				header: 'Team Roster',
				title: 'Team',
				icon: '👥',
				path: '/dashboard/team',
			},
		],
		[],
	);

	const navigate = useCallback(
		(path: string) => {
			router.push(`${path}?${searchParams.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<div className="min-h-screen">
			{/* Top Navigation Bar Header */}
			<header className="border-secondary sticky top-0 z-50 flex items-center justify-between border-b p-4 shadow-sm">
				<h1 className="text-lg font-bold tracking-wide">Mobile Dashboard</h1>
				<SelectMobileNavName />
			</header>

			{/* Render base menu options if exactly at /dashboard */}
			{pathname === '/dashboard' && (
				<div className="flex flex-col gap-3 p-4">
					{navigation.map(({ title, icon, path }, index) => {
						return (
							<Button
								key={path + '-' + index}
								variant="secondary"
								onClick={() => navigate(path)}
								className="flex h-auto w-full justify-start rounded-xl border p-4 text-left font-medium shadow-sm"
							>
								{icon}
								<span className="ml-2">Go to {title} Page</span>
							</Button>
						);
					})}
				</div>
			)}

			{/* Back navigation helper button when viewing a specific mobile page */}
			{pathname !== '/dashboard' && (
				<button
					onClick={() => navigate('/dashboard')}
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
	const searchParams = useSearchParams();

	const [api, setApi] = useState<CarouselApi>();

	const navigation = useMemo(
		() => [
			{
				header: 'Dashboard Overview',
				title: 'Home',
				icon: '🏠',
				path: '/dashboard',
				page: children,
			},
			{
				header: 'Analytics View',
				title: 'Analytics',
				icon: '📊',
				path: '/dashboard/analytics',
				page: analytics || children,
			},
			{
				header: 'Team Roster',
				title: 'Team',
				icon: '👥',
				path: '/dashboard/team',
				page: team || children,
			},
		],
		[analytics, children, team],
	);

	const navigate = useCallback(
		(path: string) => {
			router.push(`${path}?${searchParams.toString()}`);
		},
		[router, searchParams],
	);

	// 🆕 Synchronize the Active URL with the active Carousel slide index
	useEffect(() => {
		if (!api || !isMobile) return;

		const targetIndex = navigation.findIndex(({ path }) => path === pathname);
		if (targetIndex === -1) return;

		const currentIndex = api.selectedScrollSnap();

		if (currentIndex !== targetIndex) {
			api.scrollTo(targetIndex); // Programmatically slide to target panel smoothly
		}
	}, [pathname, api, isMobile, navigation]);

	// 🆕 Sync URL backward if user swipes the Carousel panels manually on screen
	useEffect(() => {
		if (!api || !isMobile) return;

		const onSelect = () => {
			const currentIndex = api.selectedScrollSnap();
			if (currentIndex > navigation.length) return;

			const targetPath = navigation[currentIndex].path;

			if (pathname !== targetPath) {
				navigate(targetPath); // Keeps browser history in sync with native swipe gesture
			}
		};

		api.on('select', onSelect);

		return () => {
			api.off('select', onSelect);
		};
	}, [api, isMobile, navigate, navigation, pathname, router]);

	return (
		<div className="flex min-h-screen flex-col justify-between pb-16">
			{/* Top Navigation Bar Header */}
			<header className="border-secondary sticky top-0 z-50 flex items-center justify-between border-b p-4 shadow-sm">
				<h1 className="text-lg font-bold tracking-wide">
					{navigation.find(({ path }) => pathname === path)?.header}
				</h1>
				<SelectMobileNavName />
			</header>

			{/* 📱 Swipeable Carousel Sliding Framework with Independent Sub-Scrolling */}
			<main className="flex w-full flex-1 flex-col overflow-hidden">
				<Carousel
					setApi={setApi}
					opts={{ watchDrag: true, duration: 25 }}
					className="flex w-full flex-1 flex-col"
				>
					{/* Ensures the carousel content matches exactly the remaining space between your header and bottom nav. */}
					<CarouselContent className="ml-0 h-[calc(100vh-8rem)] items-stretch">
						{navigation.map(({ title, page }, index) => {
							return (
								<CarouselItem
									key={title + '-' + index}
									className="h-full w-full overflow-y-auto p-4"
								>
									<div className="min-h-full w-full">{page}</div>
								</CarouselItem>
							);
						})}
					</CarouselContent>
				</Carousel>
			</main>

			{/* BOTTOM NAVIGATION BAR */}
			<nav className="border-secondary fixed right-0 bottom-0 left-0 z-50 grid h-16 grid-cols-3 border-t shadow-lg">
				{navigation.map(({ title, icon, path }, index) => {
					const isActive = pathname === path;

					return (
						<Button
							key={path + '-' + index}
							variant={'ghost'}
							onClick={() => {
								if (isActive) return;
								navigate(path);
							}}
							className={`relative flex h-full w-full flex-col items-center justify-center rounded-none px-0 py-0 text-xs font-semibold ${
								isActive ? 'text-emerald-600' : 'text-gray-400'
							}`}
						>
							<span className="mb-0.5 text-xl">{icon}</span>
							<span>{title}</span>

							{isActive && (
								<div className="absolute bottom-0 h-1 w-8 rounded-t-full bg-emerald-600" />
							)}
						</Button>
					);
				})}
			</nav>
		</div>
	);
}
