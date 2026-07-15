// app/dashboard/team/page.tsx

// export { default } from '../@team/page';

export default function MobileTeamPage() {
	return (
		<div className="rounded-2xl bg-green-600 p-6 text-white shadow">
			<h2 className="text-2xl font-bold">Team Roster</h2>
			<p className="mt-2 text-sm text-green-100">
				This lists your full operating roster optimized for mobile interactions.
			</p>
			<ul className="mt-4 space-y-2 rounded-lg bg-white/10 p-3 text-sm">
				<li>🟢 Admin User (Online)</li>
				<li>🟢 Dev Lead (Online)</li>
				<li>⚪ Manager (Offline)</li>
			</ul>
		</div>
	);
}
