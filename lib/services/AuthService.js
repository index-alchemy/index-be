import request from 'superagent';
import User from '../models/User.js';
import { parseTeamNameForCohort } from '../utils/parseCohorts.js';

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env;
const LOUD = process.env.LOUD === 'true';

const ORG = {
  login: 'alchemycodelab',
  id: 25064361,
  url: 'https://api.github.com/orgs/alchemycodelab',
  avatar_url: 'https://avatars.githubusercontent.com/u/25064361?v=4',
  description: 'Projects and resources for Alchemy Code Lab'
};
const ORG_STUDENTS = {
  name: 'students',
  id: 5077862,
  slug: 'students',
  description: 'Current Alchemy Students',
  privacy: 'closed',
  url: 'https://api.github.com/organizations/25064361/team/5077862',
  parent: null
};
const ORG_STAFF = [
  {
    name: 'Staff',
    id: 5077871,
    slug: 'staff',
    description: 'All Staff',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/5077871',
    parent: null
  },
  {
    name: 'instructors',
    id: 2233104,
    slug: 'instructors',
    description: 'Alchemy Code Lab instructors',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/2233104',
    parent: null
  },
  {
    name: 'tas-january-2021',
    id: 4343895,
    slug: 'tas-january-2021',
    description: '',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/4343895',
    parent: null
  },
  {
    name: 'april-2021-tas',
    id: 4755859,
    slug: 'april-2021-tas',
    description: '',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/4755859',
    parent: null
  },
  {
    name: 'june-2021-tas',
    id: 4919625,
    slug: 'june-2021-tas',
    description: 'June 2021 TAs',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/4919625',
    parent: null
  },
  {
    name: 'august-2021-tas',
    id: 5022789,
    slug: 'august-2021-tas',
    description: 'August 2021 cohort TAs',
    privacy: 'closed',
    url: 'https://api.github.com/organizations/25064361/team/5022789',
    parent: null
  }
];

const githubAPIRequest = async (url, token) => (await request
  .get(url)
  .set('Authorization', `token ${token}`)
  .set('Accept', 'application/vnd.github.v3+json')
  .set('user-agent', 'node.js')
  .catch(err => console.log(err))
).body;

export default class AuthService {

  static async githubAuth(query) {
    try {
      // get the access_token
      const { access_token: accessToken } = (await request
        .post('https://github.com/login/oauth/access_token')
        .set('Accept', 'application/vnd.github.v3+json')
        .send({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: query.code
        })
      )?.body;

      const API = 'https://api.github.com';

      // get the user info
      const user = await githubAPIRequest(`${API}/user`, accessToken);
      if (LOUD) console.log('Accessing github user:', user);

      // check if user already in database
      const match = await User.findBy(user.id);
      if (LOUD) console.log('User in database:', match);
      if (match) return match;
      else {
        // get org membership
        const membership = await githubAPIRequest(
          `${API}/orgs/${ORG.login}/memberships/${user.login}`,
          accessToken
        );
        
        if (!membership?.state === 'active') 
          throw new Error('User is not a member of Alchemy Code Lab.')
        ;

        // get user teams
        const teams = (await githubAPIRequest(
          `${API}/user/teams`, accessToken
        )).filter(team => team.organization.login === ORG.login);
        if (LOUD) console.log('User\'s teams:', teams);

        // if user is staff, set cohort to null, otherwise parse cohort
        const staffTeams = ORG_STAFF.map(t => t.id);
        const newUser = {
          id: user.id,
          cohort: null,
          username: user.login,
          bio: user.bio,
          avatar: user.avatar_url,
          github: user.html_url
        };
        for (const team of teams) {
          if (staffTeams.includes(team.id)) return await User.create({
            ...newUser,
            cohort: null
          }); 
          else if (team?.parent?.id === ORG_STUDENTS.id) {
            newUser.cohort = parseTeamNameForCohort(team.name);
          }
        }

        if (LOUD) console.log('Creating new user:', newUser);

        return await User.create(newUser);
      }

    } catch (err) {
      //console.error(err);
      throw new Error(err);
    }
  }
}
