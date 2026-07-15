import { useSyncExternalStore } from 'react';

export function useIsMounted() {
	return useSyncExternalStore(
		() => () => {}, // No-op subscribe
		() => true, // Client value
		() => false, // Server/Hydration value
	);
}
