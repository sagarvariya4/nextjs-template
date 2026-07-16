import {
	Options,
	parseAsBoolean,
	parseAsJson,
	parseAsString,
	useQueryState,
} from 'nuqs';
import { z } from 'zod';

export const URL_PARAM_KEYS = {
	DIALOG: {
		NAME: 'dpn',
	},
	FILTER: {
		TABLE: 'ftbl',
	},
	NAV: {
		MOBILE: 'nmbl',
	},
};

export function useBooleanQueryState(
	key: string,
	val: boolean,
	options: Options = {},
) {
	const [value, setValue] = useQueryState(
		key,
		parseAsBoolean.withDefault(val).withOptions(options),
	);

	const reset = () => setValue(val);
	const toggle = () => setValue((v) => !v);

	return {
		value,
		setValue,
		reset,
		toggle,
	};
}

export function useStringQueryState<T extends string>(
	key: string,
	val: T,
	options: Options = {},
) {
	const [value, setValue] = useQueryState(
		key,
		parseAsString.withDefault(val).withOptions(options),
	);

	const reset = () => setValue(val);
	const clear = () => setValue(null);

	return {
		value: value as T,
		setValue: setValue as (
			value: T | ((old: T) => T | null) | null,
			options?: Options | undefined,
		) => Promise<URLSearchParams>,
		reset,
		clear,
	};
}

type ObjectQueryValue<T extends Record<string, unknown>> = Partial<T> | null;

export function useObjectQueryState<
	TSchema extends z.ZodTypeAny,
	TValue extends NonNullable<z.output<TSchema>>,
>(key: string, schema: TSchema, val: TValue, options: Options = {}) {
	const [value, setValue] = useQueryState(
		key,

		parseAsJson((value) => {
			const { success, data } = schema.safeParse({
				...val,
				...(value ?? {}),
			});

			return success ? data : null;
		})
			.withDefault(val)
			.withOptions(options),
	);

	const reset = () => setValue(val);
	const clear = () => setValue(null);

	const setObjectValue = (
		value: ObjectQueryValue<TValue>,
		options?: Options,
	) => {
		return setValue(value as TValue | null, options);
	};

	return {
		value,
		setValue: setObjectValue,
		reset,
		clear,
	};
}
export function compactObject<T extends Record<string, unknown>>(
	value: T,
	defaults: T,
): Partial<T> | null {
	const result: Partial<T> = {};

	for (const key of Object.keys(value) as (keyof T)[]) {
		const current = value[key];
		const defaultValue = defaults[key];

		// Deep-compact plain objects
		if (isPlainObject(current) && isPlainObject(defaultValue)) {
			const nested = compactObject(
				current as Record<string, unknown>,
				defaultValue as Record<string, unknown>,
			);

			if (nested) {
				result[key] = nested as T[keyof T];
			}

			continue;
		}

		// Primitive / array / date / etc.
		if (!Object.is(current, defaultValue)) {
			result[key] = current;
		}
	}

	return Object.keys(result).length ? result : null;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value);
}
