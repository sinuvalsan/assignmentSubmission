import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CommentContainer from "../CommentContainer/commentContainer";
import httpRequest from "../Services/httpServices";
import StatusBadge from "../StatusBadge/statusBadge";
import { useUser } from "../UserProvider/userProvider";

const AssignmentView = () => {
  const user = useUser();
  const navigate = useNavigate();
  const assignmentId = window.location.href.split("/assignments/")[1];

  const [assignment, setAssignment] = useState({
    branch: "",
    githubUrl: "",
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
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  Assignment Number
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <DropdownButton
                    as={ButtonGroup}
                    id="assignmentName"
                    variant={"info"}
                    title={
                      assignment.number
                        ? `Assignment ${assignment.number}`
                        : "Select an Assignment"
                    }
                    onSelect={(selectedElement) => {
                      updateAssignment("number", selectedElement);
                    }}
                  >
                    {assignmentEnums.map((assignmentEnum) => (
                      <Dropdown.Item
                        key={assignmentEnum.assignmentNum}
                        eventKey={assignmentEnum.assignmentNum}
                      >
                        {assignmentEnum.assignmentNum}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  GitHubURL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="url"
                    placeholder="https://github.com/.../repo-name"
                    value={assignment.githubUrl}
                    onChange={(e) =>
                      updateAssignment("githubUrl", e.target.value)
                    }
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3"
                controlId="formPlaintextEmail"
              >
                <Form.Label column sm="3" md="2">
                  Branch
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <Form.Control
                    type="text"
                    placeholder="Your branch name"
                    value={assignment.branch}
                    onChange={(e) => updateAssignment("branch", e.target.value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                as={Row}
                className="my-3 align-items-center"
                controlId="reviewUrl"
              >
                <Form.Label column sm="3" md="2">
                  Review URL
                </Form.Label>
                <Col sm="9" md="8" lg="6">
                  <a
                    href={assignment.codeReviewUrl}
                    style={{ fontWeight: "bold" }}
                  >
                    {assignment.codeReviewUrl}
                  </a>
                </Col>
              </Form.Group>
              <Row>
                <Col className="float-start">
                  <Button
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
                <Col className="float-right">
                  {assignment.status === "Completed" ? (
                    <></>
                  ) : (
                    <>
                      {assignment.status === "Pending Submission" ||
                      assignment.status === "Submitted" ? (
                        <Button
                          id="submit"
                          type="button"
                          onClick={() => saveAssignment("Submitted")}
                          variant="primary"
                        >
                          Submit
                        </Button>
                      ) : (
                        <Button
                          id="resubmit"
                          type="button"
                          onClick={() => saveAssignment("Re-Submitted")}
                          variant="primary"
                        >
                          Re-Submit
                        </Button>
                      )}
                    </>
                  )}
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

export default AssignmentView;
