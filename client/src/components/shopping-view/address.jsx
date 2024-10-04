import { useEffect, useState } from "react";
import CommonForm from "../common/form";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { addNewAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import AddressCard from "./address-card";
import { useToast } from "@/hooks/use-toast";

const initialAddressFormData = {
        address: "",
        city: "",
        phone: "",
        pincode: "",
        notes: "",
};

function Address({setCurrentSelectedAddress}) {

    const [formData,setFormData] = useState(initialAddressFormData);
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.auth)
    const {addressList} = useSelector(state => state.shopAddress)
    const [currentEditedId,setCurrentEditedId] = useState(null)
    const {toast} = useToast()

    function handleManageAddress (event) {
        event.preventDefault()

        if(addressList.length >= 3 && currentEditedId === null){
            setFormData(initialAddressFormData)
            toast({
                title: "You can only add up to 3 addresses.",
                variant: "destructive"
            })

            return;
        }

        currentEditedId !== null ? dispatch(editAddress({
            userId: user?.id, 
            addressId: currentEditedId, 
            formData}))
            .then((data) => {
                if(data?.payload?.success){
                    dispatch(fetchAllAddresses(user?.id))
                    setCurrentEditedId(null)
                    setFormData(initialAddressFormData)
                    toast({
                        title: "Address updated successfully"
                    })
                }
            }) 

            : 

        dispatch(addNewAddress({
            ...formData,
            userId: user?.id
        })).then(data => {
            if (data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                setFormData(initialAddressFormData)
                toast({
                    title: "Address added successfully"
                })
            }
        })
    }

    function handleEditAddress (getCurrentAddress){
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            phone: getCurrentAddress?.phone,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
        })
    }

    function handleDeleteAddress (getCurrentAddress) {
        dispatch(deleteAddress({userId: user?.id, addressId: getCurrentAddress._id}))
        .then((data) => {
            if(data?.payload?.success){
                dispatch(fetchAllAddresses(user?.id))
                toast({
                    title: "Address deleted successfully",
                    variant: "destructive"
                })
            }
        })
    }

    function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);

    }

    useEffect (() => {
        dispatch(fetchAllAddresses(user?.id))
    },[dispatch])

    console.log(addressList,"addressList")


    return ( 
        <Card>
            <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {
                    addressList && addressList.length > 0 ?
                    addressList.map(singleAddressItem => <AddressCard 
                        handleDeleteAddress = {handleDeleteAddress} 
                        addressInfo={singleAddressItem}
                        handleEditAddress = {handleEditAddress}
                        setCurrentSelectedAddress = {setCurrentSelectedAddress}
                        /> )
                    : null
                }
            </div>
            <CardHeader>
                <CardTitle>{currentEditedId !== null ? 'Edit Address' : 'Add New Address'}</CardTitle>
            </CardHeader>
            <CardContent className = "space-y-3">
                <CommonForm 
                formControls={addressFormControls}
                formData={formData}
                setFormData={setFormData}
                buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                onSubmit={handleManageAddress}
                isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
     );
}

export default Address;