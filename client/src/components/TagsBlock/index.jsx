import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import { SideBlock } from "../SideBlock";
import styles from './TagsBlock.module.scss';
import { setSortByTag } from '../../redux/filters/slice'
import { useDispatch, useSelector } from 'react-redux'


export const TagsBlock = ({ items, isLoading = true }) => {

  const dispatch = useDispatch()
  const { sortByTag } = useSelector(state => state.filters)


  const clickOnTag = (tag) => {
    let name = (tag === sortByTag) ? "" : tag
    dispatch(setSortByTag(name))
  }

  return (
    <SideBlock title="tags">
      <List>
        {(isLoading ? [...Array(5)] : items).map((name, i) => (
          <div className={sortByTag === name ? styles.active : ""} onClick={() => clickOnTag(name)} key={i}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <TagIcon />
                </ListItemIcon>
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText primary={name} />
                )}
              </ListItemButton>
            </ListItem>
          </div>
        ))}
      </List>
    </SideBlock>
  );
};