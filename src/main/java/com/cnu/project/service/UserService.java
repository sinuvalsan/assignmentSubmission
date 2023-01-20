package com.cnu.project.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cnu.project.domain.Authority;
import com.cnu.project.domain.User;
import com.cnu.project.dto.UserDto;
import com.cnu.project.repo.AuthorityRepository;
import com.cnu.project.repo.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private AuthorityRepository authorityRepo;

	public void createUser(UserDto userDto) throws Exception {

		PasswordEncoder encoder =  new BCryptPasswordEncoder();
		User newUser = new User();

		newUser.setName(userDto.getName());
		newUser.setUsername(userDto.getUsername());
		newUser.setPassword(encoder.encode(userDto.getPassword()));
		newUser.setCohortStartDate(LocalDate.now());
		if (userRepo.findByUsername(newUser.getUsername()).isPresent()) {
			throw new Exception("User already exists");
		}else {
			userRepo.save(newUser);
			Authority authority = new Authority();
			authority.setAuthority("ROLE_STUDENT");
			authority.setUser(newUser);
			authorityRepo.save(authority);
		}
	}
	

}
