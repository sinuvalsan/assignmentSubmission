import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpRequest from "../Services/httpServices";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const Dashboard = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    httpRequest("api/assignments", "GET", user.jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, []);

  function createAssignment() {
    httpRequest("api/assignments", "POST", user.jwt).then((assignment) => {
      navigate(`/assignments/${assignment.id}`);
    });
  }
  return (
    <Container className="mt-5">
      <div style={{ margin: "2em" }}>
        <Row>
          <Col>
            <span
              style={{ cursor: "pointer", float: "right" }}
              onClick={() => {
                user.setJwt(null);
                navigate(`/login`);
              }}
            >
              Logout
            </span>
          </Col>
        </Row>
        <Button
          style={{ marginBottom: "1em" }}
          onClick={() => createAssignment()}
        >
          Add new assignment
        </Button>
        {assignments ? (
          <div
            className="d-grid gap-5"
            style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
          >
            {assignments.map((assignment) => (
              <Card
                key={assignment.id}
                style={{ width: "18rem", height: "18rem" }}
              >
                <Card.Body className="d-flex flex-column justify-content-around">
                  <Card.Title>Assignment #{assignment.id}</Card.Title>
                  <div className="d-flex align-items-start">
                    <StatusBadge text={assignment.status} />
                  </div>
                  {/* <Card.Text>{assignment.name}</Card.Text> */}
                  <Button
                    onClick={() => {
                      navigate(`/assignments/${assignment.id}`);
                    }}
                    variant="outline-primary"
                  >
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};
export default Dashboard;
