import { Bundle, ZObject } from 'zapier-platform-core'
import * as sample from '../samples/release.json'

interface Release {
  type: string
  id: string
  attributes: {
    filename: string
    version: string
    name: string
    platform: string
    channel: string
  }
}

function toLabel(release: Release): string {
  const { name, filename, version, platform, channel } = release.attributes

  return `${name || filename} - v${version} ${platform} (${channel})`
}

async function perform(z: ZObject, bundle: Bundle) {
  const page = bundle.meta.page || 1
  const res = await z.request({
    method: 'GET',
    url: `https://api.keygen.sh/v1/accounts/${bundle.authData.accountId}/releases?page[number]=${page}&page[size]=100`,
    headers: {
      authorization: `Bearer ${bundle.authData.productToken}`,
      accept: 'application/json',
    },
  })

  res.throwForStatus()

  return res.json.data.map(
    (r: Release) => ({ id: r.id, name: toLabel(r) })
  )
}

export default {
  key: 'releases',
  noun: 'Releases',
  display: {
    label: 'List of Releases',
    description: 'This is a hidden trigger, and is used in a Dynamic Dropdown within this app.',
    hidden: true,
  },
  operation: {
    canPaginate: true,
    sample: {
      id: sample.data.id,
      name: toLabel(sample.data),
    },
    perform,
  },
}
