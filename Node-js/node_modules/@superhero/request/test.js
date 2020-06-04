describe('request tests', async () =>
{
  const
  expect  = require('chai').expect,
  context = require('mochawesome/addContext'),
  Request = require('.'),
  request = new Request

  it('simple GET http request', async () =>
  {
    const response = await request.get('http://httpbin.org/get?foo=bar')
    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })

  it('simple GET https request', async () =>
  {
    const response = await request.get('https://httpbin.org/get?foo=bar')
    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })

  it('simple POST http request', async () =>
  {
    const
    url       = 'http://httpbin.org/post',
    data      = { foo:'bar' },
    response  = await request.post({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple POST https request', async () =>
  {
    const
    url       = 'https://httpbin.org/post',
    data      = { foo:'bar' },
    response  = await request.post({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple PUT http request', async () =>
  {
    const
    url       = 'http://httpbin.org/put',
    data      = { foo:'bar' },
    response  = await request.put({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple PUT https request', async () =>
  {
    const
    url       = 'https://httpbin.org/put',
    data      = { foo:'bar' },
    response  = await request.put({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple DELETE http request', async () =>
  {
    const
    url       = 'http://httpbin.org/delete',
    data      = { foo:'bar' },
    response  = await request.delete({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple DELETE https request', async () =>
  {
    const
    url       = 'https://httpbin.org/delete',
    data      = { foo:'bar' },
    response  = await request.delete({ url, data })
    expect(response.status).to.be.equal(200)
    expect(response.data.data).to.be.equal('foo=bar')
  })

  it('simple GET http request', async () =>
  {
    const
    url       = 'http://httpbin.org/get?foo=bar',
    headers   = { 'content-type':'json/application' },
    response  = await request.get({ url, headers })

    expect(response.status).to.be.equal(200)
    expect(response.data.args.foo).to.be.equal('bar')
  })
})
