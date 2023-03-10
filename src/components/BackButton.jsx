import { ArrowBackIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate()
    return (
        <ButtonGroup isAttached variant='solid'  onClick={()=>navigate(-1)}  colorScheme='red'>
            <IconButton aria-label='Add to friends' icon={<ArrowBackIcon />} />
            <Button  textTransform='uppercase' letterSpacing={2}>Back</Button>
        </ButtonGroup>
        // <Button>Back</Button>
    )
}