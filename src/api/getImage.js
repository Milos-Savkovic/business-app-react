import fire from './firebaseApp';

export const getImage = (id) => {
    return fire.storage().ref(`images/${id}`).getDownloadURL()
}
