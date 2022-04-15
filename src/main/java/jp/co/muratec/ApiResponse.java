package jp.co.muratec;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ApiResponse {
	@JsonProperty("statusCd")
	public String statusCd;
}
