package com.cnu.project.service;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cnu.project.domain.Assignment;
import com.cnu.project.domain.Comment;
import com.cnu.project.domain.User;
import com.cnu.project.dto.CommentDto;
import com.cnu.project.repo.AssignmentRepository;
import com.cnu.project.repo.CommentRepository;

@Service
public class CommentService {

	@Autowired
    private CommentRepository commentRepo;
    
	@Autowired
    private AssignmentRepository assignmentRepo;

    public CommentService(CommentRepository commentRepo, AssignmentRepository assignmentRepo) {
        this.commentRepo = commentRepo;
        this.assignmentRepo = assignmentRepo;
    }

    public Comment createComment(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        Optional<Assignment> assignmentOpt = assignmentRepo.findById(commentDto.getAssignmentId());
        
        comment.setId(commentDto.getId());
        comment.setAssignment(assignmentOpt.orElse(new Assignment()));
        comment.setText(commentDto.getText());
        comment.setCreatedBy(user);
        if (comment.getId() == null)
            comment.setCreatedDate(ZonedDateTime.now());
        else
            comment.setCreatedDate(commentDto.getCreatedDate());

        return commentRepo.save(comment);

    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepo.findByAssignmentId(assignmentId);
        
        return comments;
    }

    public void deleteComment(Long commentId) {
        commentRepo.deleteById(commentId);
        
    }

    
}
