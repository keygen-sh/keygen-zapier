# keygen-zapier

The official Zapier integration for [keygen.sh](https://keygen.sh). This integration is currently in beta. You
can join the beta program [by clicking here](https://zapier.com/developer/public-invite/153849/d64f8d33515a747e154f3ee74ad90440/).
Please open a new issue for any problems or feature requests. You can also reach out to
our `support@` email anytime.

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

If you want to make changes and run your own version of this integration, remove the `.zapierapprc`
file and create a new Zapier integration with `zapier register "My integration"` under your own
Zapier account.

## License

MIT
