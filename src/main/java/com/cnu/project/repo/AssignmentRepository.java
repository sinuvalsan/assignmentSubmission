package com.cnu.project.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.cnu.project.domain.Assignment;
import com.cnu.project.domain.User;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {

	Set<Assignment> findByUser(User user);

	@Query("select a from Assignment a "
            + "where ((a.status = 'submitted' or a.status = 'resubmitted') and (a.codeReviewer is null or a.codeReviewer = :codeReviewer))"
            + "or a.codeReviewer = :codeReviewer")
	Set<Assignment> findByCodeReviewer(User codeReviewer);
}
