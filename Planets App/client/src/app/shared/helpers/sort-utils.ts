export type SortState = 'ascending' | 'descending' | 'default';

export const mySort = <T>(
    array: T[],
    sortBy: (element: T) => unknown,
    state: SortState
) => {
    const newArray = [...array];
    newArray.sort((a, b) => {
        const a1 = sortBy(a);
        const a2 = sortBy(b);

        if (a1 === a2) return 0;

        const result = a1! < a2! ? -1 : 1;

        return state === 'ascending'
            ? result
            : state === 'descending'
            ? -result
            : 0;
    });
    return newArray;
};

function getSortValue(obj: any, path: string) {
    return path.split('.').reduce((o, key) => (o ? o[key] : undefined), obj);
}
export function filterAndSort<T>(
    items: T[],
    searchQuery: string | null,
    sortKey: string,
    sortState: SortState,
    filterKeys: (keyof T)[] = []
): T[] {
    const query = (searchQuery ?? '').trim().toLowerCase();

    let filtered = query
        ? items.filter((item) =>
              filterKeys.some((key) =>
                  String(item[key]).toLowerCase().includes(query)
              )
          )
        : items;

    if (sortState === 'ascending') {
        filtered = mySort(
            filtered,
            (i) => getSortValue(i, sortKey),
            'descending'
        );
    } else if (sortState === 'descending') {
        filtered = mySort(
            filtered,
            (i) => getSortValue(i, sortKey),
            'ascending'
        );
    }

    return filtered;
}
