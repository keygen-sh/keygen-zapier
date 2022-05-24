import { version as platformVersion } from 'zapier-platform-core'
import authentication from './authentication'
import createLicense from './creates/createLicense'
import updateLicense from './creates/updateLicense'
import transferLicense from './creates/transferLicense'
import renewLicense from './creates/renewLicense'
import suspendLicense from './creates/suspendLicense'
import reinstateLicense from './creates/reinstateLicense'
import checkoutLicense from './creates/checkoutLicense'
import createToken from './creates/createToken'
import downloadRelease from './creates/downloadRelease'
import createUser from './creates/createUser'
import findLicense from './searches/findLicense'
import findRelease from './searches/findRelease'
import findUser from './searches/findUser'
import licenseCreated from './triggers/licenseCreated'
import licenseDeleted from './triggers/licenseDeleted'
import licenseExpired from './triggers/licenseExpired'
import licenseExpiring from './triggers/licenseExpiring'
import licenseRenewed from './triggers/licenseRenewed'
import machineActivated from './triggers/machineActivated'
import machineDeactivated from './triggers/machineDeactivated'
import releaseCreated from './triggers/releaseCreated'
import licenseList from './triggers/licenseList'
import policyList from './triggers/policyList'
import releaseList from './triggers/releaseList'
import userCreated from './triggers/userCreated'
import userList from './triggers/userList'
import resetPassword from './creates/resetPassword'
import newEvent from './triggers/newEvent'
import passwordReset from './triggers/passwordReset'
import { stashRelease } from './creates/downloadRelease'

export default {
  version: require('../package.json').version,
  platformVersion,
  authentication,
  hydrators: {
    stashRelease,
  },
  triggers: {
    [licenseCreated.key]: licenseCreated,
    [licenseDeleted.key]: licenseDeleted,
    [licenseExpired.key]: licenseExpired,
    [licenseExpiring.key]: licenseExpiring,
    [licenseRenewed.key]: licenseRenewed,
    [machineActivated.key]: machineActivated,
    [machineDeactivated.key]: machineDeactivated,
    [releaseCreated.key]: releaseCreated,
    [licenseList.key]: licenseList,
    [policyList.key]: policyList,
    [releaseList.key]: releaseList,
    [userCreated.key]: userCreated,
    [userList.key]: userList,
    [newEvent.key]: newEvent,
    [passwordReset.key]: passwordReset,
  },
  searches: {
    [findLicense.key]: findLicense,
    [findRelease.key]: findRelease,
    [findUser.key]: findUser,
  },
  creates: {
    [createLicense.key]: createLicense,
    [updateLicense.key]: updateLicense,
    [transferLicense.key]: transferLicense,
    [renewLicense.key]: renewLicense,
    [suspendLicense.key]: suspendLicense,
    [reinstateLicense.key]: reinstateLicense,
    [checkoutLicense.key]: checkoutLicense,
    [createToken.key]: createToken,
    [downloadRelease.key]: downloadRelease,
    [createUser.key]: createUser,
    [resetPassword.key]: resetPassword,
  },
}
