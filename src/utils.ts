export const getAllItems = async <T>(i: number, items: Array<T>, endpoint: any): Promise<Array<T>> => {
    const data = await endpoint({limit: 50, offset: i * 50});
    const currentItems = data.body.items;
    items.push(...currentItems);
    if (currentItems.length === 0) {
        return items
    }
    return getAllItems(i + 1, items, endpoint)
}