import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';


function FormSideBar(props) {
  return (
        <ListGroup>
            {
                props.linkData.map((link, index) => {
                    if (props.presentStep === index + 1) { return <ListGroupItem active>{link}</ListGroupItem>; }
                    return <ListGroupItem onClick={() => props.clickHandler({ step: index + 1 })}>{link}</ListGroupItem>;
                    })
            }
        </ListGroup>
  );
}

export default FormSideBar;
