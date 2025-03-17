import { Bundle, ZObject } from 'zapier-platform-core'
import parseMetadata from '../helpers/parseMetadata'
import * as sample from '../samples/license.json'

interface InputData {
  id: string
  name: string
  expiry: Date
  maxMachines: number
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const metadata = parseMetadata(bundle.inputData.metadata)

  const res = await z.request({
    method: 'PATCH',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/licenses/${encodeURIComponent(bundle.inputData.id)}`,
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
          expiry: bundle.inputData.expiry ? bundle.inputData.expiry : undefined,
          maxMachines: bundle.inputData.maxMachines ? bundle.inputData.maxMachines : undefined,
          metadata,
        },
      },
    },
  })

  return res.json
}

export default {
  key: 'updateLicense',
  noun: 'License',
  display: {
    label: 'Update License',
    description: 'Updates a license.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'id',
        label: 'License',
        dynamic: 'licenses.id.name',
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
        key: 'expiry',
        label: 'Expiration Date',
        helpText: `An optional expiry for the license. When blank, this will be unchanged.`,
        type: 'datetime',
      },
      {
        required: false,
        key: 'maxMachines',
        label: 'Machine Limit',
        helpText: `An optional machine limit for the license. When blank, this will be unchanged.`,
        type: 'integer',
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
