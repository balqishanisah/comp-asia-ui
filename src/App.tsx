import { MonetizationOnRounded, TrendingUpRounded } from "@mui/icons-material";
import {
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemButton,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { log } from "console";

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

interface State extends SnackbarOrigin {
  open: boolean;
}

function App() {
  const [data, setData] = useState<Details[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  console.log("selected", selectedValue);

  useEffect(() => {
    axios
      .get("http://localhost:3000/comps")
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
  }, [selectedValue]);

  axios
    .patch(`http://localhost:3000/comps/${selectedValue}`, {
      status: "ORDERED",
      orderTime: new Date(),
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  let availableList = data?.filter((x) => x?.status === "AVAILABLE");
  let orderedList = data?.filter((x) => x?.status === "ORDERED");
  console.log("data", availableList, orderedList);

  const OrderDialog = (
    <Dialog
      fullWidth={true}
      open={openDialog}
      onClose={() => setOpenDialog(false)}
    >
      <DialogTitle id="alert-dialog-title">Order Listing</DialogTitle>
      <List sx={{ pt: 0 }}>
        {orderedList.map((x) => (
          <ListItem disableGutters key={x.id}>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar src={x?.imageUrl ?? "/static/images/avatar/3.jpg"} />
              </ListItemAvatar>
              <ListItemText primary={x.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );

  return (
    <>
      {OrderDialog}

      <div className="App">
        <div>
          <Typography
            component="span"
            className="text-main-title "
            variant="inherit"
            flex="1"
          >
            Comp App
          </Typography>
          <Button variant="text">Home Page</Button>
          <Button
            variant="text"
            onClick={(e) => {
              setOpenDialog(true);
            }}
          >
            Order Listing
          </Button>
        </div>
        <div className="search-bar-container ">
          <SearchBar />
        </div>
        <Container>
          <List sx={{ width: "100%" }}>
            {availableList === undefined || availableList?.length === 0
              ? null
              : // <EmptyState subTitle="Click add button to insert new records" />
                availableList?.map((v, i) => {
                  return (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "150px",
                            height: "auto",
                            borderRadius: "2px",
                          }}
                          variant="square"
                          src={
                            !!v?.imageUrl
                              ? v?.imageUrl
                              : "/static/images/avatar/3.jpg"
                          }
                        />
                      </ListItemAvatar>
                      &nbsp;&nbsp;
                      <ListItemText
                        primary={
                          <Typography
                            component="div"
                            display="flex"
                            variant="inherit"
                          >
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
                          <>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {v?.color}
                            </Typography>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <Button
                                sx={{ float: "right", size: "smaller" }}
                                variant="contained"
                                onClick={(e) => {
                                  setSelectedValue(v?.id);
                                  handleClick();
                                }}
                              >
                                Place Order
                              </Button>
                              <Snackbar
                                open={open}
                                autoHideDuration={600}
                                onClose={handleClose}
                                message="You have place an order"
                              />
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  );
                })}
          </List>
        </Container>
      </div>
    </>
  );
}

export default App;
