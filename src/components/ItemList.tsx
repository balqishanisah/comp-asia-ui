import { MonetizationOnRounded } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { log } from "console";
import * as React from "react";

interface Details {
  id: string;
  name: string;
  color: string;
  brand: string;
  category: string;
  price: number;
  imageUrl?: string | null;
  status: string;
  orderTime?: Date | null;
}

interface productList {
  productList: Details[];
}

export const AlignItemsList = (props: productList) => {
  const { productList } = props;
  console.log(productList?.map((x) => x.id));
  return (
    <>
      {productList?.map((v, i) => {
        <List sx={{ width: "100%" }}>
          {/* <React.Fragment key={v.id}> */}
          <ListItem>
            <ListItemAvatar>
              <Avatar
                sx={{ width: "150px", height: "auto", borderRadius: "2px" }}
                variant="square"
                src="/static/images/avatar/3.jpg"
              />
            </ListItemAvatar>
            &nbsp;&nbsp;
            <ListItemText
              primary={
                <Typography component="div" display="flex" variant="inherit">
                  <Typography
                    component="span"
                    className="text-xsTitle"
                    variant="inherit"
                    flex="1"
                  >
                    {v?.name}
                  </Typography>
                  <Typography
                    component="span"
                    variant="inherit"
                    color="primary"
                    className="text-icon text-desc"
                  >
                    <MonetizationOnRounded />
                    {v?.price}
                  </Typography>
                </Typography>
              }
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  ></Typography>
                  {" — Do you have Paris recommendations? Have you ever…"}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          {/* </React.Fragment> */}
        </List>;
      })}
    </>
  );
};
