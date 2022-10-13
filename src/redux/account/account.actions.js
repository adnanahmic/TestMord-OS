import AccountActionTypes from './account.types';

export const loadAccount = (activeUser) => ({
    type: AccountActionTypes.LOAD_ACCOUNT,
    payload: activeUser,
});

export const saveAccount = (activeUser) => ({
    type: AccountActionTypes.SAVE_ACCOUNT,
    payload: activeUser,
});

export const getAccountSettings = () => ({
    type: AccountActionTypes.GET_ACCOUNT_SETTINGS,
});

export const getAccountFileSystem = () => ({
    type: AccountActionTypes.GET_FILESYSTEM,
});

export const createNewDirectoryItem = (item) => ({
    type: AccountActionTypes.CREATE_NEW_DIR_ITEM,
    payload: item,
});

export const renameDirectoryItems = (ids, newName) => ({
    type: AccountActionTypes.RENAME_DIR_ITEM,
    payload: { items: ids, newName },
});

export const unlinkDirectoryItems = (path, ids) => ({
    type: AccountActionTypes.DELETE_DIR_ITEM,
    payload: { ids, path },
});

export const copyDirectoryItems = (toPath, itemIds) => ({
    type: AccountActionTypes.COPY_DIR_ITEM,
    payload: { toPath, ids: itemIds },
});

export const moveDirectoryItems = (toPath, itemIds) => ({
    type: AccountActionTypes.MOVE_DIR_ITEM,
    payload: { toPath, ids: itemIds },
});

export const sortItems = (parentId, sortBy) => ({
    type: AccountActionTypes.SORT_DIR_ITEM,
    payload: { parentId, sortBy },
});
