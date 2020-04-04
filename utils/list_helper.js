var _ = require('lodash')
const dummy = (blogs) => {
    // ...
    return 1
  }

const totalLikes = (blog_post) => {
  if(blog_post.length > 0){
    const getLikes = []
    const likes =  blog_post.forEach(post => {
      getLikes.push(post.likes)
    });
    return getLikes.reduce((acc,getLikes) => acc+getLikes, 0)
  } else {
    return 0
  }
}
const favoriteBlog = (blogs) => {
  const getLikes = []
  const likes =  blogs.forEach(post => {
    getLikes.push(post.likes)
  });
  const highestVote = Math.max(...getLikes)
  let keyPosition = Object.keys(blogs).find(key => blogs[key].likes === highestVote);
  const postWithMostLike = blogs[keyPosition]
  delete postWithMostLike._id && delete postWithMostLike.url && delete postWithMostLike.__v
  return postWithMostLike
}

const mostBlogs = (blogs) => {
  const getAllAuthors = _.countBy(blogs, function(o) { return o.author; })
  const authorName = _.maxBy(_.keys(getAllAuthors), function (o) { return getAllAuthors[o]; });
  const authorWithNumberOfBlog = _.pick(getAllAuthors,authorName) 
  var author = {}
  author['author'] = authorName
  author['blogs'] = authorWithNumberOfBlog[authorName]
  return author
}
  module.exports = {
    dummy, totalLikes,favoriteBlog, mostBlogs
  }