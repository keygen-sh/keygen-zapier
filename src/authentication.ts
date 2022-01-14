import { ZObject, Bundle } from 'zapier-platform-core'

interface BearerResponse {
  data?: {
    type: string
    id: string
  }
  errors?: {
    title: string
    detail: string
    code?: string
  }[]
}

async function test(z: ZObject, bundle: Bundle) {
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/me`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  const { data, errors } = res.json as BearerResponse
  if (errors) {
    throw new Error('Invalid API settings')
  }

  if (data!.type !== 'products') {
    throw new Error('Invalid product token')
  }

  if (data!.id !== bundle.authData.productId) {
    throw new Error('Invalid product ID')
  }

  return res.json
}

const authentication = {
  type: 'custom',
  connectionLabel: '{{data.attributes.name}}',
  fields: [
    {
      label: 'Account ID',
      key: 'accountId',
      type: 'string',
      required: true,
      helpText: `The ID of your Keygen account. Found on your [settings page](https://app.keygen.sh/settings)`,
    },
    {
      label: 'Product ID',
      key: 'productId',
      type: 'string',
      required: true,
      helpText: `The ID of your Keygen product. Found on your [product page](https://app.keygen.sh/products)`,
    },
    {
      label: 'Product Token',
      key: 'productToken',
      type: 'password',
      required: true,
      helpText: `An API token belonging to your Keygen product. Create a product token from [the tokens page](https://app.keygen.sh/tokens) by clicking "New Product Token."`,
    },
  ],
  test,
}

export default authentication
