export const formatDate = (timestemp) => {
  let date = new Date(timestemp).toUTCString();;
  return date.split(' ').slice(0, 4).join(' ');
}
export const countCommentsForPost = (post, allComments) => {
  const filteredPosts = allComments.items.filter(el => el.post === post).length
  return filteredPosts
}
