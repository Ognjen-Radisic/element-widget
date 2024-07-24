export const baseArray = [...Array(300).keys()].map((i) => `Element ${i + 1}`);

export const filterMapper = {
	noFilter: 0,
	gt10: 10,
	gt100: 100,
	gt200: 200,
};

export const possibleFilters = {
	noFilter: "noFilter",
	gt10: "gt10",
	gt100: "gt100",
	gt200: "gt200",
};
