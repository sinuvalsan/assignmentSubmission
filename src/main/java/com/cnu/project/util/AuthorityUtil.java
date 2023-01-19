package com.cnu.project.util;

import org.springframework.stereotype.Component;

import com.cnu.project.domain.User;

@Component
public class AuthorityUtil {

	public static Boolean hasRoleCodeReviewerRole(String role, User user) {
		return user.getAuthorities()
				.stream()
				.filter(auth -> role
				.equals(auth.getAuthority()))
				.count()>0;
	}
}
