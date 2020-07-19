# Environment variables

### Sentry

The app is resiliant to having no keys set for Sentry. Exceptions will be captured but not sent.

To capture errors, set SENTRY_DSN in `env.local`

### Amplitude

An Amplitude key is required, but a default has been set for NEXT_PUBLIC_AMPLITUDE_KEY in `.env`. The default key is valid and data will be sent, but the data cannot be accessed.

### Stage

Set in `.env`, NEXT_PUBLIC_APP_STAGE determines if certain pieces of code will fire. Consider it a manually controlled NODE_ENV. Set to `development`, `staging` or `production`

### App Name

NEXT_PUBLIC_APP_NAME determines the name of the app for things such as Monitoring/Analytics/etc
