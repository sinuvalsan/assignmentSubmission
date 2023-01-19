import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommentContainer from "../CommentContainer/commentContainer";
import httpRequest from "../Services/httpServices";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const ReviewerAssignmentView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const assignmentId = window.location.href.split("/assignments/")[1];

  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
    codeReviewUrl: "",
    status: null,
    number: null,
  });

  const [assignmentEnums, setAssignmentEnums] = useState([]);
  const [assignmentStatuses, setAssignmentStatuses] = useState([]);

  //const prevAssignmentValue = useRef(assignment);

  function updateAssignment(column, value) {
    const newAssignment = { ...assignment };
    newAssignment[column] = value;
    setAssignment(newAssignment);
  }

  function saveAssignment(status) {
    if (status && status !== assignment.status) {
      //updateAssignment("status", assignmentStatuses[1].status);
      assignment.status = status;
    }
    save();
  }

  function save() {
    httpRequest(
      `/api/assignments/${assignmentId}`,
      "PUT",
      user.jwt,
      assignment
    ).then((assignmentData) => {
      setAssignment(assignmentData);
    });
  }

  useEffect(() => {
    httpRequest(`/api/assignments/${assignmentId}`, "GET", user.jwt).then(
      (assignmentResponse) => {
        let assignmentData = assignmentResponse.assignment;
        if (assignmentData.branch === null) assignmentData.branch = "";
        if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
        setAssignment(assignmentData);
        setAssignmentEnums(assignmentResponse.assignmentEnums);
        setAssignmentStatuses(assignmentResponse.statusEnums);
      }
    );
  }, []);

  // useEffect(() => {
  //   if (prevAssignmentValue.current.status !== assignment.status) {
  //     save();
  //   } else {
  //     prevAssignmentValue.current = assignment;
  //   }
  // }, [assignment]);

  return (
    <>
      <Container className="mt-5">
        <Row className="d-flex align-items-center">
          <Col>
            <h1>Assignment {assignmentId}</h1>
          </Col>
          <Col>
            <StatusBadge text={assignment.status} />
          </Col>
        </Row>
        <div>
          {assignment ? (
            <>
              <Form.Group as={Row} className="my-3" controlId="githubUrl">
                <Form.Label column sm="3" md="2">
                  GitHubURL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="url"
                    placeholder="https://github.com/.../repo-name"
                    value={assignment.githubUrl}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-3" controlId="branch">
                <Form.Label column sm="3" md="2">
                  Branch
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="text"
                    placeholder="Your branch name"
                    value={assignment.branch}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-3" controlId="reviewUrl">
                <Form.Label column sm="3" md="2">
                  Review URL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="url"
                    placeholder="https://...video.com"
                    value={assignment.codeReviewUrl}
                    onChange={(e) =>
                      updateAssignment("codeReviewUrl", e.target.value)
                    }
                  />
                </Col>
              </Form.Group>
              <Row>
                <Col>
                  <Button
                    style={{ float: "left" }}
                    id="back"
                    type="button"
                    onClick={() => {
                      navigate(`/dashboard`);
                    }}
                    variant="secondary"
                  >
                    Back
                  </Button>
                </Col>
                <Col>
                  {assignment.status === "Needs Update" ? (
                    <Button
                      style={{ float: "left" }}
                      id="reclaim"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[2].status)
                      }
                      variant="warning"
                    >
                      Re-Claim
                    </Button>
                  ) : (
                    <Button
                      style={{ float: "left" }}
                      id="reject"
                      type="button"
                      onClick={() =>
                        saveAssignment(assignmentStatuses[3].status)
                      }
                      variant="danger"
                    >
                      Reject
                    </Button>
                  )}
                </Col>
                <Col>
                  <Button
                    style={{ float: "left" }}
                    id="complete"
                    type="button"
                    onClick={() => saveAssignment(assignmentStatuses[5].status)}
                    variant="primary"
                  >
                    Done
                  </Button>
                </Col>
              </Row>
              <CommentContainer assignmentId={assignmentId} />
            </>
          ) : (
            <></>
          )}
        </div>
      </Container>
    </>
  );
};

export default ReviewerAssignmentView;
