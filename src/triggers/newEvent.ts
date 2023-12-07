import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/event.json'

interface InputData {
  types: string[]
}

async function performSubscribe(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      data: {
        type: 'webhook-endpoints',
        attributes: {
          url: bundle.targetUrl,
          subscriptions: [
            ...bundle.inputData.types,
          ],
        },
      },
    },
  })

  return res.json.data
}

async function performUnsubscribe(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'DELETE',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints/${bundle.subscribeData!.id}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return null
}

async function performList(z: ZObject, bundle: Bundle<InputData>) {
  const query = bundle.inputData.types.map(e => `events[]=${e}`).join('&')

  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-events?${query}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return res.json.data.map((data: any) => {
    data.attributes.payload = z.JSON.parse(data.attributes.payload)

    return { data }
  })
}

async function perform(z: ZObject, bundle: Bundle) {
  return [bundle.cleanedRequest]
}

export default {
  key: 'newEvent',
  noun: 'Event',
  display: {
    label: 'New Event',
    description: 'Triggers when a new event like a license validation, an activation, or an expiration occurs.',
  },
  operation: {
    type: 'hook',
    inputFields: [
      {
        required: true,
        key: 'types',
        label: 'Event Types',
        list: true,
        choices: {
          '*': 'All events',
          'license.created': 'License created',
          'license.updated': 'License updated',
          'license.deleted': 'License deleted',
          'license.expiring-soon': 'License expiring soon',
          'license.expired': 'License expired',
          'license.checked-in': 'License checked in',
          'license.check-in-required-soon': 'License check-in required soon',
          'license.check-in-overdue': 'License check-in overdue',
          'license.validation.succeeded': 'License validation succeeded',
          'license.validation.failed': 'License validation failed',
          'license.usage.incremented': 'License usage incremented',
          'license.usage.decremented': 'License usage decremented',
          'license.usage.reset': 'License usage reset',
          'license.renewed': 'License renewed',
          'license.revoked': 'License revoked',
          'license.suspended': 'License suspended',
          'license.reinstated': 'License reinstanted',
          'license.policy.updated': 'License policy changed',
          'license.user.updated': 'License user changed',
          'user.created': 'User created',
          'user.updated': 'User updated',
          'user.deleted': 'User deleted',
          'user.password-reset': 'User password reset requested',
          'machine.created': 'Machine created',
          'machine.updated': 'Machine updated',
          'machine.deleted': 'Machine deleted',
          'machine.heartbeat.ping': 'Machine heartbeat ping',
          'machine.heartbeat.dead': 'Machine heartbeat dead',
          'machine.heartbeat.resurrected': 'Machine heartbeat resurrected',
          'machine.heartbeat.reset': 'Machine heartbeat reset',
          'release.created': 'Release created',
          'release.updated': 'Release updated',
          'release.replaced': 'Release replaced',
          'release.deleted': 'Release deleted',
          'release.downloaded': 'Release downloaded',
          'release.upgraded': 'Release upgraded',
          'release.uploaded': 'Release uploaded',
          'release.yanked': 'Release yanked',
        },
      },
    ],
    performSubscribe,
    performUnsubscribe,
    performList,
    perform,
    sample,
  },
}
