package com.cnu.project.web;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnu.project.domain.Assignment;
import com.cnu.project.domain.User;
import com.cnu.project.dto.AssignmentResponseDto;
import com.cnu.project.enums.AssignmentStatusEnums;
import com.cnu.project.enums.AuthorityEnums;
import com.cnu.project.service.AssignmentService;
import com.cnu.project.util.AuthorityUtil;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

	@Autowired
	private AssignmentService assignmentService;

	@PostMapping("")
	public ResponseEntity<?> createAssignment(@AuthenticationPrincipal User user) {

		Assignment newAssignment = assignmentService.create(user);
		return ResponseEntity.ok(newAssignment);
	}

	@GetMapping("")
	public ResponseEntity<?> getAllAssignments(@AuthenticationPrincipal User user) {
		
		Set<Assignment> newAssignment = assignmentService.getAllAssignments(user);
		return ResponseEntity.ok(newAssignment);
	}
	
	@GetMapping("{assignmentId}")
	public ResponseEntity<?> getAssignment(@PathVariable Long assignmentId,
			@AuthenticationPrincipal User user){
		
		Optional<Assignment> assignmentOpt = assignmentService.getAssignment(assignmentId);
		AssignmentResponseDto responseDto = new AssignmentResponseDto(assignmentOpt.orElse(new Assignment()));
		return ResponseEntity.ok(responseDto);
	}
	
	@PutMapping("{assignmentId}")
	public ResponseEntity<?> updateAssignment(@PathVariable Long assignmentId,
			@RequestBody Assignment assignment, @AuthenticationPrincipal User user){
		
		if( AuthorityUtil.hasRoleCodeReviewerRole(AuthorityEnums.ROLE_CODE_REVIEWER.name(), user)) {
			assignment.setCodeReviewer(user);
		}
		Assignment updatedAssignment = assignmentService.updateAssignment(assignment);
		return ResponseEntity.ok(updatedAssignment);
	}
}
