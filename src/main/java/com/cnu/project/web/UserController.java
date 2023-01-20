package com.cnu.project.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cnu.project.dto.UserDto;
import com.cnu.project.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody UserDto userDto ){
		try {
			userService.createUser(userDto);
			return ResponseEntity.ok("Success");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.IM_USED).build();
		}
	}
}
