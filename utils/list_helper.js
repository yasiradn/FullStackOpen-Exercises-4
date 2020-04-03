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




  
  module.exports = {
    dummy, totalLikes
  }