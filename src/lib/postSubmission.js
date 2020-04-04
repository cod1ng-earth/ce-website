import _map from 'lodash.map'

export default (formName, submission) => {
  const encoded = _map(
    {
      'form-name': formName,
      ...submission,
    },
    (val, key) => encodeURIComponent(key) + '=' + encodeURIComponent(val)
  ).join('&')

  return fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encoded,
  })
}
