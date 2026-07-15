// app/dashboard/@team/page.tsx
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Input } from '@/components/ui/input';

export default function TeamCard() {
	const pathname = usePathname();
	const isActive = pathname === '/dashboard/team';

	const [teamInput, setTeamInput] = useState('');

	return (
		<div
			className={`'border-green-500 rounded-xl border bg-green-50 p-4 shadow-md transition-all ${
				isActive && 'border-gray-200 hover:border-green-300'
			}`}
		>
			<div className="flex items-center justify-between">
				<h2
					className={`text-lg font-semibold ${isActive ? 'text-green-600' : 'text-gray-700'}`}
				>
					Team Status
				</h2>
				{isActive && (
					<span className="rounded-full bg-green-600 px-2 py-0.5 text-xs font-medium text-white">
						Active Route
					</span>
				)}
			</div>
			<p
				className={`mt-2 text-sm ${isActive ? 'font-medium text-green-900' : 'text-gray-500'}`}
			>
				5 Members Online
			</p>
			<Input
				type="text"
				placeholder="Type state test..."
				value={teamInput}
				onChange={(e) => setTeamInput(e.target.value)}
				// onClick={(e) => e.stopPropagation()}
				className="mt-2 w-full rounded border p-1 text-sm text-black"
			/>{' '}
		</div>
	);
}
