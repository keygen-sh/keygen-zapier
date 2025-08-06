import { version as platformVersion } from 'zapier-platform-core'
import authentication from './authentication'
import createLicense from './creates/createLicense'
import updateLicense from './creates/updateLicense'
import transferLicense from './creates/transferLicense'
import renewLicense from './creates/renewLicense'
import suspendLicense from './creates/suspendLicense'
import reinstateLicense from './creates/reinstateLicense'
import resetLicense from './creates/resetLicense'
import checkoutLicense from './creates/checkoutLicense'
import activateMachine from './creates/activateMachine'
import updateMachine from './creates/updateMachine'
import checkoutMachine from './creates/checkoutMachine'
import createToken from './creates/createToken'
import downloadArtifact from './creates/downloadArtifact'
import createUser from './creates/createUser'
import updateUser from './creates/updateUser'
import findLicense from './searches/findLicense'
import findRelease from './searches/findRelease'
import findArtifact from './searches/findArtifact'
import findUser from './searches/findUser'
import findMachine from './searches/findMachine'
import listEntitlements from './searches/listEntitlements'
import licenseCreated from './triggers/licenseCreated'
import licenseDeleted from './triggers/licenseDeleted'
import licenseExpired from './triggers/licenseExpired'
import licenseExpiring from './triggers/licenseExpiring'
import licenseRenewed from './triggers/licenseRenewed'
import licenseUsed from './triggers/licenseUsed'
import machineActivated from './triggers/machineActivated'
import machineDeactivated from './triggers/machineDeactivated'
import releaseCreated from './triggers/releaseCreated'
import releasePublished from './triggers/releasePublished'
import licenseList from './triggers/licenseList'
import machineList from './triggers/machineList'
import policyList from './triggers/policyList'
import releaseList from './triggers/releaseList'
import artifactList from './triggers/artifactList'
import userCreated from './triggers/userCreated'
import userList from './triggers/userList'
import resetPassword from './creates/resetPassword'
import newEvent from './triggers/newEvent'
import passwordReset from './triggers/passwordReset'

export default {
  version: require('../package.json').version,
  platformVersion,
  authentication,
  triggers: {
    [licenseCreated.key]: licenseCreated,
    [licenseDeleted.key]: licenseDeleted,
    [licenseExpired.key]: licenseExpired,
    [licenseExpiring.key]: licenseExpiring,
    [licenseRenewed.key]: licenseRenewed,
    [licenseUsed.key]: licenseUsed,
    [machineActivated.key]: machineActivated,
    [machineDeactivated.key]: machineDeactivated,
    [releaseCreated.key]: releaseCreated,
    [releasePublished.key]: releasePublished,
    [licenseList.key]: licenseList,
    [machineList.key]: machineList,
    [policyList.key]: policyList,
    [releaseList.key]: releaseList,
    [artifactList.key]: artifactList,
    [userCreated.key]: userCreated,
    [userList.key]: userList,
    [newEvent.key]: newEvent,
    [passwordReset.key]: passwordReset,
  },
  searches: {
    [findLicense.key]: findLicense,
    [findMachine.key]: findMachine,
    [findRelease.key]: findRelease,
    [findArtifact.key]: findArtifact,
    [findUser.key]: findUser,
    [listEntitlements.key]: listEntitlements,
  },
  creates: {
    [createLicense.key]: createLicense,
    [updateLicense.key]: updateLicense,
    [transferLicense.key]: transferLicense,
    [renewLicense.key]: renewLicense,
    [suspendLicense.key]: suspendLicense,
    [reinstateLicense.key]: reinstateLicense,
    [resetLicense.key]: resetLicense,
    [checkoutLicense.key]: checkoutLicense,
    [checkoutMachine.key]: checkoutMachine,
    [activateMachine.key]: activateMachine,
    [updateMachine.key]: updateMachine,
    [createToken.key]: createToken,
    [downloadArtifact.key]: downloadArtifact,
    [createUser.key]: createUser,
    [updateUser.key]: updateUser,
    [resetPassword.key]: resetPassword,
  },
}
