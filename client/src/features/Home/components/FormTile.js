import * as React from "react";
import { Col, Card, Button, Form } from "react-bootstrap";
import "./Home.scss";
import { HashLink } from 'react-router-hash-link';

export const FormTile = ({
  tileHeader,
  formType,
  formPlaceholderText,
  formValue,
  ctaCopy,
  ctaOnClick,
  type,
}) => {
  const [value, setValue] = React.useState("");
  const [showSubmitted, setShowSubmitted] = React.useState(false)

  const formClick = () => {
    if (value) {
      ctaOnClick(value)
      setValue('')
      setShowSubmitted(true)
      setTimeout(function() {
        setShowSubmitted(false)
      }, 3000)
    }
  }

  return (
    <Col xs={12} md={4}>
      <Card className="mb-4 weeklyTask section formTile">
        <Card.Body className="align-items-center">
          <div className="tileHeader">{tileHeader}</div>
          { type === "invite" ? 
            <div className="description">Invite your friends to join you along your credit journey by entering their email below. We’re better together 💪</div>
            :
            <div className="description"><HashLink to="#credit-check">Check your credit score</HashLink> (free with Sequin!) and enter it below. This lets you track your credit gains and progress using the graph below.</div>
          }
            <Form.Group>
            <Form.Control
              type={formType}
              placeholder={formPlaceholderText}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            </Form.Group>
            {showSubmitted ?
              <Button className="orange-cta">
                Saved!
              </Button>
            :
              <Button className="cta" onClick={formClick}>
                {ctaCopy}
              </Button>
            }
        </Card.Body>
      </Card>
    </Col>
  );
};
