import { fireDB } from './firebaseApp';

let team;
const ourTeamPlus = [
    {
        Id: 0,
    }
];

const fetchUsers = () => {
   return fireDB.ref('/users').once('value')
        .then((snapshot) => {
            team = [
                ...snapshot.val(),
                ourTeamPlus[0],
            ];
            return team;
        })
        .catch(error => {
            console.log("Error in fatching users from database.");
        })
}

export default fetchUsers;