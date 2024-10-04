import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetailsView from "./order-details.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderForAdmin, getOrderDetailsForAdmin, resetOrderDetailsForAdmin } from "@/store/admin/order-slice";
import { Badge } from "../ui/badge";

function AdminOrdersView() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()
    const { orderList, orderDetails } = useSelector(state => state.adminOrder)
    const [selectedOrder, setSelectedOrder] = useState(null);

    function handleFetchOrderDetails(getId) {
        dispatch(getOrderDetailsForAdmin(getId))
    }


    const handleOpenDialog = (orderId) => {
        handleFetchOrderDetails(orderId); // Fetch the details for the clicked order
        setSelectedOrder(orderId);
        setOpenDetailsDialog(true);
    };

    useEffect(() => {
        dispatch(getAllOrderForAdmin())
    }, [dispatch])

    return (
        <Card>
            <CardHeader>
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order Id</TableHead>
                            <TableHead>Order Date</TableHead>
                            <TableHead>Order Status</TableHead>
                            <TableHead>Order Price</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                [...orderList]  // Create a shallow copy of orderList to avoid mutating the original array
                                    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)) // Sort by orderDate, newest first
                                    .map((orderItem) => (
                                        <TableRow key={orderItem._id}>
                                            <TableCell>{orderItem._id}</TableCell>
                                            <TableCell>{orderItem.orderDate.split('T')[0]}</TableCell>
                                            <TableCell>
                                                <Badge className={`py-1 px-3 ${orderItem.orderStatus === 'confirmed'
                                                    ? 'bg-green-500' : orderItem.orderStatus === 'rejected'
                                                        ? 'bg-red-600'
                                                        : 'bg-black'}`}>
                                                    {orderItem.orderStatus}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>₱{orderItem.totalAmount}</TableCell>
                                            <TableCell>
                                                <Button onClick={() => handleOpenDialog(orderItem._id)}>
                                                    View Details
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                : null
                        }
                    </TableBody>
                </Table>
                <Dialog open={openDetailsDialog} onOpenChange={(open) => {
                    setOpenDetailsDialog(open);
                    if (!open) {
                        setSelectedOrder(null);
                        dispatch(resetOrderDetailsForAdmin());
                    }
                }}>

                    <AdminOrderDetailsView orderDetails={orderDetails} />
                </Dialog>

            </CardContent>
        </Card>
    );
}

export default AdminOrdersView;