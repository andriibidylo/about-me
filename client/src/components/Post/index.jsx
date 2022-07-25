import React, { useState } from 'react';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from "react-router-dom"
import styles from './Post.module.scss';
import { UserInfo } from '../UserInfo';
import { PostSkeleton } from './Skeleton';
import { useDispatch } from 'react-redux'
import { removePost, addLike, removeLike } from '../../redux/posts/slice'
import { useSelector } from 'react-redux'


export const Post = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isPostDetails,
  isLoading,
  isLiked,
  isAuthor,
  likesCount,
}) => {


  const [like, setLike] = useState(isLiked)
  const [likeCount, setLikeCount] = useState(likesCount)
  const { authorizedUser } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  const onClickRemove = (id) => {
    dispatch(removePost(id))
  };

  const onClickLike = (postId) => {
    if (authorizedUser) {
      if (like) {
        dispatch(removeLike(postId))
        setLikeCount(likeCount - 1)
      } else {
        dispatch(addLike(postId))
        setLikeCount(likeCount + 1)
      }
      setLike(!like)
    }
  }

  if (isLoading) {
    return <PostSkeleton />
  }

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isPostDetails })}>
      {isAuthor && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={() => onClickRemove(id)} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <Link to={`/posts/${id}`}><img
          className={clsx(styles.image, { [styles.imageFull]: isPostDetails })}
          src={imageUrl}
          alt={title}
        />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isPostDetails })}>
            {isPostDetails ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                #{name}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
            <li className = {styles.favariteButton} onClick={() => onClickLike(id)}>
              {like ? <FavoriteIcon/> : <FavoriteBorderIcon />}
              <span>{likeCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};