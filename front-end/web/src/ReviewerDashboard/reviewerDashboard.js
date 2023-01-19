import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import httpRequest from "../Services/httpServices";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const ReviewerDashboard = () => {
  const user = useUser();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    httpRequest("api/assignments", "GET", user.jwt).then((assignmentData) => {
      setAssignments(assignmentData);
    });
  }, []);

  function claimAssignment(assignment) {
    assignment.status = "In Review";
    httpRequest(
      `api/assignments/${assignment.id}`,
      "PUT",
      user.jwt,
      assignment
    ).then((updatedAssignment) => {
      const assignmentsCopy = [...assignments];
      const i = assignmentsCopy.findIndex((a) => a.id === assignment.id);
      assignmentsCopy[i] = updatedAssignment;
      setAssignments(assignmentsCopy);
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
        <div className="assignment-wrapper in-review">
          <div className="h4 px-1 assignment-wrapper-title">In Review</div>
          {assignments &&
          assignments.filter((assignment) => assignment.status === "In Review")
            .length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "In Review")
                .map((assignment) => (
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
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
        <div className="assignment-wrapper submitted">
          <div className="h4 px-1 assignment-wrapper-title">
            Awaiting Review
          </div>
          {assignments &&
          assignments.filter(
            (assignment) =>
              assignment.status === "Submitted" ||
              assignment.status === "Re-Submitted"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter(
                  (assignment) =>
                    assignment.status === "Submitted" ||
                    assignment.status === "Re-Submitted"
                )
                .sort((a, b) => {
                  if (a.status === "Resubmitted") return -1;
                  else return 1;
                })
                .map((assignment) => (
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
                          claimAssignment(assignment);
                        }}
                        variant="outline-primary"
                      >
                        Claim
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
        <div className="assignment-wrapper needs-update">
          <div className="h4 px-1 assignment-wrapper-title">Needs Update</div>
          {assignments &&
          assignments.filter(
            (assignment) => assignment.status === "Needs Update"
          ).length > 0 ? (
            <div
              className="d-grid gap-5"
              style={{ gridTemplateColumns: "repeat(auto-fit, 18rem)" }}
            >
              {assignments
                .filter((assignment) => assignment.status === "Needs Update")
                .map((assignment) => (
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
                          claimAssignment(assignment);
                        }}
                        variant="outline-primary"
                      >
                        View
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          ) : (
            <div>No Assignments Found</div>
          )}
        </div>
      </div>
    </Container>
  );
};
export default ReviewerDashboard;
