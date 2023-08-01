package com.marketplace.market.models;

public class LoginResponse {

	private String jwtToken;

	private String email;

	private String role;

	private String name;

	private int id;

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return email;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "LoginResponse [jwtToken=" + jwtToken + ", email=" + email + ", role=" + role + ", name=" + name
				+ ", id=" + id + "]";
	}

	public LoginResponse(String jwtToken, String email, String role, String name, int id) {
		this.jwtToken = jwtToken;
		this.email = email;
		this.role = role;
		this.name = name;
		this.id = id;
	}

	public LoginResponse() {
		super();
	}

	public static class Builder {
		private String jwtToken;
		private String email;
		private String role;
		private String name;
		private int id;

		public Builder jwtToken(String jwtToken) {
			this.jwtToken = jwtToken;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder role(String role) {
			this.role = role;
			return this;
		}

		public Builder name(String name) {
			this.name = name;
			return this;
		}

		public Builder id(int id) {
			this.id = id;
			return this;
		}

		public LoginResponse build() {
			LoginResponse jwtResponse = new LoginResponse();
			jwtResponse.setJwtToken(jwtToken);
			jwtResponse.setEmail(email);
			jwtResponse.setRole(role);
			jwtResponse.setName(name);
			jwtResponse.setId(id);
			return jwtResponse;
		}
	}

	public static Builder builder() {
		return new Builder();
	}
}
