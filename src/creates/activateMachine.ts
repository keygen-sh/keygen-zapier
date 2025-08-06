import { Bundle, ZObject } from 'zapier-platform-core'
import parseMetadata from '../helpers/parseMetadata'
import * as sample from '../samples/machine.json'

interface InputData {
  licenseId: string
  name: string
  fingerprint: string
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const metadata = parseMetadata(bundle.inputData.metadata)

  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/machines`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      data: {
        type: 'machines',
        attributes: {
          name: bundle.inputData.name ?? undefined,
          fingerprint: bundle.inputData.fingerprint ?? undefined,
          metadata,
        },
        relationships: {
          license: {
            data: { type: 'licenses', id: bundle.inputData.licenseId }
          },
        },
      },
    },
  })

  return res.json
}

export default {
  key: 'activateMachine',
  noun: 'Machine',
  display: {
    label: 'Activate Machine',
    description: 'Activates a new machine for a license using a known fingerprint.',
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'licenseId',
        label: 'License',
        helpText: `The license that the machine belongs to.`,
        dynamic: 'licenses.id.name',
      },
      {
        required: false,
        key: 'name',
        label: 'Name',
        helpText: `An optional name for the machine. This can be used to quickly identify machines.`,
        type: 'string',
      },
      {
        required: true,
        key: 'fingerprint',
        label: 'Fingerprint',
        helpText: `An known fingerprint for the machine. This should be a unique value.`,
        type: 'string',
      },
      {
        required: false,
        key: 'metadata',
        label: 'Metadata',
        helpText: `Metadata is useful for storing additional, structured information on a machine. As an example, you could store a customer's email address or operating system specs. Values are parsed as JSON, e.g. 1.3 is a float, true is a boolean, and foo is a string. Wrap in double quotes to force a string, e.g. "1".`,
        dict: true,
      },
    ],
    perform,
    sample,
  },
}
