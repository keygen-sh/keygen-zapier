import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/event.json'

async function performSubscribe(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    json: {
      data: {
        type: 'webhook-endpoints',
        attributes: {
          url: bundle.targetUrl,
          subscriptions: [
            '*'
          ],
        },
      },
    },
  })

  res.throwForStatus()

  return res.json.data
}

async function performUnsubscribe(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'DELETE',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-endpoints/${bundle.subscribeData!.id}`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return null
}

async function performList(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/webhook-events`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return res.json.data.map((data: unknown) => ({ data }))
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
    performSubscribe,
    performUnsubscribe,
    performList,
    perform,
    sample,
  },
}
