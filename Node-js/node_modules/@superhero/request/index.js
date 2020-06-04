const
Debug       = require('@superhero/debug'),
url         = require('url'),
querystring = require('querystring')

module.exports = class
{
  constructor(config)
  {
    this.config = Object.assign(
    {
      debug   : false,
      headers : {},
      timeout : 30e3,
      url     : ''
    }, config)
    this.debug = new Debug({debug:!!this.config.debug})
  }

  get(...args)
  {
    return this.fetch('GET', ...args)
  }

  put(...args)
  {
    return this.fetch('PUT', ...args)
  }

  post(...args)
  {
    return this.fetch('POST', ...args)
  }

  delete(...args)
  {
    return this.fetch('DELETE', ...args)
  }

  fetch(method, options)
  {
    return new Promise((fulfill, reject) =>
    {
      if(typeof options == 'string')
      {
        options = { url:options }
      }

      options = Object.assign(
      {
        headers : {},
        timeout : this.config.timeout,
        url     : ''
      }, options)

      const
      assigned    = Object.assign({}, this.config.headers, options.headers),
      objectKeys  = Object.keys(assigned),
      headers     = objectKeys.reduce((c, k) => (c[k.toLowerCase()] = assigned[k], c), {}),
      body        = typeof (options.data || '') == 'string'
                    ? options.data
                    : ( headers['content-type'] || '' ).startsWith('application/json')
                      ? JSON.stringify(options.data)
                      : querystring.stringify(options.data),
      composed    = this.config.url + options.url,
      parsed      = url.parse(composed, false, true),
      config      =
      {
        auth    : parsed.auth,
        host    : parsed.hostname,
        path    : parsed.path,
        port    : parsed.port || (parsed.protocol == 'https:' ? 443 : 80),
        timeout : options.timeout,
        method  : method,
        headers : (() =>
                  {
                    headers['content-length'] = Buffer.byteLength(body || '', 'utf8');
                    return headers
                  })()
      },
      request = ( parsed.protocol == 'https:'
                ? require('https')
                : require('http')).request(config, (result) =>
      {
        let data = ''

        if(options.pipe)
        {
          result.pipe(options.pipe)
        }

        result.on('data', (chunk) => data += chunk)
        result.on('end',  ()      =>
        {
          try
          {
            data = JSON.parse(data)
          }
          catch (e) { /* tried and failed to parse content as json */ }

          this.debug.log('status:',  result.statusCode)
          this.debug.log('headers:', result.headers)
          this.debug.log('data:',    data)

          fulfill(
          {
            url     : composed,
            status  : result.statusCode,
            headers : result.headers,
            data    : data
          })
        })
      })

      this.debug.log('options:', config)

      // writing body, if one is declared
      body && request.write(body)

      request.on('error', reject)
      request.end()
    })
  }
}
