import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/user.json'

interface InputData {
  email: string
}

async function perform(z: ZObject, bundle: Bundle<InputData>) {
  const res = await z.request({
    method: 'POST',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/passwords`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      'content-type': 'application/json',
      accept: 'application/json',
      'keygen-version': '1.4',
    },
    json: {
      meta: {
        email: bundle.inputData.email,
        deliver: false,
      },
    },
  })

  return {}
}

export default {
  key: 'resetPassword',
  noun: 'Reset',
  display: {
    label: 'Reset Password',
    description: `Requests a password reset for an email.`,
  },
  operation: {
    inputFields: [
      {
        required: true,
        key: 'email',
        label: 'Email',
        helpText: `The user's email address.`,
        type: 'string',
      },
    ],
    perform,
    sample,
  },
}
