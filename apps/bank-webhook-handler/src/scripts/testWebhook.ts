import crypto from 'crypto'

const SECRET  = process.env.WEBHOOK_SECRET ?? 'paste_your_secret_here'
const URL     = 'http://localhost:3002/bankwebhook'
const PAYLOAD = JSON.stringify({
  token:           'test_token_abc',
  user_identifier: '00000000-0000-0000-0000-000000000001',
  amount:          '5000',
})

const timestamp = Date.now().toString()
const signature =
  'sha256=' +
  crypto
    .createHmac('sha256', SECRET)
    .update(timestamp + '.')
    .update(PAYLOAD)
    .digest('hex')

console.log(`
# Valid request — should return 200:
curl -X POST ${URL} \\
  -H "Content-Type: application/json" \\
  -H "x-webhook-signature: ${signature}" \\
  -H "x-webhook-timestamp: ${timestamp}" \\
  -d '${PAYLOAD}'

# Tampered body — should return 401:
curl -X POST ${URL} \\
  -H "Content-Type: application/json" \\
  -H "x-webhook-signature: ${signature}" \\
  -H "x-webhook-timestamp: ${timestamp}" \\
  -d '{"token":"test_token_abc","user_identifier":"00000000-0000-0000-0000-000000000001","amount":"99999"}'

# Old timestamp — should return 401 after 5 min:
curl -X POST ${URL} \\
  -H "Content-Type: application/json" \\
  -H "x-webhook-signature: ${signature}" \\
  -H "x-webhook-timestamp: 1000" \\
  -d '${PAYLOAD}'
`)