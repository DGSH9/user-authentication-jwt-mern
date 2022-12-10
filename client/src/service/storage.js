const getCurrentToken = () => {
    localStorage.getItem('token');
}

const deleteCurrentToken = () => {
    localStorage.removeItem('token');
}




const StorageService = {
    getCurrentToken,
    deleteCurrentToken
}
module.export = StorageService;

