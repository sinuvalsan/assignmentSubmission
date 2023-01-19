package com.cnu.project.dto;

import com.cnu.project.domain.Assignment;
import com.cnu.project.enums.AssignmentEnums;
import com.cnu.project.enums.AssignmentStatusEnums;

public class AssignmentResponseDto {

	private Assignment assignment;
	private AssignmentEnums[] assignmentEnums = AssignmentEnums.values();
	private AssignmentStatusEnums[] statusEnums = AssignmentStatusEnums.values();
	
	public Assignment getAssignment() {
		return assignment;
	}

	public AssignmentEnums[] getAssignmentEnums() {
		return assignmentEnums;
	}
	
	public AssignmentStatusEnums[] getStatusEnums() {
		return statusEnums;
	}

	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignment = assignment;
	}
	
	
}
