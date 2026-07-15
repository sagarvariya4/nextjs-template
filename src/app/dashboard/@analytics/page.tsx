// app/dashboard/@analytics/page.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Input } from '@/components/ui/input';

export default function AnalyticsCard() {
	const pathname = usePathname();
	const isActive = pathname === '/dashboard/analytics';

	const [analyticsInput, setAnalyticsInput] = useState('');

	return (
		<div
			className={`rounded-xl border border-blue-500 bg-blue-50 p-4 shadow-md transition-all ${
				isActive && 'border-gray-200 hover:border-blue-300'
			}`}
		>
			<div className="flex items-center justify-between">
				<h2
					className={`text-lg font-semibold ${isActive ? 'text-blue-600' : 'text-gray-700'}`}
				>
					Analytics Data
				</h2>
				{isActive && (
					<span className="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
						Active Route
					</span>
				)}
			</div>
			<p
				className={`mt-2 text-sm ${isActive ? 'font-medium text-blue-900' : 'text-gray-500'}`}
			>
				Active Users: 1,240
			</p>

			<Input
				type="text"
				placeholder="Type state test..."
				value={analyticsInput}
				onChange={(e) => setAnalyticsInput(e.target.value)}
				// onClick={(e) => e.stopPropagation()}
				className="mt-2 w-full rounded border p-1 text-sm text-black"
			/>
		</div>
	);
}
