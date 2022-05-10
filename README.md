# keygen-zapier

The official Zapier integration for [keygen.sh](https://keygen.sh). You can start using
the integration today [by clicking here](https://zapier.com/apps/keygen/integrations).
Please open a new issue for any problems or feature requests. You can also reach out to
our [support@keygen.sh](mailto:support@keygen.sh) email anytime. We're excited to see
what you build!

## Examples

- Send an email to new customers with their license key and a download link to your app
- Generate a new Keygen license for a new Chargebee subscription
- Upload a Keygen release when a new GitHub release is created
- Create a Keygen license when a new Stripe payment succeeds
- Suspend a Keygen license when a Stripe subscription is canceled
- Renew a Keygen license when a Stripe subscription is renewed
- Send an email notification when a new release is published
- Update per-seat billing when a device is activated
- Send a welcome email when a license is created

## Installation

```
yarn global add zapier-platform-cli
yarn
```

Zapier runs on AWS Lambda and requires Node 10.

## Developing

### Validate

```
yarn validate
```

### Deploy

```
yarn push
```

## Forking

If you want to make changes and run your own version of this integration, remove the
`.zapierapprc` file and create a new Zapier integration with `zapier register "My integration"`
under your own Zapier account.

## License

MIT
