export const SEARCH_KEYWORD_CHANGED = "FACULTY_PROFILES_SEARCH_KEYWORD_CHANGED";

export function searchKeywordChanged(searchKeyword) {
    return {
        type: SEARCH_KEYWORD_CHANGED,
        searchKeyword,
    };
}