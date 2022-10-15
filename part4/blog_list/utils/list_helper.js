const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  let maxLikes = 0
  
  blogs.forEach((blog) => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes
      favoriteBlog = blog
    }
  })
  
  const { title, author, likes } = favoriteBlog
  return { title, author, likes }
}

const mostBlogs = (blogs) => {
  const count = _.countBy(blogs, 'author')
  const countPairs = _.toPairs(count)
  const [author, blogCount] = _.maxBy(countPairs, _.last)
  return ({
    author,
    blogs: blogCount
  })
}

const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  const sumLikes = _.map(authors, (val, key) => ({
    'author': key,
    'likes': _.sumBy(val, 'likes')
  }))
  const maxLikes = _.maxBy(sumLikes, 'likes')
  return maxLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}