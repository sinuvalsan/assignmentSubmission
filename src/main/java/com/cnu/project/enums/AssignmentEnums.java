package com.cnu.project.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@JsonFormat(shape = Shape.OBJECT)
public enum AssignmentEnums {

	ASSIGNMENT_1(1,"HTML"),
	ASSIGNMENT_2(2,"CSS"),
	ASSIGNMENT_3(3,"SQL"),
	ASSIGNMENT_4(4,"REACT"),
	ASSIGNMENT_5(5,"JAVA"),
	ASSIGNMENT_6(6,"SPRING"),
	ASSIGNMENT_7(7,"ANGULAR");
	
	private int assignmentNum;
	private String assignmentName;
	
	public int getAssignmentNum() {
		return assignmentNum;
	}
	
	public String getAssignmentName() {
		return assignmentName;
	}
	
	private AssignmentEnums(int assignmentNum, String assignmentName) {
		this.assignmentNum = assignmentNum;
		this.assignmentName = assignmentName;
	}
	
	
	
}
