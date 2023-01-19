package com.cnu.project.service;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnu.project.domain.Assignment;
import com.cnu.project.domain.User;
import com.cnu.project.enums.AssignmentStatusEnums;
import com.cnu.project.enums.AuthorityEnums;
import com.cnu.project.repo.AssignmentRepository;
import com.cnu.project.util.AuthorityUtil;

@Service
public class AssignmentService {

	@Autowired
	private AssignmentRepository assignmentRepo;
	
	public Assignment create(User user) {

		Assignment assignment = new Assignment();
		assignment.setStatus(AssignmentStatusEnums.PENDING_SUBMISSION.getStatus());
		assignment.setNumber(findAssignmentNumber(user));
		assignment.setUser(user);
		return assignmentRepo.save(assignment);
		 
	}

	private Integer findAssignmentNumber(User user) {

		return (int) assignmentRepo.findByUser(user).stream().count() + 1;
	}

	public Set<Assignment> getAllAssignments(User user) {
		//load assignments of Code reviewer role
		if(AuthorityUtil.hasRoleCodeReviewerRole((AuthorityEnums.ROLE_CODE_REVIEWER.name()), user)) {
			return assignmentRepo.findByCodeReviewer(user);
		}
		//load assignments of Student role
		return assignmentRepo.findByUser(user);
	}

	public Optional<Assignment> getAssignment(Long assignmentId) {

		return assignmentRepo.findById(assignmentId);
	}

	public Assignment updateAssignment(Assignment assignment) {

		return assignmentRepo.save(assignment);
	}

	
}
