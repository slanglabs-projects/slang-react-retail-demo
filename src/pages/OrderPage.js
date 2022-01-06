import React, { useState } from 'react';
import { Typography, Card, CardContent, CardActionArea, CardMedia, Box, Button, Snackbar, Chip, AppBar, Toolbar, Alert } from '@mui/material';
import { useParams, useNavigate, Link } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { useSelector, useDispatch } from 'react-redux'
import { cancelOrder } from '../slices/orderHistorySlice'
import data from '../data/data';
import orders from '../data/dummyOrders'
import fruitsVeggiesImage from '../assets/img/fruits-veggies.jpg'
import { formatDate } from '../Utils'


const OrderGroceryItem = (props) => {
    const item = data[props.itemKey];

    return <Card sx={{ display: 'flex' }}>
        <CardMedia
            component="img"
            sx={{ width: 120 }}
            image={fruitsVeggiesImage}
        />

        <CardActionArea component={Link} to={`/item/${props.itemKey}`}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                <CardContent>
                    <Typography sx={{ fontSize: { xs: 15, sm: 20 } }} component="div" variant="h5">
                        {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 12, sm: 17 } }} color="text.secondary" component="div">
                        ₹{item.price}
                    </Typography>
                    <Chip variant="outlined" sx={{ fontSize: { xs: 10, sm: 12 }, marginTop: 0.5 }} label="5kg" size="small" />
                    {'offer' in item
                        ? (<Typography sx={{ fontSize: { xs: 10, sm: 15 }, marginTop: 0.5 }} color="text.secondary" component="div">
                            {item.offer}
                        </Typography>)
                        : null
                    }
                    <Typography sx={{ fontSize: { xs: 10, sm: 15 }, marginTop: 0.5 }} component="div">
                        Quantity: {props.quantity}
                    </Typography>
                </CardContent>
            </Box>
        </CardActionArea>
    </Card>
}


const OrderPage = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const order = useSelector((state) => state.orderHistory.orders[params.key])
    const [cancelSnackbar, setCancelSnackbar] = useState(false);

    if (order === undefined) {
        return "That order does not exist"
    }

    const cancel = () => {
        setCancelSnackbar(true);
        dispatch(cancelOrder(params.key))
    }


    const date = formatDate(new Date(order.date))

    let price = 0;

    for (const itemKey in order.items) {
        price += data[itemKey].price * order.items[itemKey];
    }

    price = price.toFixed(2);

    return (
        <React.Fragment>
            <Snackbar open={cancelSnackbar} autoHideDuration={6000} onClose={() => setCancelSnackbar(false)}>
                <Alert onClose={() => setCancelSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    Your order has been cancelled.
                </Alert>
            </Snackbar>
            <Typography sx={{ marginTop: 2 }} variant="h5">Your order on {date}</Typography>
            <Box sx={{ marginBottom: 2, marginTop: 2, paddingBottom: 8 }}>
                <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 700: 2, 1000: 3 }}>
                    <Masonry gutter="20px">
                        {Array.from(Object.keys(order.items)).map((key, index) => (
                            <OrderGroceryItem key={index} itemKey={key} quantity={order.items[key]} />
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </Box>

            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar>
                    <Typography variant="h6">Total: ₹{price}</Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={cancel} disabled={order.cancelled} color="error" variant="contained">{order.cancelled ? 'Order Cancelled' : 'Cancel Order'}</Button>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    );
}

export default OrderPage;
