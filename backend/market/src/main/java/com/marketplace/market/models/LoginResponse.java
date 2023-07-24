package com.marketplace.market.models;

public class LoginResponse {

	private String jwtToken;

	private String email;

	private String role;

	private String name;

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

	@Override
	public String toString() {
		return "LoginResponse [jwtToken=" + jwtToken + ", email=" + email + ", role=" + role + ", name=" + name + "]";
	}

	public LoginResponse(String jwtToken, String email, String role, String name) {
		this.jwtToken = jwtToken;
		this.email = email;
		this.role = role;
		this.name = name;
	}

	public LoginResponse() {
		super();
	}

	public static class Builder {
		private String jwtToken;
		private String email;
		private String role;
		private String name;

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

		public LoginResponse build() {
			LoginResponse jwtResponse = new LoginResponse();
			jwtResponse.setJwtToken(jwtToken);
			jwtResponse.setEmail(email);
			jwtResponse.setRole(role);
			jwtResponse.setName(name);
			return jwtResponse;
		}
	}

	public static Builder builder() {
		return new Builder();
	}
}
