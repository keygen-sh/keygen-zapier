import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/user.json'

interface InputData {
  firstName: string
  lastName: string
  email: string
  metadata: object
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/users`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    json: {
      data: {
        type: 'users',
        attributes: {
          firstName: bundle.inputData.firstName ?? undefined,
          lastName: bundle.inputData.lastName ?? undefined,
          email: bundle.inputData.email,
          metadata: bundle.inputData.metadata,
        },
      },
    },
  })

  res.throwForStatus()

  return res.json
}

export default {
  key: 'createUser',
  noun: 'User',
  display: {
    label: 'Create User',
    description: 'Creates a new user.',
  },
  operation: {
    inputFields: [
      {
        required: false,
        key: 'firstName',
        label: 'First Name',
        helpText: `An optional first name for the user.`,
        type: 'string',
      },
      {
        required: false,
        key: 'lastName',
        label: 'Last Name',
        helpText: `An optional last name for the user.`,
        type: 'string',
      },
      {
        required: true,
        key: 'email',
        label: 'Email',
        helpText: `The user's email address.`,
        type: 'string',
      },
      {
        required: false,
        key: 'metadata',
        label: 'Metadata',
        helpText: `Metadata is useful for storing additional, structured information on a user. As an example, you could store a Stripe customer ID or whether they accepted your TOS.`,
        dict: true,
      },
    ],
    perform,
    sample,
  },
}
