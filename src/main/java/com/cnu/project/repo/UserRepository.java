package com.cnu.project.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cnu.project.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);
}
