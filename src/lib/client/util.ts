import React from "react";

// Example:
// const [name, setName] = React.useState("");
// <input {...bind(name, setName)} />
export const bind = <T>(get: T, set: (value: T) => void = () => { }, parse: (event: React.ChangeEvent<HTMLInputElement>) => T = x => x.target.value as T) => ({
	value: get,
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => set(parse(e))
});

// Example:
// const [user, setUser] = React.useState({ name: "" });
// <input {...bindField(user, setUser, "name")} />
export const bindField = <T extends Record<string, unknown>, K extends keyof T>(get: T, set: (value: T) => void = () => { }, field: K, parse: (event: React.ChangeEvent<HTMLInputElement>) => T[K] = x => x.target.value as T[K]) => ({
	value: get[field],
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => set({ ...get, [field]: parse(e) })
});

// Example:
// const [checked, setChecked] = React.useState(false);
// <input {...bindCheckbox(checked, setChecked)} />
export const bindCheckbox = (get: boolean, set: (value: boolean) => void = () => { }) => bind<boolean>(get, set, e => e.target.checked);

// Example:
// const [user, setUser] = React.useState({ name: "peter", admin: false });
// <input {...bindCheckboxField(user, setUser, "admin")} />
export const bindCheckboxField = <T extends Record<string, unknown>, K extends keyof T>(get: T, set: (value: T) => void = () => { }, field: K) => bindField<T, K>(get, set, field, e => e.target.checked as T[K]);

// Example:
// const [quicklyChangingState, setQuicklyChangingState] = React.useState(0);
// const slowlyChangingState = useDebounce(quicklyChangingState);
export const useDebounce = <T>(value: T, delay: number = 500) => {
	const [debouncedValue, setDebouncedValue] = React.useState(value);

	React.useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);

		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
};
