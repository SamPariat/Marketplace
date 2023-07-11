package com.marketplace.market.models;

public class JwtResponse {

	private String jwtToken;

	private String username;

	public String getJwtToken() {
		return jwtToken;
	}

	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String toString() {
		return "JwtResponse [jwtToken=" + jwtToken + ", username=" + username + "]";
	}

	public JwtResponse(String jwtToken, String username) {
		this.jwtToken = jwtToken;
		this.username = username;
	}

	public JwtResponse() {
		super();
		// TODO Auto-generated constructor stub
	}

	public static class Builder {
		private String jwtToken;
		private String username;

		public Builder jwtToken(String jwtToken) {
			this.jwtToken = jwtToken;
			return this;
		}

		public Builder username(String username) {
			this.username = username;
			return this;
		}

		public JwtResponse build() {
			JwtResponse jwtResponse = new JwtResponse();
			jwtResponse.setJwtToken(jwtToken);
			jwtResponse.setUsername(username);
			return jwtResponse;
		}
	}

	public static Builder builder() {
		return new Builder();
	}
}
