import { CognitoUserPool } from "amazon-cognito-identity-js";
import { UserPoolId , ClientId} from '../../protected'
const poolData = {
     UserPoolId : UserPoolId,
     ClientId : ClientId
}
export default new CognitoUserPool(poolData);