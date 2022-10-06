const { totalLikes } = require('../utils/list_helper')

describe('total likes', () => {
  test('of an empty list is 0', () => {
    expect(totalLikes([])).toBe(0)
  })
  
  test('of a single item list is its likes', () => {
    const blogList = [
      {
        title: "blog1",
        author: "user1",
        url: "example1.com",
        likes: 9999
      }
    ]
    expect(totalLikes(blogList)).toBe(9999)
  })
  
  test('of a bigger list is sum of likes', () => {
    const blogList = [
      {
        title: "blog1",
        author: "user1",
        url: "example1.com",
        likes: 123
      },
      {
        title: "blog2",
        author: "user2",
        url: "example2.com",
        likes: 456
      }
    ]
    expect(totalLikes(blogList)).toBe(579)
  })
})