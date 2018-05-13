import termContent from '../src/contentHandler'

test('correctly handles empty content', () => {
  const lines = []
  const content = termContent(lines)
  const { value, done } = content.next()
  expect(value).toEqual([])
  expect(done).toBe(true)
})

test('correctly handles static cmd line', () => {
  const lines = [
    {
      text: 'ls',
      cmd: true
    }
  ]
  const content = termContent(lines)
  let next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(true)
})

test('correctly handles static output line', () => {
  const lines = [
    {
      text: 'foo',
      cmd: false
    }
  ]
  const content = termContent(lines)
  let next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)
  
  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(true)
})

test('correctly handles framed output', () => {
  const lines = [
    {
      cmd: false,
      frames: [
        {
          text: '[------------------------------------------------] 0/100'
        },
        {
          text: '[################################################] 100/100'
        }
      ]
    },
  ]

  const content = termContent(lines)
  let next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(false)

  next = content.next()
  expect(next.value).toMatchSnapshot()
  expect(next.done).toBe(true)
})