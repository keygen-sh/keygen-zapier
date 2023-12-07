import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/entitlements.json'

interface InputData {
  licenseId: string
}

interface Entitlement {
  type: string
  id: string
  attributes: {
    name: string
    code: string
  }
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  if (!bundle.inputData.licenseId) {
    return [];
  }

  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${encodeURIComponent(bundle.inputData.licenseId)}/entitlements`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
      'keygen-version': '1.4',
    },
  })

  return [{ entitlements: res.json.data.map((e: Entitlement) => e.attributes.code) }]
}

export default {
  key: 'entitlements',
  noun: 'Entitlement',
  display: {
    label: 'List Entitlements',
    description: `Lists a license's entitlements by license key or license ID.`,
    directions: 'Returns an array of entitlement codes.'
  },
  operation: {
    inputFields: [
      {
        required: false,
        key: 'licenseId',
        label: 'License',
        dynamic: 'licenses.id.name',
      },
    ],
    perform,
    sample,
  },
}
