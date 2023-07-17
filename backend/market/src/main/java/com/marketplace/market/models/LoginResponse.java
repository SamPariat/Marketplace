package com.marketplace.market.models;

public class LoginResponse {

	private String jwtToken;

	private String email;

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getUsername() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "LoginResponse [jwtToken=" + jwtToken + ", email=" + email + "]";
	}

	public LoginResponse(String jwtToken, String email) {
		this.jwtToken = jwtToken;
		this.email = email;
	}

	public LoginResponse() {
		super();
	}

	public static class Builder {
		private String jwtToken;
		private String email;

		public Builder jwtToken(String jwtToken) {
			this.jwtToken = jwtToken;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public LoginResponse build() {
			LoginResponse jwtResponse = new LoginResponse();
			jwtResponse.setJwtToken(jwtToken);
			jwtResponse.setEmail(email);
			return jwtResponse;
		}
	}

	public static Builder builder() {
		return new Builder();
	}
}
