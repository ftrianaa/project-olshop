import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Checkout } from "../actions/Actions"
import { useCartDispatch } from "../actions/Context"

export default function ConfirmPaymentModal(props) {
    const cancelRef = useRef()
    const navigate = useNavigate()
    const { isOpen, onClose } = props
    const dispatch = useCartDispatch()
    const handleCheckout = () => {
        onClose()
        Checkout(dispatch)
        navigate('/')
    }
    // console.log(isOpen, 'ini isopen')
    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Alert
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure you already complete the payment?
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button colorScheme='red' ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' ml={3} onClick={()=>handleCheckout()}>
                            Confirm
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}