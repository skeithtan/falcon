export const SEARCH_KEYWORD_CHANGED = "FACULTY_PROFILES_SEARCH_KEYWORD_CHANGED";

export const searchKeywordChanged = searchKeyword => ({
    type: SEARCH_KEYWORD_CHANGED,
    searchKeyword,
});