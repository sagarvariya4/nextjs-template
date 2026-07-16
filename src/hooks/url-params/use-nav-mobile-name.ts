'use client';

import { useEffect, useMemo } from 'react';

import { NAV_MOBILE_NAMES, NavMobileName } from '@/lib/nav/types';

import { URL_PARAM_KEYS, useStringQueryState } from '.';

const DEFAULT_VAL: NavMobileName = 'advanced';

export function useNavMobileName() {
	const { value, setValue, clear, reset } = useStringQueryState<NavMobileName>(
		URL_PARAM_KEYS.NAV.MOBILE,
		DEFAULT_VAL,
	);

	const isValid = useMemo(() => NAV_MOBILE_NAMES.includes(value), [value]);

	useEffect(() => {
		if (value && !isValid) {
			reset();
		}
	}, [value, reset, isValid]);

	return {
		navMobileNameName: isValid ? value : DEFAULT_VAL,
		listNavMobileNameName: NAV_MOBILE_NAMES,
		setNavMobileName: setValue,
		clearNavMobileName: clear,
	};
}
