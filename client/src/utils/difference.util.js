export function getDifference(newItems, oldItems) {
    const removedItems = oldItems.filter(oldItem =>
        // If an oldItem is not in newItems array, it is removed
        !newItems.includes(oldItem),
    );

    const addedItems = newItems.filter(newItem =>
        // If a newItem is not in oldItems array, it is added
        !oldItems.includes(newItem),
    );

    return {addedItems, removedItems};
}