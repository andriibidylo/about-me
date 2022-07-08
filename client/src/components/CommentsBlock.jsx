import React from "react";
import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux'
import {removeComment} from '../redux/comments/slice'

export const CommentsBlock = ({ items, children, isLoading = true }) => {
 const dispatch = useDispatch()


  const onClickRemove = (id) => {
    dispatch(removeComment(id))
  };



  const { authorizedUser } = useSelector(state => state.auth)
  return (
    <SideBlock title="Comments">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.author.avatarUrl} src={obj.author.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "row", "justifyContent": "space-between", "width": "100%" }}>
                  <div>
                    <ListItemText
                      primary={obj.author.fullName}
                      secondary={obj.text}
                    />
                  </div>
                  {authorizedUser && <div onClick ={()=>onClickRemove(obj._id)} style={{ "display": "flex", "alignItems": "center", "justifyContent": "center" }} >
                    <IconButton color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </div>}
                </div>
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {authorizedUser && children}
    </SideBlock>
  );
};