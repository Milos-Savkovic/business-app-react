import { fireDB } from './firebaseApp';

const fetchUsers = () => {
    return fireDB.ref('/users');
}

export default fetchUsers;