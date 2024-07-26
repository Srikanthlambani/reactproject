import { CognitoUserPool , CookieStorage} from "amazon-cognito-identity-js";
import { UserPoolId , ClientId} from '../../protected'
const poolData = {
     UserPoolId : UserPoolId,
     ClientId : ClientId,
     Storage: new CookieStorage(({ domain: 'localhost', secure: 'false' }))
}
export default new CognitoUserPool(poolData);