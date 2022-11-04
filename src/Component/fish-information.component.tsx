import React from "react";

// bootstrap
import { Row, Col } from 'react-bootstrap';

interface fishInformationProps {

};

const FishInformation : React.FC<fishInformationProps> = React.memo(({}) => {
    return <>
        <Row className="m-3">
            <Col className="col-6">
                [PHOTO POISSON]
            </Col>
            <Col className="col-6">
                [DESCRIPTION POISSON]
            </Col>
        </Row>
    </>;
});

export default FishInformation