package com.cnu.project.domain;

import org.springframework.security.core.GrantedAuthority;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Authority implements GrantedAuthority{

	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String authority;
	@ManyToOne
	@JsonIgnore
	private User user;
	
	public Authority() {}
	
	public Authority(String authority) {
		this.authority = authority;
	}
	
	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String getAuthority() {
		return authority;
	}
	
	public void setAuthority(String authority) {
        this.authority = authority;
    }

}
