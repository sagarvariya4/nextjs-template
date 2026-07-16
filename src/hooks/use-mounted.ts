import { useSyncExternalStore } from 'react';

// 🆕 Prevent SSR/Hydration mismatches by waiting for the client mount
export function useIsMounted() {
	return useSyncExternalStore(
		() => () => {}, // No-op subscribe
		() => true, // Client value
		() => false, // Server/Hydration value
	);
}
