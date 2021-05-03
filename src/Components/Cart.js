import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

import firebase from "../Firebase";
import { Link } from "react-router-dom";
import MaterialTable from "material-table";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  iconLast: {
    color: "white",
    marginLeft: theme.spacing(196),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function Album() {
  const classes = useStyles();

  const [allItems, setItem] = useState([]);
  const [total, setTotal] = useState(0);

  const getTotal = (doc) => {
    var t = 0;
    doc.map((data) => (t += data.price));
    setTotal(t);
  };

  const mapData = (doc) => {
    const newData = [];
    for (var i = 0; i < doc.length; i++) {
      var flag = 0;
      for (var j = 0; j < newData.length; j++) {
        if (doc[i].name === newData[j].name) {
          console.log("yy");
          newData[j].qty++;
          flag = 1;
        }
      }
      if (!flag) {
        newData.push(doc[i]);
      }
    }
    console.log(newData);
    return newData;
  };

  useEffect(() => {
    const db = firebase.firestore();
    var docRef = db.collection("items");

    db.collection("items")
      .get()
      .then((querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());
        var newData = mapData(documents);
        setItem(newData);
        getTotal(documents);
        // do something with documents
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, [setItem]);

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ShoppingCartIcon className={classes.icon} />
          <Typography variant="h6" color="inherit" noWrap>
            Cart
          </Typography>
          <Link to="/">
            <LocalMallIcon className={classes.iconLast} />
          </Link>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Cart
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              All your items are here!
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          <Card elevation={0}>
            <CardContent style={{ padding: 0 }}>
              <MaterialTable
                title="Shopping Cart"
                data={allItems}
                actions={[
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete Item(s)",
                    onClick: (e, rowData) => {
                      //   this.props.basketData.onItemDeleted(rowData.id);
                    },
                  },
                  {
                    icon: () => <DeleteOutline />,
                    tooltip: "Delete All Item",
                    onClick: () => {
                      //   this.props.basketData.onAllItemsDeleted();
                    },
                    isFreeAction: true,
                  },
                ]}
                columns={[
                  { title: "Product", field: "name" },
                  { title: "Quantity", field: "qty", type: "numeric" },
                  { title: "Price", field: "price", type: "currency" },
                ]}
                options={{
                  actionsColumnIndex: -1,
                  emptyRowsWhenPaging: false,
                  paging: false,
                  search: false,
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: "No item in your shopping cart",
                  },
                  header: {
                    actions: "",
                  },
                }}
              />

              <div
                style={{ padding: "10px 20px 10px 10px", textAlign: "right" }}
              ></div>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Typography variant="h5" style={{ marginRight: 10 }}>
                Total: ${total}
              </Typography>
              <Link to="/checkout">
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ textTransform: "none" }}
                >
                  Payment
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Container>
      </main>
    </React.Fragment>
  );
}
