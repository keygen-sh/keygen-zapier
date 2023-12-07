import { Bundle, ZObject } from 'zapier-platform-core'
import parseMetadata from '../helpers/parseMetadata'
import * as sample from '../samples/license.json'

interface InputData {
  policyId: string
  userId: string
  name: string
  key: string
  expiry: Date
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const metadata = parseMetadata(bundle.inputData.metadata)
  const user = bundle.inputData.userId
    ? { data: { type: 'users', id: bundle.inputData.userId } }
    : null

  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      data: {
        type: 'licenses',
        attributes: {
          name: bundle.inputData.name ?? undefined,
          key: bundle.inputData.key ?? undefined,
          expiry: bundle.inputData.expiry ? bundle.inputData.expiry : undefined,
          metadata,
        },
        relationships: {
          policy: {
            data: { type: 'policies', id: bundle.inputData.policyId }
          },
          user,
        },
      },
    },
  })

  return res.json
}

export default {
  key: 'createLicense',
  noun: 'License',
  display: {
    important: true,
    label: 'Create License',
    description: 'Creates a new license according to a policy.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'policyId',
        label: 'Policy',
        helpText: `The policy that the license will implement. Policies define license behavior.`,
        dynamic: 'policies.id.name',
      },
      {
        required: false,
        key: 'userId',
        label: 'User',
        helpText: `The user that the license will belong to. This is optional.`,
        dynamic: 'users.id.name',
      },
      {
        required: false,
        key: 'name',
        label: 'Name',
        helpText: `An optional name for the license. This can be used to quickly identify licenses.`,
        type: 'string',
      },
      {
        required: false,
        key: 'key',
        label: 'License Key',
        helpText: `An optional custom key for the license. When blank, this will be automatically generated according to the Policy.`,
        type: 'string',
      },
      {
        required: false,
        key: 'expiry',
        label: 'Expiration Date',
        helpText: `An optional expiry for the license. When blank, this will be automatically set according to the Policy.`,
        type: 'datetime',
      },
      {
        required: false,
        key: 'metadata',
        label: 'Metadata',
        helpText: `Metadata is useful for storing additional, structured information on a license. As an example, you could store a customer's email address or a Stripe customer ID. Values are parsed as JSON, e.g. 1.3 is a float, true is a boolean, and foo is a string. Wrap in double quotes to force a string, e.g. "1".`,
        dict: true,
      },
    ],
    perform,
    sample,
  },
}
