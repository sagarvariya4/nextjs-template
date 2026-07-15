// app/dashboard/analytics/page.tsx

// export { default } from '../@analytics/page';

export default function MobileAnalyticsPage() {
	return (
		<div className="rounded-2xl bg-blue-600 p-6 text-white shadow">
			<h2 className="text-2xl font-bold">Analytics Context</h2>
			<p className="mt-2 text-sm text-blue-100">
				This is a full screen view built exclusively for mobile screen
				viewports.
			</p>
			<div className="mt-6 rounded-lg bg-white/10 p-4">
				<p className="text-xs text-blue-200">Active Users Stream</p>
				<p className="mt-1 font-mono text-3xl font-bold">1,240</p>
			</div>
		</div>
	);
}
