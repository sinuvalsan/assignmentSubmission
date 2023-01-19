package com.cnu.project;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class PasswordEncoderTest {
	
	@Test
	public void encodePassword() {
		
		PasswordEncoder encoder =  new BCryptPasswordEncoder();
		System.out.println("student: " + encoder.encode("student"));
		System.out.println("reviewer: " + encoder.encode("reviewer"));
	}
}
