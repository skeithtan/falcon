export const PAGE_IS_CHANGED = "PAGE_IS_CHANGED";

export function pageIsChanged(page) {
    return {
        type: PAGE_IS_CHANGED,
        page,
    };
}