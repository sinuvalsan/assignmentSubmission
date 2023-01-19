package com.cnu.project.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@JsonFormat(shape = Shape.OBJECT)
public enum AssignmentStatusEnums {

	PENDING_SUBMISSION(1,"Pending Submission"),
	SUBMITTED(2,"Submitted"),
	IN_REVIEW(3,"In Review"),
	NEEDS_UPDATE(4,"Needs Update"),
	RE_SUBMITTED(5,"Re-Submitted"),
	COMPLETED(6,"Completed");
	
	private String status;
	private Integer stage;
	public String getStatus() {
		return status;
	}
	public Integer getStage() {
		return stage;
	}
	private AssignmentStatusEnums(Integer stage, String status) {
		this.status = status;
		this.stage = stage;
	}
	
}
