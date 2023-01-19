package com.cnu.project.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@JsonFormat(shape = Shape.OBJECT)
public enum AssignmentEnums {

	ASSIGNMENT_1(1,"HTML"),
	ASSIGNMENT_2(2,"SPRING"),
	ASSIGNMENT_3(3,"REACT"),
	ASSIGNMENT_4(4,"JAVA"),
	ASSIGNMENT_5(5,"CSS");
	
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
