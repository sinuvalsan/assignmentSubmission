package com.cnu.project.dto;

import java.util.HashSet;
import java.util.Set;

import com.cnu.project.domain.Assignment;
import com.cnu.project.enums.AssignmentEnums;
import com.cnu.project.enums.AssignmentStatusEnums;

public class AssignmentResponseDto {

	private Set<Assignment> assignments = new HashSet<>();
	private AssignmentEnums[] assignmentEnums = AssignmentEnums.values();
	private AssignmentStatusEnums[] statusEnums = AssignmentStatusEnums.values();
	
	public Set<Assignment> getAssignments() {
		return assignments;
	}

	public AssignmentEnums[] getAssignmentEnums() {
		return assignmentEnums;
	}
	
	public AssignmentStatusEnums[] getStatusEnums() {
		return statusEnums;
	}
	
	public AssignmentResponseDto(Assignment assignment) {
		super();
		this.assignments.add(assignment);
	}

	public AssignmentResponseDto(Set<Assignment> assignments) {
		super();
		this.assignments = assignments;
	}
	
	
}
